"use client";
import { useEffect, useRef, useState } from "react";
import { LineChart } from "./line-chart";

type PriceDataProps = {
  askPriceModification: {
    modificationType: string;
    amount: number;
  };
  bidPriceModification: {
    modificationType: string;
    amount: number;
  };
};

type PriceDataPoint = {
  price: number;
  timestamp: number;
};

export function PriceDisplay({
  askPriceModification,
  bidPriceModification,
}: PriceDataProps) {
  const [askPrice, setAskPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [askPriceHistory, setAskPriceHistory] = useState<PriceDataPoint[]>([]);
  const dataRef = useRef({
    askPrice: 0,
    bidPrice: 0,
    lowPrice: 0,
    highPrice: 0,
  });

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;

    if (!wsUrl) {
      console.log("Missing WebSocket URL (env NEXT_PUBLIC_WS_URL)");
      return;
    }

    const ws = new WebSocket(wsUrl);

    const updateInterval = 100; // Adjust the interval in milliseconds based on your requirements

    const interval = setInterval(() => {
      const currentAskPrice = dataRef?.current?.askPrice;

      // Skip if price hasn't been initialized
      if (currentAskPrice <= 0) return;

      setAskPrice(currentAskPrice);
      setBidPrice(dataRef.current.bidPrice);
      setLowPrice(dataRef.current.lowPrice);
      setHighPrice(dataRef.current.highPrice);

      const modifiedAskPrice =
        askPriceModification?.modificationType === "Discount"
          ? currentAskPrice - askPriceModification?.amount
          : askPriceModification?.modificationType === "Premium"
          ? currentAskPrice + askPriceModification?.amount
          : currentAskPrice;

      setAskPriceHistory((prev) => {
        const now = Date.now();
        const newDataPoint = {
          price: modifiedAskPrice,
          timestamp: now,
        };

        const thirtySecondsAgo = now - 30000;
        const newHistory = [...prev, newDataPoint].filter(
          (point) => point.timestamp >= thirtySecondsAgo
        );

        return newHistory;
      });
    }, updateInterval);

    // Rest of the useEffect remains the same
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage) {
        dataRef.current.askPrice = newMessage.askPrice;
        dataRef.current.bidPrice = newMessage.bidPrice;
        dataRef.current.lowPrice = newMessage.lowPrice;
        dataRef.current.highPrice = newMessage.highPrice;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      clearInterval(interval);
    };

    ws.onerror = (event) => {
      console.debug("WebSocket error event:", event);
      clearInterval(interval);
    };

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [askPriceModification]);

  // Extract just the price values for the chart
  const priceValues = askPriceHistory.map((point) => point.price);

  // Calculate the max and min values in the 30-second window
  const maxValue = priceValues.length > 0 ? Math.max(...priceValues) : 0;
  const minValue = priceValues.length > 0 ? Math.min(...priceValues) : 0;

  // Find the index of max and min values
  const maxIndex = priceValues.indexOf(maxValue);
  const minIndex = priceValues.indexOf(minValue);

  return (
    <div className="bg-[#12132d]/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] px-8 py-4">
      <div className="grid grid-cols-3 gap-0 items-center">
        <div className="flex space-x-12 pr-6 border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500 text-sm">BID</span>
              <span className="text-white/60 text-sm">OZ</span>
              {bidPriceModification?.modificationType === "Discount" ? (
                <p className="text-white/60 text-xs">(Discount)</p>
              ) : (
                <p className="text-white/60 text-xs">(Premium)</p>
              )}
            </div>
            <div className="text-4xl font-bold text-white min-w-[140px]">
              {bidPriceModification?.modificationType === "Discount"
                ? (bidPrice - bidPriceModification?.amount).toFixed(2)
                : bidPriceModification?.modificationType === "Premium"
                ? (bidPrice + bidPriceModification?.amount).toFixed(2)
                : bidPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500 text-sm">ASK</span>
              <span className="text-white/60 text-sm">OZ</span>
              {askPriceModification?.modificationType === "Discount" ? (
                <p className="text-white/60 text-xs">(Discount)</p>
              ) : (
                <p className="text-white/60 text-xs">(Premium)</p>
              )}
            </div>
            <div className="text-4xl font-bold text-white min-w-[140px]">
              {askPriceModification?.modificationType === "Discount"
                ? (askPrice - askPriceModification?.amount).toFixed(2)
                : askPriceModification?.modificationType === "Premium"
                ? (askPrice + askPriceModification?.amount).toFixed(2)
                : askPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Line chart: */}
        <div className="px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500 text-sm">ASK</span>
            <span className="text-white/60 text-sm">OZ</span>
            <span className="text-white/60 text-sm ml-auto">
              Last 30 seconds
            </span>
          </div>
          <div className="h-16">
            <LineChart
              data={priceValues}
              currentPrice={
                askPriceModification?.modificationType === "Discount"
                  ? askPrice - askPriceModification?.amount
                  : askPriceModification?.modificationType === "Premium"
                  ? askPrice + askPriceModification?.amount
                  : askPrice
              }
              maxValue={maxValue}
              minValue={minValue}
              maxIndex={maxIndex}
              minIndex={minIndex}
            />
          </div>
        </div>

        {/* High and low price show: */}
        <div className="pl-6 border-l border-white/10">
          <div className="space-y-2">
            <div className="border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-white/60 text-sm">HIGH</span>
                <span className="text-white ml-auto">
                  {highPrice.toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-white/60 text-sm">LOW</span>
                <span className="text-white ml-auto">
                  {lowPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
