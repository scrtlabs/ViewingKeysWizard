import { Window as KeplrWindow } from "@keplr-wallet/types";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import React, { ChangeEvent, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MsgExecuteContract, SecretNetworkClient } from "secretjs";
import { KeplrPanel, getKeplrViewingKey } from "./KeplrStuff";
import "./index.css";
import { BasicToken, ComplexToken, SecretAddress, Token, tokenList as localTokens } from "./tokens";

declare global {
  interface Window extends KeplrWindow {}
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(2.8),
      height: theme.spacing(2.8),
      boxShadow: "rgba(0, 0, 0, 0.15) 0px 6px 10px",
    },
    smallAvatar: {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
    customBadge: {
      backgroundColor: "transparent",
      color: "white",
    },
  })
);

const footerHeight = "1.8rem";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ minHeight: `calc(100vh - ${footerHeight})` }}>
      <App />
    </div>
    <footer
      style={{
        height: footerHeight,
        width: "100%",
        backgroundColor: "#e7e7e7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        left: 0,
        bottom: 0,
      }}
    >
      <span style={{ marginRight: "0.3rem" }}>Made with</span>
      <FavoriteIcon fontSize="small" color="secondary" />
      <span style={{ margin: "0 0.3rem" }}>by SCRT Labs</span>
      <a
        href="https://github.com/scrtlabs/ViewingKeysWizard"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "black" }}
      >
        <GitHubIcon fontSize="small" />
      </a>
    </footer>
  </React.StrictMode>,
  document.getElementById("root")
);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCsv, setLoadingCsv] = useState<boolean>(false);
  const [tokens, setTokens] = useState<Map<SecretAddress, Token>>(new Map<SecretAddress, Token>());
  const [relatedTokens, setRelatedTokens] = useState<Map<SecretAddress, Set<SecretAddress>>>(
    new Map<SecretAddress, Set<SecretAddress>>()
  );
  const [selectedTokens, setSelectedTokens] = useState<Set<SecretAddress>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [isSelectRelated, setSelectRelated] = useState<boolean>(false);
  const [myAddress, setMyAddress] = useState<SecretAddress | null>(null);
  const [secretjs, setSecretjs] = useState<SecretNetworkClient | null>(null);
  const [isHelpDialogOpened, setIsHelpDialogOpened] = useState(false);

  useEffect(() => {
    const loadTokens = async () => {
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
        }

        tokens.set(token.address, token);
      }

      setTokens(tokens);
      setRelatedTokens(relatedTokens);
      setLoading(false);
    };

    loadTokens();
  }, []);

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
    <div style={{ padding: "0.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "3rem",
        }}
      >
        <KeplrPanel secretjs={secretjs} setSecretjs={setSecretjs} myAddress={myAddress} setMyAddress={setMyAddress} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          disabled={selectedTokens.size === 0 || !secretjs || loading || isTooMuchGas}
          onClick={async () => {
            if (!secretjs) {
              console.error("Wat?");
              return;
            }

            const tokensToSet: Array<{ token: SecretAddress; viewingKey: string }> = Array.from(selectedTokens).map(
              (token) => {
                return { token, viewingKey: "banana" };
              }
            );

            setLoading(true);
            try {
              const { transactionHash } = await secretjs.tx.broadcast(
                tokensToSet.map(
                  ({ token, viewingKey }) =>
                    new MsgExecuteContract({
                      contract_address: token,
                      code_hash: tokens.get(token)?.codeHash,
                      msg: { set_viewing_key: { key: viewingKey } },
                      sender: myAddress!,
                    })
                ),
                {
                  gasLimit: calculateGasLimit(selectedTokens.size),
                }
              );

              try {
                const tx = await secretjs.query.getTx(transactionHash);

                if (tx!.code !== 0) {
                  console.error(`Tx failed: ${tx!.rawLog}`);
                  return;
                } else {
                  console.log(`Viewing keys successfully set.`);
                }
              } catch (error) {
                console.log("Still waiting for tx to commit on-chain:", error);
              }

              console.log("My address:", myAddress);
              for (const token of tokensToSet) {
                let balance = await secretjs.query.compute.queryContract({
                  contract_address: token.token,
                  query: { balance: { address: myAddress, key: "banana" } },
                });
                let balanceStr = JSON.stringify(balance);
                while (balanceStr.includes("Wrong viewing key for this address or viewing key not set")) {
                  await sleep(3000);
                  balance = await secretjs.query.compute.queryContract({
                    contract_address: token.token,
                    query: { balance: { address: myAddress, key: "banana" } },
                  });
                  balanceStr = JSON.stringify(balance);
                }

                console.log(`Balance of ${token.token}: ${balanceStr}`);
              }
            } catch (e: any) {
              console.error(`Error: ${e.message}`);
              alert(`Error: ${e.message}`);
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? <CircularProgress size="2rem" /> : "Set Viewing Keys"}
        </Button>
        <IconButton color="primary" onClick={() => setIsHelpDialogOpened(true)}>
          <HelpOutlineIcon />
        </IconButton>
        <Dialog onClose={() => setIsHelpDialogOpened(false)} open={isHelpDialogOpened}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h5">What's this?</Typography>
              <IconButton onClick={() => setIsHelpDialogOpened(false)}>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Setup all your secret tokens at once!
              <br />
              Use it like this:
              <ul>
                <li>Select all your secret tokens</li>
                <li>Click on "Set Viewing Keys"</li>
              </ul>
            </Typography>
            <Typography gutterBottom>
              This will send a single transaction that will set strong viewing keys on all your secret tokens, then
              Keplr will prompt you to store the viewing keys locally in your wallet.
            </Typography>
            <Typography variant="h6" gutterBottom>
              We need your help!
            </Typography>
            <Typography gutterBottom>
              This app is in open beta, and we hope to eventually integrate it into apps like the{" "}
              <a href="https://bridge.scrt.network" target="_blank">
                Secret Bridge
              </a>
              {", "}
              <a href="https://app.secretswap.net" target="_blank">
                SecretSwap
              </a>
              {" and "}
              <a href="https://sienna.network" target="_blank">
                Sienna
              </a>{" "}
              so any and all feedback is most welcome!
            </Typography>
            <Typography gutterBottom>
              Feedback channels:
              <ul>
                <li>
                  In a{" "}
                  <a href="https://github.com/scrtlabs/ViewingKeysWizard/issues/new" target="_blank">
                    GitHub issue
                  </a>
                </li>
                <li>
                  On{" "}
                  <a href="https://forum.scrt.network/t/viewing-keys-wizard-feedback-wanted/4046" target="_blank">
                    the forum
                  </a>
                </li>
                <li>
                  Tag @assafmo on{" "}
                  <a href="https://t.me/SCRTCommunity" target="_blank">
                    Telegram
                  </a>{" "}
                  or on{" "}
                  <a href="https://chat.scrt.network" target="_blank">
                    Discord
                  </a>
                </li>
              </ul>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setIsHelpDialogOpened(false)} color="primary">
              Got it
            </Button>
          </DialogActions>
        </Dialog>
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
        <Button
          variant="outlined"
          color="primary"
          disabled={!secretjs || loadingCsv}
          onClick={async () => {
            if (!secretjs) {
              console.error("Wat?");
              return;
            }

            setLoadingCsv(true);

            const tokenList = Array.from(tokens.keys());
            const viewingKeys = await Promise.all(tokenList.map((token) => getKeplrViewingKey(token)));

            let csvContent = `"Address","Name","Viewing Key"\n`;
            for (let i = 0; i < tokenList.length; i++) {
              if (viewingKeys[i] === null) {
                continue;
              }

              const token = tokens.get(tokenList[i]);
              if (!token) {
                console.error("Uh?");
                continue;
              }

              csvContent += `"${token.address}","${getTokenName(token, tokens)}","${viewingKeys[i]}"\n`;
            }

            download("keplr_viewing_keys.csv", csvContent);

            setLoadingCsv(false);
          }}
        >
          {loadingCsv ? <CircularProgress size="1rem" /> : "Export tokens from Keplr to CSV"}
        </Button>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <div style={{ minWidth: "15rem" }}>
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
    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.3rem" }}>
          <TokenLogo token={token as BasicToken} />
        </span>
        {getTokenName(token, tokens)}
      </div>
    );
  } else if (token.type == "LP") {
    const [asset1, asset2] = (token as ComplexToken).assets;

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "0.2rem" }}>
          <TokenLogo token={tokens.get(asset1) as BasicToken} />
        </span>
        <span style={{ marginRight: "0.3rem" }}>
          <TokenLogo token={tokens.get(asset2) as BasicToken} />
        </span>
        {getTokenName(token, tokens)}
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

    label = (
      <div style={{ display: "flex", alignItems: "center" }}>
        {lockAsset2 ? (
          <>
            <span style={{ marginRight: "0.2rem" }}>
              <TokenLogo token={tokens.get(lockAsset1) as BasicToken} />
            </span>
            <span style={{ marginRight: "0.2rem" }}>
              <TokenLogo token={tokens.get(lockAsset2) as BasicToken} />
            </span>
          </>
        ) : (
          <span style={{ marginRight: "0.2rem" }}>
            <TokenLogo token={tokens.get(lockAsset1) as BasicToken} />
          </span>
        )}
        {"➜"}
        <span style={{ marginLeft: "0.2rem", marginRight: "0.3rem" }}>
          <TokenLogo token={tokens.get(rewardsAsset) as BasicToken} />
        </span>
        {getTokenName(token, tokens)}
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
  let gasPerMsg = 11_000;
  if (numOfMsgs >= 2) {
    gasPerMsg = 8_500;
  }
  if (numOfMsgs >= 5) {
    gasPerMsg = 6_800;
  }
  if (numOfMsgs >= 10) {
    gasPerMsg = 6_200;
  }
  if (numOfMsgs >= 15) {
    gasPerMsg = 5_900;
  }
  if (numOfMsgs >= 50) {
    gasPerMsg = 5_700;
  }

  return gasPerMsg * numOfMsgs * 5;
}

function toHexString(byteArray: Uint8Array): string {
  return Array.from(byteArray, (byte) => ("0" + (byte & 0xff).toString(16)).slice(-2)).join("");
}

function getTokenName(token: Token, tokens: Map<SecretAddress, Token>): string {
  if (token.type === "SECRET" || token.type === "ETH" || token.type === "BSC") {
    const { symbol, name } = token as BasicToken;
    return `${name} (${symbol})`;
  } else if (token.type === "LP") {
    const [asset1, asset2] = (token as ComplexToken).assets;
    return `LP ${(tokens.get(asset1) as BasicToken).symbol}-${(tokens.get(asset2) as BasicToken).symbol}`;
  } else {
    // token.type === "REWARDS"
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

    return `Rewards ${symbol} ${(token as ComplexToken).isDeprecated ? "(Old)" : ""}`;
  }
}

function download(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute("href", "data:application/octet-stream," + encodeURIComponent(text));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
