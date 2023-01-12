import Head from "next/head";
import Crypocurrencies from "../components/Crypocurrencies";
import axios from "axios";
import { useState, useEffect } from "react";

const Cryptocurrencies = ({ data }) => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((coin) =>
      coin.name.toLowerCase().includes(search.toString().toLowerCase())
    );
    setCrypto(filteredData);
  }, [data, search]);

  return (
    <div className="min-h-[84vh] h-fit ">
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-700 md:text-2xl">
            Cryptocurrencies
          </h2>
          <input
            type="text"
            placeholder="Search Cryptocurrency..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-40 p-2 border border-gray-400 md:w-52 rounded-xl placeholder:text-sm"
          />
        </div>

        <div className="my-10">
          {crypto.length ? (
            <Crypocurrencies data={crypto} />
          ) : (
            <div className="text-3xl font-bold text-center text-gray-500">
              No Search Result
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrencies;

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
      return response.data.data.coins;
    })
    .catch(function (error) {
      console.error(error);
    });

  return { props: { data } };
}
