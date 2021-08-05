import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Avatar,
  TextField,
  Badge,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { ComplexToken, SecretAddress, Token, BasicToken, tokenList as localTokens } from "./tokens";
import { SigningCosmWasmClient } from "secretjs";
import { StdFee } from "secretjs/types/types";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { KeplrPanel, setKeplrViewingKeys } from "./KeplrStuff";
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

const footerHeight = "1.8em";

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
      <span style={{ marginRight: "0.3em" }}>Made with</span>
      <FavoriteIcon fontSize="small" color="secondary" />
      <span style={{ margin: "0 0.3em" }}>by Team Enigma</span>
      <a
        href="https://github.com/enigmampc/ViewingKeysWizard"
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
        } else if (token.type === "SECRET" || token.type === "ETH" || token.type === "BSC") {
          token.logo = `/${token.logo}`;
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
    <div style={{ padding: "0.5em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          minHeight: "3em",
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

            const tokensToSet = Array.from(selectedTokens);
            const viewingKeyToSet = viewingKeyRef.current.value;

            setLoading(true);
            try {
              const { transactionHash } = await secretjs.multiExecute(
                tokensToSet.map((token) => ({
                  contractAddress: token,
                  contractCodeHash: tokens.get(token)?.codeHash,
                  handleMsg: { set_viewing_key: { key: viewingKeyToSet } },
                })),
                "",
                getFeeForExecute(calculateGasLimit(selectedTokens.size))
              );

              while (true) {
                try {
                  const tx = await secretjs.restClient.txById(transactionHash, true);

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

              await setKeplrViewingKeys(tokensToSet, viewingKeyToSet);

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
                <li>Type in a password that will be used as your viewing key</li>
                <li>Select all your secret tokens</li>
                <li>Click on "Set"</li>
              </ul>
            </Typography>
            <Typography gutterBottom>
              This will send a single transaction that will set the viewing key on all of your secret tokens, then Keplr
              will prompt you to store the viewing key locally in your wallet.
            </Typography>
            <Typography variant="h6" gutterBottom>
              We need your help!
            </Typography>
            <Typography gutterBottom>
              This app is in open beta, and we hope to eventually integrate it into the{" "}
              <a href="https://bridge.scrt.network" target="_blank">
                Secret Bridge
              </a>{" "}
              and{" "}
              <a href="https://app.secretswap.io" target="_blank">
                SecretSwap
              </a>
              , so any and all feedback is most welcome!
            </Typography>
            <Typography gutterBottom>
              Feedback channels:
              <ul>
                <li>
                  In a{" "}
                  <a href="https://github.com/enigmampc/ViewingKeysWizard/issues/new" target="_blank">
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
