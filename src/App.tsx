import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Badge from "@material-ui/core/Badge";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { SecretAddress, Token, tokenList as localTokens } from "./tokens";
import { BroadcastMode, SigningCosmWasmClient } from "secretjs";
import { StdFee } from "secretjs/types/types";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
  interface Window extends KeplrWindow {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 10px",
    },
    smallAvatar: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 10px",
    },
    customBadge: {
      backgroundColor: "transparent",
      color: "white",
    },
  })
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Map<SecretAddress, Token>>(new Map<SecretAddress, Token>());
  const [relatedTokens, setRelatedTokens] = useState<Map<SecretAddress, Set<SecretAddress>>>(
    new Map<SecretAddress, Set<SecretAddress>>()
  );
  const [selectedTokens, setSelectedTokens] = useState<Set<SecretAddress>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelectRelated, setSelectRelated] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<SecretAddress | null>(null);
  const [secretjs, setSecretjs] = useState<SigningCosmWasmClient | null>(null);
  const viewingKeyRef = useRef<{ value: string }>({ value: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const tokens = new Map<SecretAddress, Token>();
      const relatedTokens = new Map<SecretAddress, Set<SecretAddress>>();

      for (const t of localTokens) {
        if (t.address in tokens) {
          console.error(`Duplicate tokens ${t} and ${tokens.get(t.address)}`);
        }

        if (t.type == "LP") {
          const [asset1, asset2] = t.name.split("-") as SecretAddress[];

          if (asset1 === "uscrt" || asset2 === "uscrt") {
            const sscrt = asset1 === "uscrt" ? asset2 : asset1;
            tokens.set(t.address, {
              address: t.address,
              codeHash: t.codeHash,
              name: `LP SCRT-sSCRT`,
              symbol: "",
              logo: `${sscrt}-${sscrt}`,
              type: "LP",
            });
            relatedTokens.set(sscrt, new Set([...new Set(relatedTokens.get(sscrt)), t.address]));
            continue;
          }

          if (!tokens.has(asset1) || !tokens.has(asset2)) {
            console.log(`Skipping LP token ${t.address} because ${asset1} or ${asset2} is unknown.`);
            continue;
          }

          relatedTokens.set(asset1, new Set([...new Set(relatedTokens.get(asset1)), t.address]));
          relatedTokens.set(asset2, new Set([...new Set(relatedTokens.get(asset2)), t.address]));

          tokens.set(t.address, {
            address: t.address,
            codeHash: t.codeHash,
            name: `LP ${tokens.get(asset1)?.symbol}-${tokens.get(asset2)?.symbol}`,
            symbol: `${tokens.get(asset1)?.symbol}-${tokens.get(asset2)?.symbol}`,
            logo: `${asset1}-${asset2}`,
            type: "LP",
          });

          continue;
        } else if (t.type == "REWARDS") {
          const [lockToken, rewardsToken] = t.name.split(">") as SecretAddress[];

          if (!tokens.has(lockToken) || !tokens.has(rewardsToken)) {
            console.log(`Skipping Rewards token ${t.address} because ${lockToken} or ${rewardsToken} is unknown.`);
            continue;
          }

          relatedTokens.set(rewardsToken, new Set([...new Set(relatedTokens.get(rewardsToken)), t.address]));

          let lockTokenLogo: string | SecretAddress | undefined = tokens.get(lockToken)?.address;
          if (tokens.get(lockToken)?.type === "LP") {
            lockTokenLogo = tokens.get(lockToken)?.logo; // this is `${asset1Addr}-${asset2Addr}`

            const [asset1, asset2] = tokens.get(lockToken)?.logo.split("-") as SecretAddress[];

            relatedTokens.set(asset1, new Set([...new Set(relatedTokens.get(asset1)), t.address]));
            relatedTokens.set(asset2, new Set([...new Set(relatedTokens.get(asset2)), t.address]));
          } else {
            relatedTokens.set(lockToken, new Set([...new Set(relatedTokens.get(lockToken)), t.address]));
          }

          tokens.set(t.address, {
            address: t.address,
            codeHash: t.codeHash,
            name: `Rewards ${tokens.get(lockToken)?.symbol} ➜ ${tokens.get(rewardsToken)?.symbol}`,
            symbol: "",
            logo: `${lockTokenLogo}-${rewardsToken}`,
            type: "REWARDS",
          });

          continue;
        }

        tokens.set(
          t.address,
          Object.assign({}, t, {
            logo: `${window.location.origin}/${t.logo}`,
          })
        );
      }

      setTokens(tokens);
      setRelatedTokens(relatedTokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  const setupKeplr = async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    while (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSigner) {
      await sleep(50);
    }

    const chainId = "secret-2";

    await window.keplr.enable(chainId);

    const keplrOfflineSigner = window.getOfflineSigner(chainId);
    const accounts = await keplrOfflineSigner.getAccounts();

    const myAddress = accounts[0].address as SecretAddress;

    const secretjs = new SigningCosmWasmClient(
      "https://bridge-api-manager.azure-api.net/",
      myAddress,
      //@ts-ignore
      keplrOfflineSigner,
      window.getEnigmaUtils(chainId),
      null,
      BroadcastMode.Sync
    );

    setMyAddress(myAddress);
    setSecretjs(secretjs);
  };

  const handleSelectToken = (event: ChangeEvent<HTMLInputElement>) => {
    const address = event.target.name as SecretAddress;
    const token = tokens.get(address);

    if (!token) {
      console.error(`handleSelectToken: Cannot find token ${address}`);
      return;
    }

    const newSelectedTokens = new Set(Array.from(selectedTokens));

    if (selectedTokens.has(address)) {
      newSelectedTokens.delete(address);

      if (isSelectRelated && token.type !== "LP" && token.type !== "REWARDS") {
        for (const relatedToken of new Set(relatedTokens.get(address))) {
          newSelectedTokens.delete(relatedToken);
        }
      }

      setSelectedTokens(newSelectedTokens);
      setIsAllSelected(false);
    } else {
      newSelectedTokens.add(address);

      if (isSelectRelated && token.type !== "LP" && token.type !== "REWARDS") {
        for (const relatedToken of new Set(relatedTokens.get(address))) {
          newSelectedTokens.add(relatedToken);
        }
      }

      setSelectedTokens(newSelectedTokens);
      if (newSelectedTokens.size === Object.keys(tokens).length) {
        setIsAllSelected(true);
      }
    }
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedTokens(new Set());
    } else {
      setSelectedTokens(new Set(tokens.keys()));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectRelated = () => {
    setSelectRelated(!isSelectRelated);
  };

  const isTooMuchGas = calculateGasLimit(selectedTokens.size) > 10_000_000;

  return (
    <div style={{ padding: "0.5em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "3em",
        }}
      >
        {!secretjs ? (
          <Button variant="outlined" onClick={setupKeplr}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 10,
              }}
            >
              <img
                src={`${window.location.origin}/keplr.svg`}
                style={{
                  width: "2em",
                  borderRadius: 10,
                }}
              />
              <span
                style={{
                  margin: "0 0.3em",
                }}
              >
                Connect wallet
              </span>
            </div>
          </Button>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <img
              src={`${window.location.origin}/keplr.svg`}
              style={{
                width: "1.8em",
                borderRadius: 10,
              }}
            />
            <span
              style={{
                margin: "0 0.3em",
              }}
            >
              {myAddress}
            </span>
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Viewing Key"
          inputRef={viewingKeyRef}
          style={{ width: "25%", marginRight: "0.3em", minHeight: "4.5em" }}
          error={isTooMuchGas}
          helperText={
            isTooMuchGas
              ? `Gas limit exeeds block gas limit: ${Intl.NumberFormat().format(
                  calculateGasLimit(selectedTokens.size)
                )} > 10,000,000`
              : null
          }
        />
        <Button
          variant="contained"
          color="primary"
          disabled={selectedTokens.size === 0 || !secretjs || loading || isTooMuchGas}
          onClick={async () => {
            if (!secretjs) {
              console.error("Wat?");
              return;
            }

            setLoading(true);
            try {
              const { transactionHash } = await secretjs.multiExecute(
                Array.from(selectedTokens).map((contractAddress) => ({
                  contractAddress,
                  contractCodeHash: tokens.get(contractAddress)?.codeHash,
                  handleMsg: {
                    set_viewing_key: { key: viewingKeyRef.current.value },
                  },
                })),
                "",
                getFeeForExecute(calculateGasLimit(selectedTokens.size))
              );

              await new Promise((accept, reject) => {
                const interval = setInterval(async () => {
                  try {
                    const tx = await secretjs.restClient.txById(transactionHash, false);

                    if (!tx.raw_log.startsWith("[")) {
                      console.error(`Tx failed: ${tx.raw_log}`);
                    } else {
                      console.log(`Viewing keys successfully set.`);
                    }

                    accept(tx);
                    clearInterval(interval);
                  } catch (error) {
                    console.log("Still waiting for tx to commit on-chain...");
                  }
                }, 5000);
              });

              viewingKeyRef.current.value = "";
            } catch (e) {
              console.error(`Error: ${e.message}`);
              alert(`Error: ${e.message}`);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? <CircularProgress size="2em" /> : "Set"}
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <FormControlLabel
          control={<Checkbox color="secondary" onChange={handleSelectAll} checked={isAllSelected} />}
          label={`Select all`}
        />
        <FormControlLabel
          control={<Checkbox color="secondary" onChange={handleSelectRelated} checked={isSelectRelated} />}
          label={`Select related`}
        />
      </div>
      <hr />
      <div style={{ display: "flex " }}>
        <div>
          {Array.from(tokens.keys())
            .filter((addr) => tokens.get(addr)?.type === "SECRET")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens.get(addr) as Token}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Array.from(tokens.keys())
            .filter((addr) => tokens.get(addr)?.type === "ETH")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens.get(addr) as Token}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Array.from(tokens.keys())
            .filter((addr) => tokens.get(addr)?.type === "BSC")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens.get(addr) as Token}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Array.from(tokens.keys())
            .filter((addr) => tokens.get(addr)?.type === "LP")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens.get(addr) as Token}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Array.from(tokens.keys())
            .filter((addr) => tokens.get(addr)?.type === "REWARDS")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens.get(addr) as Token}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const gasPriceUscrt = 0.25;
export function getFeeForExecute(gas: number): StdFee {
  return {
    amount: [{ amount: String(Math.floor(gas * gasPriceUscrt) + 1), denom: "uscrt" }],
    gas: String(gas),
  };
}

function TokenCheckBox({
  token,
  tokens,
  selectedTokens,
  handleCheckToken,
}: {
  token: Token;
  tokens: Map<SecretAddress, Token>;
  selectedTokens: Set<string>;
  handleCheckToken: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}) {
  if (!token) {
    return null;
  }

  const classes = useStyles();

  const { address, name, symbol, logo, type } = token;

  let label = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "0.3em" }}>
        <TokenLogo token={token} />
      </span>
      {symbol.length > 0 ? `${name} (${symbol})` : name}
    </div>
  );

  if (type == "LP") {
    const [token1, token2] = logo.split("-") as SecretAddress[];

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.2em" }}>
          <TokenLogo token={tokens.get(token1) as Token} />
        </span>
        <span style={{ marginRight: "0.3em" }}>
          <TokenLogo token={tokens.get(token2) as Token} />
        </span>
        {name}
      </div>
    );
  } else if (type == "REWARDS") {
    const [a, b, c] = logo.split("-") as SecretAddress[];

    const lockLogo1 = a;
    let lockLogo2: SecretAddress | undefined;
    let rewardsLogo: SecretAddress;

    if (c) {
      lockLogo2 = b;
      rewardsLogo = c;
    } else {
      rewardsLogo = b;
    }

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {lockLogo2 ? (
          <>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens.get(lockLogo1) as Token} />
            </span>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens.get(lockLogo2) as Token} />
            </span>
          </>
        ) : (
          <span style={{ marginRight: "0.2em" }}>
            <TokenLogo token={tokens.get(lockLogo1) as Token} />
          </span>
        )}
        {"➜"}
        <span style={{ marginLeft: "0.2em", marginRight: "0.3em" }}>
          <TokenLogo token={tokens.get(rewardsLogo) as Token} />
        </span>
        {name}
      </div>
    );
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox color="primary" name={address} checked={selectedTokens.has(address)} onChange={handleCheckToken} />
        }
        label={label}
      />
    </div>
  );
}

function TokenLogo({ token }: { token: Token }) {
  if (!token) {
    return null;
  }

  const classes = useStyles();

  const { name, logo, type } = token;

  if (type === "SECRET") {
    return <Avatar alt={name} src={logo} className={classes.avatar} />;
  } else if (type === "ETH") {
    return (
      <Badge
        className={classes.customBadge}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<Avatar alt="ETH" src={window.location.origin + "/eth.png"} className={classes.smallAvatar} />}
      >
        <Avatar alt={name} src={logo} className={classes.avatar} />
      </Badge>
    );
  } else if (type === "BSC") {
    return (
      <Badge
        className={classes.customBadge}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        badgeContent={<Avatar alt="BSC" src={window.location.origin + "/bnb.png"} className={classes.smallAvatar} />}
      >
        <Avatar alt={name} src={logo} className={classes.avatar} />
      </Badge>
    );
  } else {
    console.error(`getTokenLogo must be of type "SECRET" | "ETH" | "BSC"`);
    return null;
  }
}

function calculateGasLimit(numOfMsgs: number): number {
  let gasPerMsg = 105_000;
  if (numOfMsgs >= 2) {
    gasPerMsg = 85_000;
  }
  if (numOfMsgs >= 5) {
    gasPerMsg = 68_000;
  }
  if (numOfMsgs >= 10) {
    gasPerMsg = 62_000;
  }
  if (numOfMsgs >= 15) {
    gasPerMsg = 59_000;
  }
  if (numOfMsgs >= 50) {
    gasPerMsg = 57_000;
  }

  return gasPerMsg * numOfMsgs;
}
