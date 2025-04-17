"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WebsiteContext = createContext<{ websiteId: string | null }>({
  websiteId: null,
});

export const WebsiteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [websiteId, setWebsiteId] = useState<string | null>(null);

  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("websiteId="))
      ?.split("=")[1];

    if (cookieValue) {
      setWebsiteId(cookieValue);
    }
  }, []);

  console.log({ websiteId });

  return (
    <WebsiteContext.Provider value={{ websiteId }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteId = () => useContext(WebsiteContext);
