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

import { Token, tokenList as localTokens } from "./tokens";
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

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{
    [address: string]: Token;
  }>({});
  const [relatedTokens, setRelatedTokens] = useState<{
    [address: string]: { [address: string]: boolean };
  }>({});
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelectRelated, setSelectRelated] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<string>(null);
  const [secretjs, setSecretjs] = useState<SigningCosmWasmClient>(null);
  const viewingKeyRef = useRef<{ value: string }>({ value: "" });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const tokens: { [address: string]: Token } = {};
      const relatedTokens: {
        [address: string]: { [address: string]: boolean };
      } = {};

      for (const t of localTokens) {
        if (t.address in tokens) {
          console.error(`Duplicate tokens ${t} and ${tokens[t.address]}`);
        }

        if (t.type == "LP") {
          const [asset1, asset2] = t.name.split("-");

          if (asset1 === "uscrt" || asset2 === "uscrt") {
            const sscrt = asset1 === "uscrt" ? asset2 : asset1;
            tokens[t.address] = {
              address: t.address,
              name: `LP SCRT-sSCRT`,
              symbol: "",
              logo: `${sscrt}-${sscrt}`,
              type: "LP",
            } as Token;
            relatedTokens[sscrt] = Object.assign({}, relatedTokens[sscrt], {
              [t.address]: true,
            });
            continue;
          }

          if (!tokens[asset1] || !tokens[asset2]) {
            console.log(
              `Skipping LP token ${t.address} because ${asset1} or ${asset2} is unknown.`
            );
            continue;
          }

          relatedTokens[asset1] = Object.assign({}, relatedTokens[asset1], {
            [t.address]: true,
          });
          relatedTokens[asset2] = Object.assign({}, relatedTokens[asset2], {
            [t.address]: true,
          });

          tokens[t.address] = {
            address: t.address,
            name: `LP ${tokens[asset1].symbol}-${tokens[asset2].symbol}`,
            symbol: `${tokens[asset1].symbol}-${tokens[asset2].symbol}`,
            logo: `${asset1}-${asset2}`,
            type: "LP",
          } as Token;
          continue;
        } else if (t.type == "REWARDS") {
          const [lockToken, rewardsToken] = t.name.split(">");

          if (!tokens[lockToken] || !tokens[rewardsToken]) {
            console.log(
              `Skipping Rewards token ${t.address} because ${lockToken} or ${rewardsToken} is unknown.`
            );
            continue;
          }

          relatedTokens[rewardsToken] = Object.assign(
            {},
            relatedTokens[rewardsToken],
            {
              [t.address]: true,
            }
          );

          let lockTokenLogo = tokens[lockToken].address;
          if (tokens[lockToken].type === "LP") {
            lockTokenLogo = tokens[lockToken].logo;

            const [asset1, asset2] = tokens[lockToken].logo.split("-");
            relatedTokens[asset1] = Object.assign({}, relatedTokens[asset1], {
              [t.address]: true,
            });
            relatedTokens[asset2] = Object.assign({}, relatedTokens[asset2], {
              [t.address]: true,
            });
          } else {
            relatedTokens[lockToken] = Object.assign(
              {},
              relatedTokens[lockToken],
              {
                [t.address]: true,
              }
            );
          }

          tokens[t.address] = {
            address: t.address,
            name: `Rewards ${tokens[lockToken].symbol} ➜ ${tokens[rewardsToken].symbol}`,
            symbol: "",
            logo: `${lockTokenLogo}-${tokens[rewardsToken].logo}`,
            type: "REWARDS",
          } as Token;

          continue;
        }

        tokens[t.address] = Object.assign({}, t, {
          logo: `${window.location.origin}/${t.logo}`,
        });
      }

      setTokens(tokens);
      setRelatedTokens(relatedTokens);
      setLoading(false);
    };

    fetchData();
  }, []);

  const setupKeplr = async () => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    while (!window.keplr) {
      await sleep(50);
    }

    const chainId = "secret-2";

    await window.keplr.enable(chainId);

    const keplrOfflineSigner = window.getOfflineSigner(chainId);
    const accounts = await keplrOfflineSigner.getAccounts();

    const myAddress = accounts[0].address;

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

  const handleSelectToken = (event) => {
    const address = event.target.name;
    const token = tokens[address];

    const newSelectedTokens = new Set(Array.from(selectedTokens));

    if (selectedTokens.has(address)) {
      newSelectedTokens.delete(address);

      if (isSelectRelated && token.type !== "LP" && token.type !== "REWARDS") {
        for (const relatedToken of Object.keys(relatedTokens[address])) {
          newSelectedTokens.delete(relatedToken);
        }
      }

      setSelectedTokens(newSelectedTokens);
      setIsAllSelected(false);
    } else {
      newSelectedTokens.add(address);

      if (isSelectRelated && token.type !== "LP" && token.type !== "REWARDS") {
        for (const relatedToken of Object.keys(relatedTokens[address])) {
          newSelectedTokens.add(relatedToken);
        }
      }

      setSelectedTokens(newSelectedTokens);
      if (newSelectedTokens.size === Object.keys(tokens).length) {
        setIsAllSelected(true);
      }
    }
  };

  const handleSelectAll = (event) => {
    if (isAllSelected) {
      setSelectedTokens(new Set());
    } else {
      setSelectedTokens(new Set(Object.keys(tokens)));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleSelectRelated = (event) => {
    setSelectRelated(!isSelectRelated);
  };

  const isTooMuchGas = calculateGasLimit(selectedTokens.size) > 10_000_000;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
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
          label="Set Viewing Key"
          inputRef={viewingKeyRef}
          style={{ width: "25%", marginRight: "0.3em" }}
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
          disabled={
            selectedTokens.size === 0 || !secretjs || loading || isTooMuchGas
          }
          onClick={async () => {
            setLoading(true);
            try {
              console.log(
                Array.from(selectedTokens).reduce((obj, token) => {
                  obj[token] = tokens[token];
                  return obj;
                }, {})
              );
              const { transactionHash } = await secretjs.multiExecute(
                Array.from(selectedTokens).map((contractAddress) => ({
                  contractAddress,
                  contractCodeHash: tokens[contractAddress].codeHash,
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
                    const tx = await secretjs.restClient.txById(
                      transactionHash,
                      false
                    );
                    accept(tx);
                    clearInterval(interval);
                  } catch (error) {
                    console.error(error);
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
          {loading ? <CircularProgress size="2em" /> : "Go"}
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={handleSelectAll}
              checked={isAllSelected}
            />
          }
          label={`Select all`}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={handleSelectRelated}
              checked={isSelectRelated}
            />
          }
          label={`Select related`}
        />
      </div>
      <hr />
      <div style={{ display: "flex " }}>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "SECRET")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "ETH")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "BSC")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "LP")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
        <div>
          {Object.keys(tokens)
            .filter((t) => tokens[t].type === "REWARDS")
            .map((addr) => (
              <TokenCheckBox
                key={addr}
                token={tokens[addr]}
                tokens={tokens}
                selectedTokens={selectedTokens}
                handleCheckToken={handleSelectToken}
              />
            ))}
        </div>
      </div>
    </>
  );
}

const gasPriceUscrt = 0.25;
export function getFeeForExecute(gas: number): StdFee {
  return {
    amount: [
      { amount: String(Math.floor(gas * gasPriceUscrt) + 1), denom: "uscrt" },
    ],
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
  tokens: { [address: string]: Token };
  selectedTokens: Set<string>;
  handleCheckToken: (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
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
    const [token1, token2] = logo.split("-") as string[];

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.2em" }}>
          <TokenLogo token={tokens[token1]} />
        </span>
        <span style={{ marginRight: "0.3em" }}>
          <TokenLogo token={tokens[token2]} />
        </span>
        {name}
      </div>
    );
  } else if (type == "REWARDS") {
    const [a, b, c] = logo.split("-") as string[];

    const lockLogo1 = a;
    let lockLogo2: string;
    let rewardsLogo: string;

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
              <TokenLogo token={tokens[lockLogo1]} />
            </span>
            <span style={{ marginRight: "0.2em" }}>
              <TokenLogo token={tokens[lockLogo2]} />
            </span>
          </>
        ) : (
          <span style={{ marginRight: "0.2em" }}>
            <TokenLogo token={tokens[lockLogo1]} />
          </span>
        )}
        {"➜"}
        <span style={{ marginLeft: "0.2em", marginRight: "0.3em" }}>
          <Avatar alt={name} src={rewardsLogo} className={classes.avatar} />
        </span>
        {name}
      </div>
    );
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            name={address}
            checked={selectedTokens.has(address)}
            onChange={handleCheckToken}
          />
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
        badgeContent={
          <Avatar
            alt="ETH"
            src={window.location.origin + "/eth.png"}
            className={classes.smallAvatar}
          />
        }
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
        badgeContent={
          <Avatar
            alt="BSC"
            src={window.location.origin + "/bnb.png"}
            className={classes.smallAvatar}
          />
        }
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
    gasPerMsg = 58_000;
  }

  return gasPerMsg * numOfMsgs;
}
