import Head from "next/head";
import axios from "axios";
import { FiDollarSign, FiHash } from "react-icons/fi";
import { RiExchangeCnyLine } from "react-icons/ri";

import {
  AiOutlineThunderbolt,
  AiOutlineTrophy,
  AiOutlineLineChart,
  AiOutlineExclamationCircle,
  AiOutlineCheck,
} from "react-icons/ai";
import { useState } from "react";
import { millify } from "millify";
import HTMLReactParser from "html-react-parser";
import Link from "next/link";
import LineChart from "../../components/LineChart";

const Coin = ({ data, history }) => {
  const [timePeriod, setTimePeriod] = useState("7d");
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const onOptionChangeHandler = (event) => {
    setTimePeriod(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>{data.name}</title>
      </Head>
      <div className="flex flex-col items-center justify-center h-40 border-b md:w-[70%] mx-auto mb-5">
        <h1 className="text-blue-500 text-4xl lg:text-5xl font-bold mb-5">
          {data.name} Price
        </h1>
        <p className="text-gray-600 text-lg text-center">
          {data.name} live price in US dollars. View value statistics, market
          cap and supply
        </p>
      </div>
      <div>
        <select
          onChange={onOptionChangeHandler}
          className="p-2 rounded-md text-gray-600"
        >
          <option>Select time Period</option>
          {time.map((date, i) => (
            <option key={i} value={date}>
              {date}
            </option>
          ))}
        </select>

        {/* TODO */}
        <LineChart
          time={timePeriod}
          coinName={data.name}
          history={history}
          currentPrice={data.price}
        />

        {/* TODO FINiSH */}
        <div className="flex items-center justify-around flex-col  md:flex-row ">
          <div className="flex flex-col items-center justify-center text-gray-500 py-5 ">
            <h2 className="text-2xl font-bold">{data.name} Value Statistics</h2>
            <p className="text-lg pb-5">
              An overview showing the stats of {data.name}
            </p>
            <div className="w-full">
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <FiDollarSign />
                  <p>Price to USD</p>
                </div>
                <p className="font-bold">$ {millify(data.price)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <FiHash />
                  <p>Rank</p>
                </div>
                <p className="font-bold">{millify(data.rank)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineThunderbolt />
                  <p>24h Volume</p>
                </div>
                <p className="font-bold">$ {millify(data["24hVolume"])}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <FiDollarSign />
                  <p>Market Cap</p>
                </div>
                <p className="font-bold">$ {millify(data.marketCap)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineTrophy />
                  <p>All-time-high (daily avg.)</p>
                </div>
                <p className="font-bold">$ {millify(data.price)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-gray-500 py-5">
            <h2 className="text-2xl font-bold">Other Statistics</h2>
            <p className="text-lg pb-5">
              An overview showing the stats of {data.name}
            </p>
            <div className=" w-full">
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineLineChart />
                  <p>Number Of Markets</p>
                </div>
                <p className="font-bold">{millify(data.numberOfMarkets)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <RiExchangeCnyLine />
                  <p>Numbers Of Exchanges</p>
                </div>
                <p className="font-bold">{millify(data.numberOfExchanges)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineExclamationCircle />
                  <p>Approved Supply</p>
                </div>
                <AiOutlineCheck />
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineExclamationCircle />
                  <p>Total Supply</p>
                </div>
                <p className="font-bold">$ {millify(data.supply.total)}</p>
              </div>
              <div className="border-b p-3 flex justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2 justify-center ">
                  <AiOutlineExclamationCircle />
                  <p>Circulating Supply</p>
                </div>
                <p className="font-bold">
                  $ {millify(data.supply.circulating)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mx-5 mt-5 flex flex-col md:flex-row md:space-x-5">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold text-blue-500">
              What is {data.name}
            </h2>
            <div className="text-gray-600 pt-3 desc">
              {HTMLReactParser(data.description)}
            </div>
          </div>
          <div className="text-gray-500 mt-5 md:mt-0 md:w-1/2 ">
            <h2 className="text-2xl font-bold text-blue-500">
              {data.name} Links
            </h2>
            <div>
              {data.links.map((link, index) => (
                <div
                  key={index}
                  className="flex justify-between py-4 border-b text-lg font-bold hover:bg-gray-100 p-2"
                >
                  <p>{link.type}</p>
                  <Link href={link.url}>
                    <p>{link.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: "24h" },
    headers: {
      "X-RapidAPI-Key": "403d6ba8dbmsha90660036e25ddep1a8170jsn1417881a5e0f",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const data = await axios
    .request(options)
    .then(function (response) {
      return response.data.data.coin;
    })
    .catch(function (error) {
      console.error(error);
    });

  const historyUrl = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PRIVATE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const history = await axios
    .request(historyUrl)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return { props: { data, history } };
}
