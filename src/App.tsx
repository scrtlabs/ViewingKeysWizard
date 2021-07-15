import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";

import { Button, Checkbox, CircularProgress, FormControlLabel, Avatar, TextField, Badge } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { ComplexToken, SecretAddress, Token, BasicToken, tokenList as localTokens } from "./tokens";
import { BroadcastMode, SigningCosmWasmClient } from "secretjs";
import { StdFee } from "secretjs/types/types";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import SelectInput from "@material-ui/core/Select/SelectInput";
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

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

      for (const token of localTokens) {
        if (token.address in tokens) {
          console.error(`Duplicate tokens ${token} and ${tokens.get(token.address)}`);
        }

        if (token.type == "LP") {
          const [asset1, asset2] = token.assets;

          if (!tokens.has(asset1) || !tokens.has(asset2)) {
            console.log(`Skipping LP token ${token.address} because ${asset1} or ${asset2} is unknown.`);
            continue;
          }

          relatedTokens.set(asset1, new Set([...new Set(relatedTokens.get(asset1)), token.address]));
          relatedTokens.set(asset2, new Set([...new Set(relatedTokens.get(asset2)), token.address]));

          tokens.set(token.address, token);

          continue;
        } else if (token.type == "REWARDS") {
          const [lockToken, rewardsToken] = token.assets;

          if (!tokens.has(lockToken) || !tokens.has(rewardsToken)) {
            console.log(`Skipping Rewards token ${token.address} because ${lockToken} or ${rewardsToken} is unknown.`);
            continue;
          }

          relatedTokens.set(rewardsToken, new Set([...new Set(relatedTokens.get(rewardsToken)), token.address]));

          if (tokens.get(lockToken)?.type === "LP") {
            const [asset1, asset2] = (tokens.get(lockToken) as ComplexToken).assets;
            token.assets = [asset1, asset2, rewardsToken];

            relatedTokens.set(asset1, new Set([...new Set(relatedTokens.get(asset1)), token.address]));
            relatedTokens.set(asset2, new Set([...new Set(relatedTokens.get(asset2)), token.address]));
          } else {
            relatedTokens.set(lockToken, new Set([...new Set(relatedTokens.get(lockToken)), token.address]));
          }

          tokens.set(token.address, token);

          continue;
        } else if (token.type === "SECRET" || token.type === "ETH" || token.type === "BSC") {
          token.logo = `/${token.logo}`;
        }

        tokens.set(token.address, token);
      }

      setTokens(tokens);
      setRelatedTokens(relatedTokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  const setupKeplr = async () => {
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
                src="/keplr.svg"
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
              src="/keplr.svg"
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

              while (true) {
                try {
                  const tx = await secretjs.restClient.txById(transactionHash, false);

                  if (!tx.raw_log.startsWith("[")) {
                    console.error(`Tx failed: ${tx.raw_log}`);
                  } else {
                    console.log(`Viewing keys successfully set.`);
                  }

                  break;
                } catch (error) {
                  console.log("Still waiting for tx to commit on-chain...");
                }

                await sleep(5000);
              }

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

  let label = <>Placeholder</>;

  if (token.type === "SECRET" || token.type === "ETH" || token.type === "BSC") {
    const { symbol, name } = token as BasicToken;

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.3em" }}>
          <TokenLogo token={token as BasicToken} />
        </span>
        {symbol.length > 0 ? `${name} (${symbol})` : name}
      </div>
    );
  } else if (token.type == "LP") {
    const [asset1, asset2] = (token as ComplexToken).assets;

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.2em" }}>
          <TokenLogo token={tokens.get(asset1) as BasicToken} />
        </span>
        <span style={{ marginRight: "0.3em" }}>
          <TokenLogo token={tokens.get(asset2) as BasicToken} />
        </span>
        {`LP ${(tokens.get(asset1) as BasicToken).symbol}-${(tokens.get(asset2) as BasicToken).symbol}`}
      </div>
    );
  } else if (token.type == "REWARDS") {
    const [a, b, c] = (token as ComplexToken).assets;

    const lockAsset1 = a;
    let lockAsset2: SecretAddress | undefined;
    let rewardsAsset: SecretAddress;

    if (c) {
      lockAsset2 = b;
      rewardsAsset = c;
    } else {
      rewardsAsset = b;
    }

    let symbol = `${(tokens.get(lockAsset1) as BasicToken).symbol} ➜ ${
      (tokens.get(rewardsAsset) as BasicToken).symbol
    }`;
    if (lockAsset2) {
      symbol = `${(tokens.get(lockAsset1) as BasicToken).symbol}-${(tokens.get(lockAsset2) as BasicToken).symbol} ➜ ${
        (tokens.get(rewardsAsset) as BasicToken).symbol
      }`;
    }

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {lockAsset2 ? (
          <>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens.get(lockAsset1) as BasicToken} />
            </span>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens.get(lockAsset2) as BasicToken} />
            </span>
          </>
        ) : (
          <span style={{ marginRight: "0.2em" }}>
            <TokenLogo token={tokens.get(lockAsset1) as BasicToken} />
          </span>
        )}
        {"➜"}
        <span style={{ marginLeft: "0.2em", marginRight: "0.3em" }}>
          <TokenLogo token={tokens.get(rewardsAsset) as BasicToken} />
        </span>
        {`Rewards ${symbol}`}
      </div>
    );
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name={token.address}
            checked={selectedTokens.has(token.address)}
            onChange={handleCheckToken}
          />
        }
        label={label as JSX.Element}
      />
    </div>
  );
}

function TokenLogo({ token }: { token: BasicToken }) {
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
        badgeContent={<Avatar alt="ETH" src="/eth.png" className={classes.smallAvatar} />}
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
        badgeContent={<Avatar alt="BSC" src="/bnb.png" className={classes.smallAvatar} />}
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
