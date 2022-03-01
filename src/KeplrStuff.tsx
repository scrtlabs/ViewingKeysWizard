import { Button } from "@material-ui/core";
import { FileCopyOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BroadcastMode, SigningCosmWasmClient } from "secretjs";
import { SecretAddress } from "./tokens";

export function KeplrPanel({
  secretjs,
  setSecretjs,
  myAddress,
  setMyAddress,
}: {
  secretjs: SigningCosmWasmClient | null;
  setSecretjs: React.Dispatch<React.SetStateAction<SigningCosmWasmClient | null>>;
  myAddress: SecretAddress | null;
  setMyAddress: React.Dispatch<React.SetStateAction<SecretAddress | null>>;
}) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const content = (
    <div style={{ display: "flex", alignItems: "center", borderRadius: 10 }}>
      <img src="/keplr.svg" style={{ width: "1.8rem", borderRadius: 10 }} />
      <span style={{ margin: "0 0.3rem" }}>{secretjs ? myAddress : "Connect wallet"}</span>
    </div>
  );

  if (secretjs) {
    return (
      <CopyToClipboard
        text={myAddress as SecretAddress}
        onCopy={() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 3000);
        }}
      >
        <Button variant="contained" style={{ background: "white", textTransform: "none" }}>
          {content} <FileCopyOutlined fontSize="small" style={isCopied ? { fill: "green" } : undefined} />
        </Button>
      </CopyToClipboard>
    );
  } else {
    return (
      <Button variant="contained" style={{ background: "white" }} onClick={() => setupKeplr(setSecretjs, setMyAddress)}>
        {content}
      </Button>
    );
  }
}

export const chainId = "secret-4";

async function setupKeplr(
  setSecretjs: React.Dispatch<React.SetStateAction<SigningCosmWasmClient | null>>,
  setMyAddress: React.Dispatch<React.SetStateAction<SecretAddress | null>>
) {
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  while (!window.keplr || !window.getEnigmaUtils || !window.getOfflineSigner) {
    await sleep(50);
  }

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

  setMyAddress(myAddress as SecretAddress);
  setSecretjs(secretjs);
}

export async function setKeplrViewingKeys(tokensToSet: Array<{ token: SecretAddress; viewingKey: string }>) {
  if (!window.keplr) {
    console.error("Keplr not present");
    return;
  }

  for (const { token, viewingKey } of tokensToSet) {
    console.log("setting vk", token, viewingKey);

    await window.keplr.suggestToken(chainId, token, viewingKey);
    console.log(`Viewing key ${viewingKey} saved for token ${token} in Keplr`);
  }
}

export async function getKeplrViewingKey(token: SecretAddress): Promise<string | null> {
  if (!window.keplr) {
    console.error("Keplr not present");
    return null;
  }

  try {
    return await window.keplr.getSecret20ViewingKey(chainId, token);
  } catch (e) {
    return null;
  }
}
