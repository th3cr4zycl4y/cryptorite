// @ts-check
import Head from "next/head";
import React, { useEffect, useState } from "react";
import NewsComp from "../components/News";

const News = (data) => {
  const [search, setSearch] = useState([]);
  const [option, setOption] = useState("cryptocurrency");

  const onOptionChangeHandler = (event) => {
    setOption(event.target.value);
  };

  useEffect(() => {
    const options = `http://newsapi.org/v2/everything?q=${option}&from=2023-01-08&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;

    const fetchData = async (options) => {
      const data = await fetch(options).then(function (response) {
        return response.json();
      });

      setSearch(data.articles);
    };
    fetchData(options);
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
            <option value="ETH">ETH</option>
          </select>
        </div>

        <div>
          <NewsComp data={search || data} />
        </div>
      </div>
    </div>
  );
};

export default News;

export async function getServerSideProps() {
  const options = `https://newsapi.org/v2/everything?q=Cryptocurrency&from=2023-01-08&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`;

  const data = await fetch(options).then(function (response) {
    return response.json();
  });

  return {
    props: { data: data.articles },
  };
}
