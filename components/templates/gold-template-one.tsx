"use client";

import { Header } from "../gold-trading-comp/header";
import { PriceDisplay } from "../gold-trading-comp/price-display";
import { PriceHistory } from "../gold-trading-comp/price-history";
import { ProductList } from "../gold-trading-comp/product-list";

export interface PriceDataType {
  modificationType: string;
  amount: number;
}

export interface DomainType {
  name: string;
  registrar: string;
  dnsConfigured: boolean;
  vercelConfigured: boolean;
  _id: string;
}

export interface WebsiteDataType {
  _id: string;
  id: string;
  title: string;
  businessProfilePhoto: string;
  domain: DomainType;
  templateId: string;
  askPriceModification: PriceDataType;
  bidPriceModification: PriceDataType;
  businessId: string;
}

const GoldTemplateOne = ({
  webInfo = [],
}: {
  webInfo: WebsiteDataType[] | any;
}) => {
  console.log({ webInfo }, "This is all data i think template 1");
  const websiteData = webInfo?.[0];

  const {
    askPriceModification,
    bidPriceModification,
    businessProfilePhoto,
    businessName,
  } = websiteData || {};

  console.log(
    businessProfilePhoto,
    businessName,
    "This is the logo and name template 1"
  );

  return (
    <div className="bg-[#00072d] min-h-screen">
      <main className="container mx-auto px-8 py-8 space-y-8">
        <Header websiteName={businessName} logo={businessProfilePhoto} />
        <PriceDisplay
          askPriceModification={askPriceModification}
          bidPriceModification={bidPriceModification}
        />
        <div className="grid grid-cols-2 gap-8">
          <PriceHistory
            askPriceModification={askPriceModification}
            bidPriceModification={bidPriceModification}
          />
          <ProductList webInfo={webInfo} />
        </div>
      </main>
    </div>
  );
};

export default GoldTemplateOne;
