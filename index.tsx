import { SigningCosmWasmClient } from "secretjs";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
  interface Window extends KeplrWindow {}
}
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Avatar,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { StdFee } from "secretjs/types/types";
import { Token, tokenList as localTokens } from "./tokens";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    avatar: {
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      boxShadow: "rgba(0, 0, 0, 0.1) 0px 6px 10px",
    },
  })
);

const chainId = "secret-2";
let myAddress: string;
let secretjs: SigningCosmWasmClient;
window.onload = async () => {
  await window.keplr.enable(chainId);

  const keplrOfflineSigner = window.getOfflineSigner(chainId);
  const accounts = await keplrOfflineSigner.getAccounts();

  myAddress = accounts[0].address;

  secretjs = new SigningCosmWasmClient(
    "https://bridge-api-manager.azure-api.net/",
    myAddress,
    //@ts-ignore
    keplrOfflineSigner,
    window.getEnigmaUtils(chainId)
  );

  window.keplr.suggestToken;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

function App() {
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{
    [address: string]: Token;
  }>({});
  const [selectedTokens, setSelectedTokens] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const tokens = {};
      for (const t of localTokens) {
        if (t.address in tokens) {
          console.error(`Duplicate tokens ${t} and ${tokens[t.address]}`);
        }
        tokens[t.address] = t;
      }

      setTokens(tokens);
      setLoading(false);
    };

    fetchData();
  }, [JSON.stringify(tokens)]);

  const handleCheckToken = (event) => {
    const address = event.target.name;
    setIsAllSelected(false);

    if (selectedTokens.has(address)) {
      setSelectedTokens(
        new Set(Array.from(selectedTokens).filter((a) => a !== address))
      );
    } else {
      setSelectedTokens(new Set(Array.from(selectedTokens).concat([address])));
    }
  };

  const handleCheckAll = (event) => {
    if (isAllSelected) {
      setSelectedTokens(new Set());
    } else {
      setSelectedTokens(new Set(Object.keys(tokens)));
    }
    setIsAllSelected(!isAllSelected);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={Object.keys(tokens).length === 0 || !secretjs || loading}
          onClick={async () => {
            setLoading(true);
            const numOfMsgs = Object.keys(selectedTokens).length;
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

            try {
              await secretjs.multiExecute(
                Array.from(selectedTokens).map((contractAddress) => ({
                  contractAddress,
                  handleMsg: { set_viewing_key: { key: "banana" } },
                })),
                "",
                getFeeForExecute(numOfMsgs * gasPerMsg)
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          Go nuts
        </Button>
        {loading && (
          <CircularProgress size="2em" style={{ marginLeft: "0.3em" }} />
        )}
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={handleCheckAll}
              checked={isAllSelected}
            />
          }
          label={`Select all`}
        />
      </div>
      {Object.keys(tokens).map((addr) => {
        const { address, name, symbol, logo } = tokens[addr];

        return (
          <div key={address}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  name={address}
                  checked={selectedTokens.has(address)}
                  onChange={handleCheckToken}
                />
              }
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "0.3em" }}>
                    <Avatar
                      alt={name}
                      src={`${window.location.href}/logos/${logo}`}
                      className={classes.avatar}
                    />
                  </span>
                  {`${name} (${symbol})`}
                </div>
              }
            />
          </div>
        );
      })}
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
// (async () => {
//   let myAddress: string;

//   const ethTokens = await (
//     await fetch("https://api-bridge-mainnet.azurewebsites.net/tokens")
//   ).json();

//   const ethAddresses = ethTokens.tokens.map((t) => t.dst_address);
//   console.log(ethAddresses);

//   const bscTokens = await (
//     await fetch("https://bridge-bsc-mainnet.azurewebsites.net/tokens")
//   ).json();

//   const bscAddresses = bscTokens.tokens.map((t) => t.dst_address);
//   console.log(bscAddresses);
// })();
