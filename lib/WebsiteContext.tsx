"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type WebsiteContextType = {
  websiteId: string | null;
  websiteDomain: string | null;
};

const WebsiteContext = createContext<WebsiteContextType>({
  websiteId: null,
  websiteDomain: null,
});

export const WebsiteProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [websiteId, setWebsiteId] = useState<string | null>(null);
  const [websiteDomain, setWebsiteDomain] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split("; ");

    const websiteIdCookie = cookies.find((c) => c.startsWith("websiteId="));
    const websiteDomainCookie = cookies.find((c) =>
      c.startsWith("websiteDomain=")
    );

    if (websiteIdCookie) {
      const value = websiteIdCookie.split("=")[1];
      setWebsiteId(decodeURIComponent(value));
    }

    if (websiteDomainCookie) {
      const value = websiteDomainCookie.split("=")[1];
      setWebsiteDomain(decodeURIComponent(value));
    }
  }, []);

  return (
    <WebsiteContext.Provider value={{ websiteId, websiteDomain }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteContext = () => useContext(WebsiteContext);
