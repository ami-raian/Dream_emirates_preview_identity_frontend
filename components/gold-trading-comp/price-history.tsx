"use client";

import { useEffect, useRef, useState } from "react";

type PriceData = {
  bid: number;
  ask: number;
  high: number;
  low: number;
  timestamp: string;
};

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

export function PriceHistory({
  askPriceModification,
  bidPriceModification,
}: PriceDataProps) {
  const [currentPrice, setCurrentPrice] = useState<PriceData>({
    bid: 0,
    ask: 0,
    high: 0,
    low: 0,
    timestamp: new Date().toISOString(),
  });
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);

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
    const updateInterval = 1000; // Update every second

    const interval = setInterval(() => {
      const newPrice = {
        bid: dataRef.current.bidPrice,
        ask: dataRef.current.askPrice,
        high: dataRef.current.highPrice,
        low: dataRef.current.lowPrice,
        timestamp: new Date().toISOString(),
      };

      setCurrentPrice(newPrice);
      setPriceHistory((prev) => {
        const newHistory = [newPrice, ...prev]; // Add new data at the beginning
        // Keep only the last 10 entries
        return newHistory.slice(0, 10);
      });
    }, updateInterval);

    ws.onopen = () => console.log("Connected to WebSocket server");

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

    ws.onerror = (error) => {
      // console.error("WebSocket error:", error);
      clearInterval(interval);
    };

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h2 className="text-white/60 text-sm mb-4">
        Price History (Last 10 Values)
      </h2>
      <div className="bg-[#12132d]/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] px-6 py-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-white/60 text-sm">
                <th className="text-left py-2">Time</th>
                <th className="text-right py-2">BID</th>
                <th className="text-right py-2">ASK</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.length > 0 ? (
                priceHistory.map((price, index) => (
                  <tr
                    key={index}
                    className="text-white border-t border-white/5"
                  >
                    <td className="py-2 text-sm">
                      {new Date(price.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="text-right py-2">
                      {bidPriceModification?.modificationType.toLowerCase() ===
                      "discount"
                        ? (price.bid - bidPriceModification.amount).toFixed(2)
                        : (price.bid + bidPriceModification.amount).toFixed(2)}
                    </td>
                    <td className="text-right py-2">
                      {askPriceModification?.modificationType.toLowerCase() ===
                      "discount"
                        ? (price.ask - askPriceModification.amount).toFixed(2)
                        : (price.ask + askPriceModification.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-white/60">
                    No price history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
