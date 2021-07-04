import { SigningCosmWasmClient } from "secretjs";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
  interface Window extends KeplrWindow {}
}
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
} from "@material-ui/core";
import { StdFee } from "secretjs/types/types";

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
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

type Token = {
  address: string;
  name: string;
  symbol: string;
  logo: string;
};

type DBToken = {
  name: string;
  address: string;
  decimals: number;
  src_address: string;
  dst_address: string;
  display_props: {
    image: string;
    label: string;
    symbol: string;
  };
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [checkedTokens, setCheckedTokens] = useState<{
    [address: string]: Token;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const tokens = (
        await Promise.all([
          (
            await fetch("https://api-bridge-mainnet.azurewebsites.net/tokens")
          ).json(),
          (
            await fetch("https://bridge-bsc-mainnet.azurewebsites.net/tokens")
          ).json(),
        ])
      )
        .map((res) => res.tokens)
        .flat()
        .map((t: DBToken) => ({
          address: t.dst_address,
          name: t.name,
          symbol: t.display_props.symbol,
          logo: t.display_props.image,
        }));

      setTokens(tokens);
      setLoading(false);
    };

    fetchData();
  }, [JSON.stringify(tokens)]);

  const handleCheckToken = (event) => {
    setCheckedTokens(
      Object.assign({}, checkedTokens, {
        [event.target.name]: tokens.find(
          (t) => t.address === event.target.name
        ),
      })
    );
  };

  const handleCheckAll = (event) => {
    const newCheckedTokens = {};

    for (const t of tokens) {
      newCheckedTokens[t.address] = t;
    }

    setCheckedTokens(newCheckedTokens);
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
          disabled={tokens.length === 0 || !secretjs || loading}
          onClick={async () => {
            setLoading(true);
            const numOfMsgs = Object.keys(checkedTokens).length;
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
                Object.values(checkedTokens).map((t) => ({
                  contractAddress: t.address,
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
          control={<Checkbox color="secondary" onChange={handleCheckAll} />}
          label={`Select all`}
        />
      </div>
      {tokens.map((t) => (
        <div key={t.address}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name={t.address}
                onChange={handleCheckToken}
              />
            }
            label={`${t.name} (${t.symbol})`}
          />
        </div>
      ))}
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
