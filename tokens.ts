export type Token = {
  address: string;
  codeHash: string;
  name: string;
  symbol: string;
  logo: string;
  type: "SECRET" | "ETH" | "BSC" | "LP" | "REWARDS";
};

export const tokenList: Token[] = [
  // Secret
  {
    address: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash:
      "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
    name: "Secret SCRT",
    symbol: "sSCRT",
    logo: "scrt.svg",
    type: "SECRET",
  },
  {
    address: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash:
      "c7fe67b243dfedc625a28ada303434d6f5a46a3086e7d2b5063a814e9f9a379d",
    name: "Secret Finance",
    symbol: "SEFI",
    logo: "sefi.svg",
    type: "SECRET",
  },
  {
    address: "secret1vq0gc5wdjqnalvtgra3dr4m07kaxkhq2st3hzx",
    codeHash:
      "84508d76f34061e5e394b596fc293f1bf66d33d03def5b77a27643f2bc0bea8d",
    name: "Sienna",
    symbol: "SIENNA",
    logo: "sienna.svg",
    type: "SECRET",
  },
  {
    address: "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
    codeHash:
      "15361339b59f2753fc365283d4a144dd3a4838e237022ac0249992d8d9f3b88e",
    name: "Fat Secret",
    symbol: "FATS",
    logo: "fat_secret.png",
    type: "SECRET",
  },
  // ETH
  {
    address: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Ethereum",
    symbol: "ETH",
    logo: "eth.png",
    type: "ETH",
  },
  {
    address: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Tether",
    symbol: "USDT",
    logo: "0xdac17f958d2ee523a2206206994597c13d831ec7.png",
    type: "ETH",
  },
  {
    address: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Dai Stablecoin",
    symbol: "DAI",
    logo: "0x6b175474e89094c44da98b954eedeac495271d0f.png",
    type: "ETH",
  },
  {
    address: "secret1szqzgpl9w42kekla57609y6dq2r39nf0ncx400",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Compound",
    symbol: "COMP",
    logo: "0xc00e94cb662c3520282e6f5717214004a7f26888.png",
    type: "ETH",
  },
  {
    address: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Uniswap",
    symbol: "UNI",
    logo: "uni.png",
    type: "ETH",
  },
  {
    address: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "yearn.finance",
    symbol: "YFI",
    logo: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png",
    type: "ETH",
  },
  {
    address: "secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "TrueUSD",
    symbol: "TUSD",
    logo: "0x0000000000085d4780b73119b644ae5ecd22b376.png",
    type: "ETH",
  },
  {
    address: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Ocean",
    symbol: "OCEAN",
    logo: "0x967da4048cd07ab37855c090aaf366e4ce1b9f48.png",
    type: "ETH",
  },
  {
    address: "secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "ChainLink",
    symbol: "LINK",
    logo: "0x514910771af9ca656af840dff83e8264ecf986ca.png",
    type: "ETH",
  },
  {
    address: "secret1tqltnm8f53xnprmnlurczf6sr86a4mgztafxzp",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Maker",
    symbol: "MKR",
    logo: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png",
    type: "ETH",
  },
  {
    address: "secret15c5ftq4rq7xq3tml4nphv2fvz3u7kg73a583qp",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Synthetix Network",
    symbol: "SNX",
    logo: "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png",
    type: "ETH",
  },
  {
    address: "secret1p4zvqgxggrrk435nj94p6la2g4xd0rwssgzpsr",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "BandToken",
    symbol: "BAND",
    logo: "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55.png",
    type: "ETH",
  },
  {
    address: "secret1rs389ss2jch4xjmxv5guru86s8y839nmjsrm5d",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "KyberNetwork",
    symbol: "KNC",
    logo: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png",
    type: "ETH",
  },
  {
    address: "secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Aave",
    symbol: "AAVE",
    logo: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png",
    type: "ETH",
  },
  {
    address: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Wrapped BTC",
    symbol: "WBTC",
    logo: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png",
    type: "ETH",
  },
  {
    address: "secret1ezg8weaamcr99848qhkqcf2ap5xz7nwe3cy22x",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "Basis Cash",
    symbol: "BAC",
    logo: "0x3449fc1cd036255ba1eb19d65ff4ba2b8903a69a.png",
    type: "ETH",
  },
  {
    name: "REN",
    address: "secret1s4fllut0e6vw0k3fxsg4fs6fm2ad6hn09zwgwv",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "REN",
    logo: "0x408e41876cccdc0f92210600ef50372656052a38.png",
    type: "ETH",
  },
  {
    name: "RENBTC",
    address: "secret13j9sg2lpmwl92taac4lr3xqhslnm2yjm4nsmzl",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "RENBTC",
    logo: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png",
    type: "ETH",
  },
  {
    name: "Sushi",
    address: "secret19uje5xy80rm6rfu03df2xea532mcalw9hv8vf9",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "SUSHI",
    logo: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2.png",
    type: "ETH",
  },
  {
    name: "ReserveRights",
    address: "secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "RSR",
    logo: "0x8762db106b2c2a0bccb3a80d1ed41273552616e8.png",
    type: "ETH",
  },
  {
    name: "USDC",
    address: "secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "USDC",
    logo: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
    type: "ETH",
  },
  {
    name: "DefiPulse Index",
    address: "secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "DPI",
    logo: "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b.png",
    type: "ETH",
  },
  {
    address: "secret1d673zrls7z5sd7nzqavqs4uzahnzqxq9zk7e62",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    name: "UNILP WSCRT-ETH",
    symbol: "",
    logo: "scrt.svg",
    type: "ETH",
  },
  {
    name: "THORChain (ERC20)",
    address: "secret1el5uj9ns9sty682dem033pt50xsv5mklmsvy24",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "RUNE",
    logo: "0x3155ba85d5f96b2d030a4966af206230e46849cb.png",
    type: "ETH",
  },
  {
    name: "Tornado Cash",
    address: "secret19g8edr6pa2s7ywuc3wys9sgk76kj2th7xtksey",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "TORN",
    logo: "0x77777feddddffc19ff86db637967013e6c6a116c.png",
    type: "ETH",
  },
  {
    name: "Basic Attention Token",
    address: "secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "BAT",
    logo: "0x0d8775f648430679a709e98d2b0cb6250d2887ef.png",
    type: "ETH",
  },
  {
    name: "0x",
    address: "secret120vtzu6xjprp6pq0r8wprf3jlp86xr8uu0nlc5",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "ZRX",
    logo: "0xe41d2489571d322189246dafa5ebde1f4699f498.png",
    type: "ETH",
  },
  {
    name: "Enjin Coin",
    address: "secret1wp8aj7tja30cek5wf5jwcv0xalw8vmdasfv2lh",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "ENJ",
    logo: "0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png",
    type: "ETH",
  },
  {
    name: "Decentraland",
    address: "secret178t2cp33hrtlthphmt9lpd25qet349mg4kcega",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "MANA",
    logo: "0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png",
    type: "ETH",
  },
  {
    name: "YF Link",
    address: "secret1jk0tw00vs23n8jwqdzrxtln6ww2a3k6em7s0p2",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "YFL",
    logo: "yflink_32.png",
    type: "ETH",
  },
  {
    name: "AlphaToken",
    address: "secret1h0tn05w9cjtsz9stccq2xl5rha2fxl0n2d765t",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "ALPHA",
    logo: "0xa1faa113cbe53436df28ff0aee54275c13b40975.png",
    type: "ETH",
  },
  {
    name: "Polygon",
    address: "secret1pse3xfvv5pq5jw04wcaxhnhn7jqamfhcpm7j3t",
    codeHash:
      "2da545ebc441be05c9fa6338f3353f35ac02ec4b02454bc49b1a66f4b9866aed",
    symbol: "MATIC",
    logo: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0.png",
    type: "ETH",
  },
  // BSC
  {
    address: "secret1tact8rxxrvynk4pwukydnle4l0pdmj0sq9j9d5",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Coin",
    symbol: "BNB(BSC)",
    logo: "binance-coin-bnb-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1793ctg56epnzjlv7t7mug2tv3s2zylhqssyjwe",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance BUSD",
    symbol: "BUSD(BSC)",
    logo: "binance-usd-busd-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1m6a72200733a7jnm76xrznh9cpmt4kf5ql0a6t",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Ethereum",
    symbol: "ETH(BSC)",
    logo: "eth.png",
    type: "BSC",
  },
  {
    address: "secret1j0urq4pfrjr55c95z9s9jzv0evj88gjc9m0h02",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance XRP",
    symbol: "XRP(BSC)",
    logo: "xrp-xrp-logo.svg",
    type: "BSC",
  },
  {
    address: "secret16euwqyntvsp0fp2rstmggw77w5xgz2z26cpwxj",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance USDT",
    symbol: "USDT(BSC)",
    logo: "tether-usdt-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1t6228qgqgkwhnsegk84ahljgw2cj7f9xprk9zd",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Cardano",
    symbol: "ADA(BSC)",
    logo: "cardano-ada-logo.svg",
    type: "BSC",
  },
  {
    address: "secret16nqax7x66z4efpu3y0kssdfnhg93va0h20yjre",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Dogecoin",
    symbol: "DOGE(BSC)",
    logo: "dogecoin-doge-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1px5mtmjh072znpez4fjpmxqsv3hpevdpyu9l4v",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Polkadot",
    symbol: "DOT(BSC)",
    logo: "polkadot-new-dot-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1kf45vm4mg5004pgajuplcmkrzvsyp2qtvlklyg",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance USDC",
    symbol: "USDC(BSC)",
    logo: "usd-coin-usdc-logo.svg",
    type: "BSC",
  },
  {
    address: "secret12cwvnd5g0r7raq94rpve93rdrl49f3rpw30gqn",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Bitcoin Cash",
    symbol: "BCH(BSC)",
    logo: "bitcoin-cash-bch-logo.svg",
    type: "BSC",
  },
  {
    address: "secret17zt6ycf3n079fngha6ku5u4qwjca2k2jq6rfp9",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Litecoin",
    symbol: "LTC(BSC)",
    logo: "litecoin-ltc-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1trr50jqff3ncn099cpukehh8a4pjxu0d3m4ccq",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance ChainLink",
    symbol: "LINK(BSC)",
    logo: "0x514910771af9ca656af840dff83e8264ecf986ca.png",
    type: "BSC",
  },
  {
    address: "secret1ehz0rjrng3q8pr8sdduuajnwq7fwrdhqf8awtz",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance Tron",
    symbol: "TRX(BSC)",
    logo: "tron-trx-logo.svg",
    type: "BSC",
  },
  {
    address: "secret13z4thzp3zzyxr008fsygnpn2jpl84w884gfy86",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "PancakeSwap",
    symbol: "CAKE",
    logo: "pancakeswap-cake-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1r8pgpj8x8ptqxwlweu8j8dqagjmqzugxpxa706",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Bakery Swap",
    symbol: "BAKE",
    logo: "bakerytoken-bake-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1npxd6pyh7ujhdsk7cvmq93y2v5uccj79sccch5",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Venus",
    symbol: "XVS",
    logo: "venus-xvs-logo.svg",
    type: "BSC",
  },
  {
    address: "secret1u9myrsw6mmgvmrrgjnkermayp88arkjd5e9jut",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Linear",
    symbol: "LINA",
    logo: "logo-crypto-linear-buildr.svg",
    type: "BSC",
  },
  {
    address: "secret1ztejvy40avl54gu049jdk4wtggcq2uxnw0wnxu",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Refinable",
    symbol: "FINE",
    logo: "refinable-fine-logo.png",
    type: "BSC",
  },
  {
    address: "secret1fsmwnrttkr2qtywzzlkmy6wpu22khg7a88kzm6",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Bunny",
    symbol: "BUNNY",
    logo: "token-bunny.svg",
    type: "BSC",
  },
  {
    address: "secret1c7apt5mmv9ma5dpa9tmwjunhhke9de2206ufyp",
    codeHash:
      "d0db7128b8697419ad915c9fa2c2b2da462634ab95cbb3ca187564a1275561cf",
    name: "Binance SCRT",
    symbol: "SCRT(BSC)",
    logo: "scrt.svg",
    type: "BSC",
  },
  // SecretSwap LP
  // name is "${asset1}-${asset2}"
  // symbol is unused
  // logo will be taken from the assets
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret17gja535zp09t9mlzzxndqqg4gzvhg0vsklhd54",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    address: "secret1cgd6gcc4uyrxmzsmk4tpeta8auzcgwk4n5ngrx",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1he6rzcet6jcwryu544a5zkkadxee4sk0umu703",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    address: "secret1rldr66767a4gz3adkq2vgndwgnxlfqqae4fgen",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret17w0wjempgtt8ngn59y7cwlae02kve5jzar4xmw",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
    address: "secret1xxvqanj85m7dppplku5782cn9hl8askqd329sv",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    address: "secret1m8msletvevuj2vsl8rcvqq9esflxmmnd2lf7yd",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    address: "secret1jmv4h3f8rtlxsfaven4kstdaq55pr8rwty8ss5",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
    address: "secret1kduh3vlszmg3snq36k6s8l4v8s26z47m3q9haa",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    address: "secret102gfpp4hgvytxlxsz8hnjy7uqndmhau3jkzps8",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    address: "secret1v8h6em4ya9m62qusgxqq9w2gdpevtat549l27v",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1r0l0g7l07y7xrpyys80z3qu2eqvnfjlpcees2x",
    address: "secret10e3yqlvc7u7jn86rec7mvv9f38hu3xm3v73fhr",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1kg8pd6ag4cx72302uflm5n8nau2m6k7q9efck3",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps-secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    address: "secret1ket00reye5tuaurqd3lh4kplsz4rjpe7hepmzf",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1r0l0g7l07y7xrpyys80z3qu2eqvnfjlpcees2x-secret1vp5vrl0wacxlkh03xkcvfh6q9tcrw4qrl4q4a5",
    address: "secret1uvy5c30vefcneej7x35rq5lryqghlad45z2mdk",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1vp5vrl0wacxlkh03xkcvfh6q9tcrw4qrl4q4a5-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1xcecc2tt5rph6mfuj45nwvtmur7gfuh8yrae68",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    address: "secret17de3ltvztmmutujlg3lwlpsmzeeykjzru8et6d",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1nvqrwwr9942gn89nk44nf2nku6gr7u8tsg6z45",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1udzehhadgcpt3na688suy4xtra3sjxv4l42ktn",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp",
    address: "secret1hsd23gm7ces9rf24e0mryhywlcl4l5903pwrts",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv-secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
    address: "secret1xwvxlcpdwfqpezh2gtlmyxmdr8jyedznuus3rj",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret1hk47f93mnzu702ya0akwn4p4f4gte895v0xpsk",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1hat67au4nzpvjxuzz68540cnwng2mujpa23248",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq-secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv",
    address: "secret12kw8cul8ssyvfffyctngzlr0a7c25rcmv2pva2",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1pprth4wa696lnyhtmpvwpa0x8zhqe6pr4fsrvc",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv",
    address: "secret1azgy8zx6duz2s4yhxqvghsd25gnun6hefy7ff4",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1gv6l62pfzaauyl0sjznczjdxk3x4ez2sfm3hx8-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret144sqq0cvpcpdzkjrrznu09xyqg97elmx4pjyw0",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps-secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    address: "secret1e9hqygaphtnp34tjv80pzpgm0r8jjug6eduz2c",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret19uje5xy80rm6rfu03df2xea532mcalw9hv8vf9",
    address: "secret15atu5s5aqhkezg44d035nufq80ltwx968vey00",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a-secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    address: "secret1ysd3f2ydqawlrrjhfarkf35tc57ayca7sqpwqq",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te-secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
    address: "secret169j4wejhtq6s8cqptae09ftjnnm8ekkjk73hgd",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15c5ftq4rq7xq3tml4nphv2fvz3u7kg73a583qp-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1y2pjf7zaswfvqtfja8uwlzep3h9xjtmupgx6vr",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret10phk4mdrz0wcfrmulzcvxfpaeuz20g6eatef08",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret15lsv600d4jrwpl27ewy5vz6dse4kmx7fy7dznd",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a-secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    address: "secret1ej6n3a6zcdchvqxdjwqrj9ks7683m8fhvz9846",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1jdvjcplxywh068jzrajdvda87faer9zz268v26",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15c5ftq4rq7xq3tml4nphv2fvz3u7kg73a583qp-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1tp25zaypu53g8av4qcr3gdrzujerxze38hm090",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps-secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    address: "secret1kp9nhawtxgxue2qggnatt73f75vh55c9fq876l",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret1nvq2d00293k8vaeagj23c9eg6kjhec4emnpa9c",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a-secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    address: "secret1tq5t8y37yrqh4gatxplmks4k7vw5auslapkpx7",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
    address: "secret17e9ygy6e990t8gsfe8gf8lg429pncsn22wm9cu",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv-secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    address: "secret1s4e975hvcc37tgunfethl6mc48r6ervw6pzf63",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1p4zvqgxggrrk435nj94p6la2g4xd0rwssgzpsr",
    address: "secret1n5qe4k8zf09gh8zdrydcc3jqls4ceww8wzr2kv",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu",
    address: "secret1t37zhqmyfq5qe7zpwczly6lcq7qa2lrey540zq",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
    address: "secret1tylaycndtscnkgalsfsjc8nx0lrqpvla3ajzfj",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret16efkcwgj3vkxsfvk4j6zjz05ukfxg35zsrj0vs",
    address: "secret1pjf9swahsje7ejqklfp283nxhj0c4txpfac5ye",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1tqltnm8f53xnprmnlurczf6sr86a4mgztafxzp",
    address: "secret185jen8q6ss5xnja33vj7pvqz49m8frkdekvzpy",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq-secret1tqltnm8f53xnprmnlurczf6sr86a4mgztafxzp",
    address: "secret198qgewnmmv7ut6r45pkrknqecxfhmd440aw2gf",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp",
    address: "secret1qcszs0526shrrkrwycqfurrzhk2nauu7a4lcas",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1ezg8weaamcr99848qhkqcf2ap5xz7nwe3cy22x",
    address: "secret138wwgfj4p7w87dwq8hnjckjhpy6kv76e6ez4me",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h",
    address: "secret1k6ypx2hv28yd73c9ethamru48ke9vetqrjzu26",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja",
    address: "secret1djl87ynczxgsm0xzcpqslcwkpuppp5tc68yywv",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret19g8edr6pa2s7ywuc3wys9sgk76kj2th7xtksey",
    address: "secret1853yqdhf2yjnaf2xerhmgsl5dt50t4grh63y3r",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    address: "secret1709qy2smh0r7jjac0qxfgjsqn7zpvgthsdz025",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "uscrt-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1xhvv5uj5fa9yxcuuk4awqw568ve7g05v7fa0vd",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a",
    address: "secret1a9pqlergw53c0fc2nh8fuwk6vem4j4z7ywz02s",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    address: "secret14rxhuxq79lhfy37htl7xkpwqekyhry59xpvjhn",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1tjegqrmat45ur6pwkn3w4tnn7w27azxn6c2q9p",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw-secret1h0tn05w9cjtsz9stccq2xl5rha2fxl0n2d765t",
    address: "secret1qxklqtynsp0fc9mc6p8vnt8m0jajgwjxwja0w9",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1s4fllut0e6vw0k3fxsg4fs6fm2ad6hn09zwgwv",
    address: "secret1m76hs58wqxasd7f6au3c7gx8at5xu2ez9kf44l",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
    address: "secret12pn4fehy0hkymh7p0u8jul395ywez55uhfl96h",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret1qml2ktledypf0m5a7w8p2evgsejlm3qye2hurt",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv",
    address: "secret1mm7df4ygxwlfg0l70jrrkshlhtp8vv5n7hj9rr",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1d673zrls7z5sd7nzqavqs4uzahnzqxq9zk7e62-secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    address: "secret17rch628qthxewc07dpgfjmlf28t82ghpld8hqv",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw",
    address: "secret13leg3yqs3jfw4cuq5dyqeczkk9grx330dfezvp",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1wp8aj7tja30cek5wf5jwcv0xalw8vmdasfv2lh",
    address: "secret1ymxsh0sytl7sfq8hkgcs843cd09ude285ndu2f",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1d673zrls7z5sd7nzqavqs4uzahnzqxq9zk7e62",
    address: "secret1t6vfa5wnzqgvlk7u7u6fz9dwltrn44kzr22fh6",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h",
    address: "secret1skmznhm94a8rywghxj3vm4ltllj4n8uy4uklmc",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja-secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    address: "secret14nlydvrctetjfur4rl20qctscx7mfjf944hyha",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1el5uj9ns9sty682dem033pt50xsv5mklmsvy24",
    address: "secret1kg24nc3v4wm4vzufup8fvmvffxtm8425uwfvqd",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1rs389ss2jch4xjmxv5guru86s8y839nmjsrm5d-secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw",
    address: "secret1zk39zl9h26zjkcuam3hqultqs2nucf0lefxxrj",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te-secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    address: "secret120xdju4pcl9xxntf47chtt0du8cny9lzxu05x9",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1wp8aj7tja30cek5wf5jwcv0xalw8vmdasfv2lh",
    address: "secret1uf6kk3a6damq93w6gnjj4xyr4xdpj86kzpvrwh",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1ezg8weaamcr99848qhkqcf2ap5xz7nwe3cy22x",
    address: "secret1g88sj0xplmutyw0uupk6g6p5qcvjypdf2znpe7",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1rgm2m5t530tdzyd99775n6vzumxa5luxcllml4",
    address: "secret1l3azwns4uqglmu42hnjgfrlqc7hhqulq05cheg",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1s4fllut0e6vw0k3fxsg4fs6fm2ad6hn09zwgwv-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret1kjefu42ujfdfcm7fq4rk08x30u5z8jtdwvndr3",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1rgm2m5t530tdzyd99775n6vzumxa5luxcllml4-secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    address: "secret1tvaja4n4jz7wcqvata5vfxv6gkcn9t78jlty0j",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret178t2cp33hrtlthphmt9lpd25qet349mg4kcega",
    address: "secret1gewshds6yhyry842vnxl9q6krezaatep6rxyt2",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te",
    address: "secret1q6yzuparxlk6ydc5t08zg3hma6e995klwxfwyl",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv-secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    address: "secret1n0gdq68hxeyu5hatqmmz8gcd08x8cs0a0u0pge",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq-secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps",
    address: "secret1w79c8pemt5k4l0ruzyxc7jkjyg6d623wvve64r",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un",
    address: "secret1cucs46suavgnajd050qxh2923nqtnu7p67zwkj",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1h0tn05w9cjtsz9stccq2xl5rha2fxl0n2d765t-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret140gcjdue3ywsr3y6088250stamxtv2jhk05c7t",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret120vtzu6xjprp6pq0r8wprf3jlp86xr8uu0nlc5",
    address: "secret1vrmfs5ql8w3uajer2jqr2x2prffmssa0r8zrhm",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1szqzgpl9w42kekla57609y6dq2r39nf0ncx400-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1dt6lw86drnlfxl5ppnawdw80vtym09p6dhvqg5",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798-secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq",
    address: "secret1e60sgjs6vpsa0g30psjtup03urk3ggjdjqg9ln",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret178t2cp33hrtlthphmt9lpd25qet349mg4kcega",
    address: "secret10sy4y68wa6649nw5c7m00zqcqx06tgrem90k4g",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1rgm2m5t530tdzyd99775n6vzumxa5luxcllml4",
    address: "secret1dengjn6lnw7an0l6rqudxsd739pxyzpyq96lju",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1tact8rxxrvynk4pwukydnle4l0pdmj0sq9j9d5",
    address: "secret1le3d0fgkrzd433fdnetdqslfxmugvg0tuaqspe",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1px5mtmjh072znpez4fjpmxqsv3hpevdpyu9l4v",
    address: "secret1mc656zt6g37u2ufqp2tw8kaj5jxpujylfzw8yw",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1m6a72200733a7jnm76xrznh9cpmt4kf5ql0a6t",
    address: "secret1rwpy396gqqmpxxmkmd98wy9f3m5tsrufx3jdal",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw-secret1m6a72200733a7jnm76xrznh9cpmt4kf5ql0a6t",
    address: "secret1c9ky0x6fj5gc0qw6tedxsng50mjl3szn7xhjeu",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1t6228qgqgkwhnsegk84ahljgw2cj7f9xprk9zd",
    address: "secret1efcwgj5jn0jdqw387p83lyg0tgfff5xycde84x",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret16nqax7x66z4efpu3y0kssdfnhg93va0h20yjre",
    address: "secret14ta2jf4muuem9hl2ktxvlestc260yz97wkmrlv",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret16euwqyntvsp0fp2rstmggw77w5xgz2z26cpwxj",
    address: "secret1mcknw376ayfqykvvz8grya9kdwtev36luhtmrm",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv-secret1kf45vm4mg5004pgajuplcmkrzvsyp2qtvlklyg",
    address: "secret163e9frya0vqar70s4j3na94apf0cffl2rjgmgg",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1tact8rxxrvynk4pwukydnle4l0pdmj0sq9j9d5-secret1kf45vm4mg5004pgajuplcmkrzvsyp2qtvlklyg",
    address: "secret17udwye2ew0kl8vx3pphyas2ytrru7e0lv7sxrr",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt-secret1tact8rxxrvynk4pwukydnle4l0pdmj0sq9j9d5",
    address: "secret1j08nzr6flvfpzx35ahkp23lk9jnte8flux4rly",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret1t6228qgqgkwhnsegk84ahljgw2cj7f9xprk9zd-secret1px5mtmjh072znpez4fjpmxqsv3hpevdpyu9l4v",
    address: "secret1xprxgq8mmwuauwx4wdea3xkjnvxwz8l9fctzs3",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret16euwqyntvsp0fp2rstmggw77w5xgz2z26cpwxj-secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f",
    address: "secret1pzu2paj6syelj2hrgqpaqa7ps77dsxc3l96eul",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f-secret1793ctg56epnzjlv7t7mug2tv3s2zylhqssyjwe",
    address: "secret1fehemfxexk2yxxzpzgglm4ta2r7f90kwnzcu42",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  {
    name: "secret17w6pnfv0yn9k99dc8wttz5h0e0e6hz5pt8k2yu-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    address: "secret1sv23mqdqammv9zdxgp33nk6wqgl07ly92lh5px",
    codeHash:
      "ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8",
    type: "LP",
    symbol: "",
    logo: "",
  },
  // Rewards
  // name is "${inc_token}-${rewards_token}"
  // symbol is unused
  // logo will be taken from the assets
  {
    address: "secret1q6y7wz6pev80aadyjsejk5xr2yj4mkrj40zrvn",
    name: "secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1047wugr9wsxuapxgtyr407uy68cw4d6k6tkf8d",
    name: "secret15grq8y54tvc24j8hf8chunsdcr84fd3d30fvqv>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1kma59tlgk66hwpxvjlcc42gys0sz9jc96v4jak",
    name: "secret18wpjn83dayu4meu6wnn29khfkwdxs7kyrz9c8f>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret19y50xzywrz98g6ljxp43fd4q47sl40gkcpm03n",
    name: "secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret17negel9x6nsanvjwjy0at5ny66zjyppesytk5n",
    name: "secret12sjaw9wutn39cc5wqxfmkypm4n7tcerwfpvmps>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret16q4sz5s4dpzdywrdcnfe8pvucuegrm6m9ksdtd",
    name: "secret1vnjck36ld45apf8u4fedxd5zy7f5l92y3w5qwq>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1ayl9jv7atks34l0vx9n7y6rl60t32ptycac909",
    name: "secret1g7jfnxmxkjgqdts9wlmn238mrzxz5r92zwqv4a>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1qgaxregzkc6z9wmf4rgp5frj9els95zx3cs93u",
    name: "secret1ds8850j99cf5h3hygy25f0zzs6r6s7vsgfs8te>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret12s2260yswdhry8lljp2m83cvudu0zc67h3t8st",
    name: "secret1yxwnyk8htvvq25x2z87yj0r5tqpev452fk6h5h>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1qgfqajzarljueaglzar8tdpgjkmdnr9cqgj9xl",
    name: "secret1szqzgpl9w42kekla57609y6dq2r39nf0ncx400>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1fcvxek0quxhsfvh7xc80e7332hhwn2zamvtqcw",
    name: "secret15c5ftq4rq7xq3tml4nphv2fvz3u7kg73a583qp>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1xdvsf5mah8yhd0ndk2khktkpaqqtat6jwyfecz",
    name: "secret1ryh523y4e3233hphrkdslegszqz8syjfpthcpp>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1hf6tvptq8c5r86dvs037fhmm6m9mclfl5jnhdu",
    name: "secret1rs389ss2jch4xjmxv5guru86s8y839nmjsrm5d>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1gfxwjj5evt9p0wnarheh59shz9kqf7rjf3hjnd",
    name: "secret1p4zvqgxggrrk435nj94p6la2g4xd0rwssgzpsr>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1q762ytweqslmvsryggnunmry6ahhlwek745rau",
    name: "secret1ezg8weaamcr99848qhkqcf2ap5xz7nwe3cy22x>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret13aukj7v7fg8xzpm343s94vp5x244qk8fxjws0j",
    name: "secret1tqltnm8f53xnprmnlurczf6sr86a4mgztafxzp>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1lsvqk5h647y4qfqyn2lxacdetry22txg9mnfzd",
    name: "secret19uje5xy80rm6rfu03df2xea532mcalw9hv8vf9>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1p4a6pr76r4p2sn324ek2ayagr7qvrchwc0radv",
    name: "secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1sugd87x8ul2jxsqpm7gazhgz6tf9zfwmfwk095",
    name: "secret1h6z05y90gwm4sqxzhz4pkyp36cna9xtp7q0urv>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1q8ddhqvsgrwsrdrnspja70cgeyjhw7kymyxzn5",
    name: "secret1ukn328k6y3th5nw9z00p8lvk5s7m05cr9p06cu>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1r8nge6cwweezye4n750gpeqkgaqkazax598gpg",
    name: "secret1d673zrls7z5sd7nzqavqs4uzahnzqxq9zk7e62>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret12u4cjgput2uvdv4y9h5h7rs9grxdx582wlvxgj",
    name: "secret1el5uj9ns9sty682dem033pt50xsv5mklmsvy24>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret15g78xxtmcuc3y77cj89e2dwu9tg3up54vns9uf",
    name: "secret19g8edr6pa2s7ywuc3wys9sgk76kj2th7xtksey>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1uc0k4rwwzccz9a4an773lyuun4l8k4qpvz3k99",
    name: "secret1nq7resltu9870ar7vdu2suhzplx84800jfj2ja>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1snr63w7m44ay9pl9sdkppmyqjxqauh7t5gvms7",
    name: "secret120vtzu6xjprp6pq0r8wprf3jlp86xr8uu0nlc5>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1f9pn0vh8dltxhhpd5qe76ddw3qgl8prufq65yv",
    name: "secret1wp8aj7tja30cek5wf5jwcv0xalw8vmdasfv2lh>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret18ht734kgefpxk49nju3ld8qzzk8g4wcx7tm9ys",
    name: "secret178t2cp33hrtlthphmt9lpd25qet349mg4kcega>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1ra9l5p04sc4pu8vc5djr3c9ds7npmwmzvsee32",
    name: "secret1jk0tw00vs23n8jwqdzrxtln6ww2a3k6em7s0p2>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1e3kzrxjg5eyc8t9c4l0m5s4kj0ym4ku7dwj9ru",
    name: "secret1h0tn05w9cjtsz9stccq2xl5rha2fxl0n2d765t>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret16n5p4d0gsuj4yu5rcg25paflwcgvtdr0tlwtsa",
    name: "secret1pse3xfvv5pq5jw04wcaxhnhn7jqamfhcpm7j3t>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1xkhzk4qa45gpytku2znd2y32j83cl4werlw6gg",
    name: "secret1s4fllut0e6vw0k3fxsg4fs6fm2ad6hn09zwgwv>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1texzs8e40dc40m4phvswxt0e3l5ymmaptzukjz",
    name: "secret13j9sg2lpmwl92taac4lr3xqhslnm2yjm4nsmzl>secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1097s3zmexc4mk9s2rdv3gs6r76x9dn9rmv86c7",
    name: "secret1709qy2smh0r7jjac0qxfgjsqn7zpvgthsdz025>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1a3qvtsxd3fu5spkrscp5wwz3gtjmf50fgruezy",
    name: "secret1xxvqanj85m7dppplku5782cn9hl8askqd329sv>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1zysw570u5edsfdp44q80tm5zhdllawgh603ezy",
    name: "secret1cgd6gcc4uyrxmzsmk4tpeta8auzcgwk4n5ngrx>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1mznq6qwlj3ryzfpetfgydffef7w40tmlkhufcl",
    name: "secret1nvqrwwr9942gn89nk44nf2nku6gr7u8tsg6z45>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1y9z3ck449a46r4ku7klkhdxnlq07zh4shc7cuy",
    name: "secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret146dg4c7jt5y37nw94swp6sahleshefxhrerpqm",
    name: "secret17gja535zp09t9mlzzxndqqg4gzvhg0vsklhd54>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1mlv3av6nlqt3fmzmtw0pnehsff2dxrzxq98225",
    name: "secret1rldr66767a4gz3adkq2vgndwgnxlfqqae4fgen>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret16wup0xc9m5ndgvna3p523xntk7favp353xa79v",
    name: "secret1kg24nc3v4wm4vzufup8fvmvffxtm8425uwfvqd>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1rxu6rksvyaxksnhqszv06d3n92y0prgr2ghj5m",
    name: "secret102gfpp4hgvytxlxsz8hnjy7uqndmhau3jkzps8>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret13gdhmsf5j9jjva6d924hhdjrngf8092tv5frp8",
    name: "secret1m8msletvevuj2vsl8rcvqq9esflxmmnd2lf7yd>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1zpz7x64lm625k0rxgk6z0drffz5hwwsnnwaxkf",
    name: "secret1kduh3vlszmg3snq36k6s8l4v8s26z47m3q9haa>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1d5qkesgrhhpcvkaephrs5ws7nvankrkgf32un5",
    name: "secret1he6rzcet6jcwryu544a5zkkadxee4sk0umu703>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1fc3w26lv0t2q8j2u0rrc7cf5mycde9sqg8jjf6",
    name: "secret17w0wjempgtt8ngn59y7cwlae02kve5jzar4xmw>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1358gj5s2ys859tuue6v43w98jzavfnh8d8gz8y",
    name: "secret1gewshds6yhyry842vnxl9q6krezaatep6rxyt2>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1le6m83ry8uftsrft8s7lz6k36yvqlkp43qagpr",
    name: "secret1le3d0fgkrzd433fdnetdqslfxmugvg0tuaqspe>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1nd59d30xz7yyv2gdq7x8hkmx7wghde8nkt7zqa",
    name: "secret1mc656zt6g37u2ufqp2tw8kaj5jxpujylfzw8yw>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
  {
    address: "secret1c0qu9mj4y7ch7aj4sect5jx2pyycuzgeg65jxv",
    name: "secret1c9ky0x6fj5gc0qw6tedxsng50mjl3szn7xhjeu>secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt",
    codeHash: "",
    type: "REWARDS",
    symbol: "",
    logo: "",
  },
];
