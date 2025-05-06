"use client";

import { Header } from "../gold-trading-comp/header";
import { PriceDisplay } from "../gold-trading-comp/price-display";
import { PriceHistory } from "../gold-trading-comp/price-history";
import { ProductList } from "../gold-trading-comp/product-list";

export interface PriceDataType {
  modificationType: string;
  amount: number;
}

export interface WebsiteDataType {
  _id: string;
  id: string;
  title: string;
  logo: string;
  domain: string;
  templateId: string;
  askPriceModification: PriceDataType;
  bidPriceModification: PriceDataType;
  businessId: string;
}

const GoldTemplateOne = ({
  webInfo,
  javaApiBusinessInfo,
}: {
  webInfo: WebsiteDataType | any;
  javaApiBusinessInfo: any;
}) => {
  console.log({ webInfo }, "This is all data i think");
  const {
    askPriceModification,
    bidPriceModification,
    businessProfilePhoto,
    businessName,
  } = webInfo?.[0];

  console.log(businessProfilePhoto, businessName, "This is the logo and name");

  return (
    <div className="bg-[#00072d] min-h-screen">
      <main className="container mx-auto px-8 py-8 space-y-8">
        {/* Headers logo and name from Java-Backend: */}
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
