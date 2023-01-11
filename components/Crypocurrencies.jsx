import Image from "next/image";
import React from "react";
import millify from "millify";
import Link from "next/link";

const Crypocurrencies = ({ data, slice }) => {
  var items = data.slice(0);

  if (slice) {
    items = data.slice(0, 10);
  } else {
    items;
  }

  return (
    <div className=" md:flex flex-wrap items-center justify-center">
      {items.map((d, i) => {
        return (
          <Link href={`/crypto/${d.uuid}`} key={d.uuid} className="w-[25%]">
            <div className="bg-gray-100 m-2 p-4  hover:border-blue-600 hover:border  rounded-xl hover:p-6 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <p className="font-bold">{d.rank}.</p>
                  <Image src={d.iconUrl} alt={d.name} width="40" height="40" />
                  <p className="text-xl text-gray-800">{d.name}</p>
                </div>

                <p className="text-gray-500 text-sm">{d.symbol}</p>
              </div>
              <div className="mt-5 space-y-3 text-center">
                <p className="text-gray-700 text-[16px]">
                  Price:{" "}
                  <span className="font-bold text-gray-900">
                    {millify(d.price)}
                  </span>
                </p>
                <p className="text-gray-700 text-[16px]">
                  Market Capital:{" "}
                  <span className="font-bold text-gray-900">
                    {millify(d.marketCap)}
                  </span>
                </p>
                <p className="text-gray-700 text-[16px]">
                  Daily Change:{" "}
                  <span className="font-bold text-gray-900">
                    {millify(d.change)}%
                  </span>
                </p>
                <p className="text-gray-700 text-[16px]">
                  BTC Price:{" "}
                  <span className="font-bold text-gray-900 text-sm ">
                    {d.btcPrice}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Crypocurrencies;
