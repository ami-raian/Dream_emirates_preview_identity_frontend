"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProductList({ webInfo }: any) {
  const [priceGram21k, setPriceGram21k] = useState(0);
  const [priceGram22k, setPriceGram22k] = useState(0);
  const [priceGram23k, setPriceGram23k] = useState(0);
  const [priceGram24k, setPriceGram24k] = useState(0);

  const dataRef = useRef({
    priceGram21k: 0,
    priceGram22k: 0,
    priceGram23k: 0,
    priceGram24k: 0,
  });

  // Dynamic data from Socket:
  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

    const updateInterval = 100; // Adjust the interval in milliseconds based on your requirements

    const interval = setInterval(() => {
      setPriceGram21k(dataRef.current.priceGram21k);
      setPriceGram22k(dataRef.current.priceGram22k);
      setPriceGram23k(dataRef.current.priceGram23k);
      setPriceGram24k(dataRef.current.priceGram24k);
    }, updateInterval);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      // console.log({newMessage});
      if (newMessage) {
        dataRef.current.priceGram21k = newMessage.priceGram21k;
        dataRef.current.priceGram22k = newMessage.priceGram22k;
        dataRef.current.priceGram23k = newMessage.priceGram23k;
        dataRef.current.priceGram24k = newMessage.priceGram24k;
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

  // console.log({ priceGram22k, priceGram24k });

  // Static data from API:
  const { jewellery22k, gold9999Gm, gold9999Kg, tenTola, kilobar995 } =
    webInfo?.[0] ?? {};

  const decimalPlace = 2;
  const dynamicProducts = [
    {
      name: "Jewellery 22k",
      weight: "1 GM",
      modificationType: jewellery22k?.modificationType || "",
      amount:
        jewellery22k?.modificationType === "Premium"
          ? (priceGram22k + jewellery22k?.amount).toFixed(decimalPlace)
          : (priceGram22k - jewellery22k?.amount).toFixed(decimalPlace) || 0,
      currency: "AED",
      image: "/jewellery-22k.png",
    },
    {
      name: "Gold 9999",
      weight: "1 GM",
      modificationType: gold9999Gm?.modificationType || "",
      amount:
        gold9999Gm?.modificationType === "Premium"
          ? (priceGram24k + gold9999Gm?.amount).toFixed(decimalPlace)
          : (priceGram24k - gold9999Gm?.amount).toFixed(decimalPlace) || 0,
      currency: "AED",
      image: "/gold-9999.png",
    },
    {
      name: "Ten Tola",
      weight: "TTB",
      modificationType: tenTola?.modificationType || "",
      amount:
        tenTola?.modificationType === "Premium"
          ? (priceGram24k * 116.52 + tenTola?.amount).toFixed(decimalPlace)
          : (priceGram24k * 116.52 - tenTola?.amount).toFixed(decimalPlace) ||
            0,
      currency: "AED",
      image: "/ten-tola.png",
    },
    {
      name: "Gold 9999",
      weight: "1 KG",
      modificationType: gold9999Kg?.modificationType || "",
      amount:
        gold9999Kg?.modificationType === "Premium"
          ? (priceGram24k * 1000 + gold9999Kg?.amount).toFixed(decimalPlace)
          : (priceGram24k * 1000 - gold9999Kg?.amount).toFixed(decimalPlace) ||
            0,
      currency: "AED",
      image: "/gold-9999.png",
    },
    {
      name: "Kilo Bar 995",
      weight: "1 KG",
      modificationType: kilobar995?.modificationType || "",
      amount:
        kilobar995?.modificationType === "Premium"
          ? (priceGram23k * 1000 + kilobar995?.amount).toFixed(decimalPlace)
          : (priceGram23k * 1000 - kilobar995?.amount).toFixed(decimalPlace) ||
            0,
      currency: "AED",
      image: "/kilo-bar-995.png",
    },
  ];

  if (!webInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="text-white/60 text-sm mb-4">Metal Price</p>
      <div className="space-y-3">
        {dynamicProducts.map((product, index) => (
          <div
            key={index}
            className="bg-[#12132d]/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-white font-medium">{product.name}</div>
                <div className="text-white/60 text-sm">{product.weight}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-medium">{product.amount}</div>
              <div className="text-white/60 text-sm">
                {product.modificationType} {product.currency}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
