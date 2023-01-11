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
    <div className="min-h-[84vh] h-fit m-5">
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <div>
        <div className="flex items-center justify-between">
          <h2 className=" text-2xl font-bold text-gray-700">
            Cryptocurrencies
          </h2>
          <input
            type="text"
            placeholder="Search Cryptocurrency..."
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-400 p-2 rounded-xl placeholder:text-sm"
          />
        </div>

        <div className="my-10">
          {crypto.length ? (
            <Crypocurrencies data={crypto} />
          ) : (
            <div className="text-center text-gray-500 text-3xl font-bold">
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
