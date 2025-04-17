"use client";

import { Header } from "../gold-trading-comp/header";
import { PriceDisplay } from "../gold-trading-comp/price-display";
import { PriceHistory } from "../gold-trading-comp/price-history";
import { ProductList } from "../gold-trading-comp/product-list";
import StarryNight from "../gold-trading-comp/StarryNight";
// import StarryNight from "../gold-trading-comp/StarryNight"; // Uncomment if needed
import { WebsiteDataType } from "./gold-template-one";

const GoldTemplateTwo = ({
  webInfo,
  javaApiBusinessInfo,
}: {
  webInfo: WebsiteDataType | any;
  javaApiBusinessInfo: any;
}) => {
  return (
    <div className="bg-[#000000] min-h-screen">
      <StarryNight />
      <main className="container mx-auto px-8 py-8 space-y-8 relative z-10">
        {/* Headers logo and name from Java-Backend: */}
        <Header
          websiteName={javaApiBusinessInfo?.data?.name}
          logo={javaApiBusinessInfo?.data?.profilePhoto}
        />
        <PriceDisplay
          askPriceModification={webInfo?.askPriceModification}
          bidPriceModification={webInfo?.bidPriceModification}
        />
        <div className="grid grid-cols-2 gap-8">
          <PriceHistory
            askPriceModification={webInfo?.askPriceModification}
            bidPriceModification={webInfo?.bidPriceModification}
          />
          <ProductList webInfo={webInfo} />
        </div>
      </main>
    </div>
  );
};

export default GoldTemplateTwo;
