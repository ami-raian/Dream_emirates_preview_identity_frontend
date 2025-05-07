"use client";

import { Header } from "../gold-trading-comp/header";
import { PriceDisplay } from "../gold-trading-comp/price-display";
import { PriceHistory } from "../gold-trading-comp/price-history";
import { ProductList } from "../gold-trading-comp/product-list";
import StarryNight from "../gold-trading-comp/StarryNight";
// import StarryNight from "../gold-trading-comp/StarryNight"; // Uncomment if needed
import { WebsiteDataType } from "./gold-template-one";

const GoldTemplateTwo = ({
  webInfo = [],
}: // javaApiBusinessInfo,
{
  webInfo: WebsiteDataType[] | any;
  // javaApiBusinessInfo: any;
}) => {
  console.log({ webInfo }, "This is all data i think template 2");
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
    "This is the logo and name template 2"
  );
  return (
    <div className="bg-[#000000] min-h-screen">
      <StarryNight />
      <main className="container mx-auto px-8 py-8 space-y-8 relative z-10">
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

export default GoldTemplateTwo;
