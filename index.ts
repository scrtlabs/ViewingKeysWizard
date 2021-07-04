import { SigningCosmWasmClient } from "secretjs";
import { Window as KeplrWindow } from "@keplr-wallet/types";
declare global {
  interface Window extends KeplrWindow {}
}

const chainId = "secret-2";

window.onload = async () => {
  await window.keplr.enable(chainId);

  const keplrOfflineSigner = window.getOfflineSigner(chainId);
  const accounts = await keplrOfflineSigner.getAccounts();

  const address = accounts[0].address;
  console.log(`Network: ${chainId}`);
  console.log(
    `Account: https://secretnodes.com/secret/chains/secret-2/accounts/${address}`
  );
  const secretjs = new SigningCosmWasmClient(
    "https://lcd.enigma.co",
    address,
    //@ts-ignore
    keplrOfflineSigner,
    window.getEnigmaUtils(chainId)
  );
};
