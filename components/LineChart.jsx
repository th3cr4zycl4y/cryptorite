import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

const LineChart = ({ currentPrice, coinName, time, history }) => {
  Chart.register(...registerables);

  const router = useRouter();
  const { id } = router.query;
  const [coinHistory, setCoinHistory] = useState(history);

  const coinPrice = [];
  const coinTimestamp = [];

  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${id}/history`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: `${time}` },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PRIVATE_RAPIDAPI_KEY,
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const getHistory = async () => {
    const data = await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    setCoinHistory(data);
  };

  useEffect(() => {
    getHistory();
  }, [time]);

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const date = coinHistory.data.history[i].timestamp;
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(new Date(date).toLocaleDateString("en-US"));
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const lineoptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className="mx-5">
      <div className="mx-auto md:flex text-center justify-between">
        <h2 className="text-2xl font-bold text-blue-500">
          {coinName} Price Chart
        </h2>
        <div className="flex font-bold items-center justify-center space-x-5 ">
          <p
            className={
              coinHistory?.data?.change < 0 ? "text-red-600" : "text-green-600"
            }
          >
            {coinHistory?.data?.change}%
          </p>
          <p>
            Current {coinName} Price: {currentPrice}
          </p>
        </div>
      </div>

      <Line data={data} lineoptions={lineoptions} />
    </div>
  );
};

export default LineChart;
