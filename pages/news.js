import Head from "next/head";
import React, { useEffect, useState } from "react";
import NewsComp from "../components/News";
import axios from "axios";

const News = (data) => {
  const [search, setSearch] = useState([]);
  const [option, setOption] = useState("cryptocurrency");

  const onOptionChangeHandler = (event) => {
    setOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const newsUrl = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
          q: `${option}`,
          safeSearch: "Off",
          textFormat: "Raw",
          count: 100,
          originalImg: "true",
          freshness: "Day",
        },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "403d6ba8dbmsha90660036e25ddep1a8170jsn1417881a5e0f",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };

      const data = await axios
        .request(newsUrl)
        .then(function (response) {
          return response.data.value;
        })
        .catch(function (error) {
          console.error(error);
        });

      setSearch(data);
    };
    fetchData();
  }, [option]);

  return (
    <div>
      <Head>
        <title>News</title>
      </Head>
      <div className="space-y-10">
        <div className="flex items-center justify-between h-10">
          <h2 className="text-2xl font-bold text-gray-800 md:m-5">News</h2>
          <select onChange={onOptionChangeHandler} className="p-2 rounded-md">
            <option value="">Please Select Cryptocurrency</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Tether ">Tether </option>
            <option value="Binance Coin">Binance Coin</option>
            <option value="U.S. Dollar Coin">U.S. Dollar Coin</option>
            <option value="XRP">XRP</option>
            <option value="Binance USD">Binance USD</option>
            <option value="Cardano">Cardano</option>
            <option value="DODGEcoin">DODGE</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>

        <div>
          <NewsComp data={search || data.data} />
        </div>
      </div>
    </div>
  );
};

export default News;

export async function getServerSideProps() {
  const newsUrl = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: `cryptocurrency`,
      safeSearch: "Off",
      textFormat: "Raw",
      count: 100,
      originalImg: "true",
      freshness: "Day",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "403d6ba8dbmsha90660036e25ddep1a8170jsn1417881a5e0f",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  const data = await axios
    .request(newsUrl)
    .then(function (response) {
      return response.data.value;
    })
    .catch(function (error) {
      console.error(error);
    });

  return {
    props: { data },
  };
}
