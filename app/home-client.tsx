"use client";

import { useEffect, useState } from "react";
import { PriceProvider } from "@/contexts/price-context";
import { useWebsiteContext } from "@/lib/WebsiteContext";
import CommonLoading from "@/components/common/CommonLading";
import GoldTemplateOne from "@/components/templates/gold-template-one";
import GoldTemplateTwo from "@/components/templates/gold-template-two";
import { useGetWebsiteByUid } from "@/api_stores/getWebsiteByUid";
import { useGetPublicBusinessById } from "@/api_stores/getBusinessById";
import { useGetWebsiteByDomain } from "@/api_stores/getAllDataByDomain";

interface WebsiteDynamicProps {
  businessId: string | null;
  domain: string;
  templateId: string;
  askPriceModification: {
    modificationType: string;
    amount: number;
  };
  bidPriceModification: {
    modificationType: string;
    amount: number;
  };
}

export default function HomeClient() {
  const { websiteId, websiteDomain } = useWebsiteContext();
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteDynamicProps | null>(
    null
  );

  console.log({ websiteId, websiteDomain });

  const { data: myWebsite, isPending: websiteLoading } =
    useGetWebsiteByUid(websiteId);

  const { data: domainData, isPending: domainLoading } =
    useGetWebsiteByDomain(websiteDomain);

  const { data: javaApiPublicBusinessInfo, isPending: businessLoading }: any =
    useGetPublicBusinessById(websiteInfo?.businessId ?? null);
  // const { data: javaApiPublicBusinessInfo, isPending: businessLoading }: any = {
  //   data: null,
  //   isPending: false,
  // };

  console.log({ javaApiPublicBusinessInfo });

  console.log({ myWebsite });
  console.log({ domainData });

  useEffect(() => {
    if (myWebsite?.message === "Website retrieved successfully") {
      setWebsiteInfo(myWebsite?.data);
    } else {
      setWebsiteInfo(null);
    }
  }, [myWebsite, websiteId]);

  return (
    <PriceProvider>
      {websiteLoading || businessLoading ? (
        <CommonLoading />
      ) : process.env.NEXT_PUBLIC_TEMPLATE_ONE === websiteInfo?.templateId ? (
        <GoldTemplateOne
          webInfo={domainData}
          javaApiBusinessInfo={javaApiPublicBusinessInfo}
        />
      ) : process.env.NEXT_PUBLIC_TEMPLATE_TWO === websiteInfo?.templateId ? (
        <GoldTemplateTwo
          webInfo={websiteInfo}
          javaApiBusinessInfo={javaApiPublicBusinessInfo}
        />
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          Template not found
        </div>
      )}
    </PriceProvider>
  );
}
