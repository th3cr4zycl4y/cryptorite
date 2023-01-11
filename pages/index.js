import Head from "next/head";
import axios from "axios";
import millify from "millify";
import Link from "next/link";
import Crypocurrencies from "../components/Crypocurrencies";
import NewsComp from "../components/News";

export default function Home({ data, news }) {
  const stats = data.stats;
  return (
    <div className="m-5 ">
      <Head>
        <title>CryptoRite</title>
        <meta
          name="description"
          content="Cryptorite | View lastest Crypto news, prize and many more"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Global Crypto Stats
        </h2>
        <div className="grid grid-flow-col grid-rows-3 gap-3 p-5 px-6 py-2 mx-auto font-sans font-semibold text-white transition bg-gray-200 shadow-lg md:shadow-xl md:p-10 rounded-xl md:gap-10 place-content-center md:grid-rows-2 w-fit ">
          <div>
            <h3 className="text">Total Cryptocurrencies</h3>
            <h4 className="num">{millify(stats.total)}</h4>
          </div>
          <div>
            <h3 className="text">Total Coins</h3>
            <h4 className="num">{millify(stats.totalCoins)}</h4>
          </div>
          <div>
            <h3 className="text">Total Exchanges</h3>
            <h4 className="num">{millify(stats.totalExchanges)}</h4>
          </div>
          <div>
            <h3 className="text">Total Market Cap</h3>
            <h4 className="num">{millify(stats.totalMarketCap)}</h4>
          </div>
          <div>
            <h3 className="text">Total 24h Volume</h3>
            <h4 className="num">{millify(stats.total24hVolume)}</h4>
          </div>
          <div>
            <h3 className="text">Total Markets</h3>
            <h4 className="num">{millify(stats.totalMarkets)}</h4>
          </div>
        </div>
        {/* top 10 Crypocurrencies */}
        <div>
          <div className="flex items-center justify-between my-5">
            <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
              Top 10 Cryptocurrencies
            </h2>
            <Link href="/cryptocurrencies">
              <p className="text-lg font-bold text-blue-500 cursor-pointer">
                See More...
              </p>
            </Link>
          </div>
          <Crypocurrencies data={data.coins} slice={11} />
        </div>
        <div>
          <div className="flex items-center justify-between my-5">
            <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
              Top News
            </h2>
            <Link href="/news">
              <p className="text-lg font-bold text-blue-500 cursor-pointer">
                See More...
              </p>
            </Link>
          </div>
          <NewsComp data={news.articles} slice={11} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PRIVATE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  const newsUrl =
    "https://newsapi.org/v2/everything?q=DOGE&from=2023-01-08&sortBy=popularity&apiKey=d5d5b7cc40af4d8082b9c95b704dedf8";

  const news = await fetch(newsUrl).then(function (response) {
    return response.json();
  });

  return { props: { data, news } };
}
