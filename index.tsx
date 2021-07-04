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

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [ethTokens, setEthTokens] = useState<Token[]>([]);
  const [checkedTokens, setCheckedTokens] = useState<{
    [address: string]: Token;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const tokens = (
        await (
          await fetch("https://api-bridge-mainnet.azurewebsites.net/tokens")
        ).json()
      ).tokens.map((t) => ({
        address: t.dst_address,
        name: t.name,
        symbol: t.display_props.symbol,
        logo: t.display_props.image,
      }));
      setEthTokens(tokens);
    };

    fetchData();
  }, [JSON.stringify(ethTokens)]);

  const handleCheckToken = (event) => {
    setCheckedTokens(
      Object.assign({}, checkedTokens, {
        [event.target.name]: ethTokens.find(
          (t) => t.address === event.target.name
        ),
      })
    );
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
          disabled={ethTokens.length === 0 || !secretjs || loading}
          onClick={async () => {
            setLoading(true);
            const ops = Object.keys(checkedTokens).length;
            try {
              await secretjs.multiExecute(
                Object.values(checkedTokens).map((t) => ({
                  contractAddress: t.address,
                  handleMsg: { set_viewing_key: { key: "banana" } },
                })),
                "",
                getFeeForExecute(75_000 * ops)
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
      {ethTokens.map((t) => (
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
