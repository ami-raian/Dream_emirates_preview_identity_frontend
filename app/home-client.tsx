"use client";

import { PriceProvider } from "@/contexts/price-context";
import { useWebsiteContext } from "@/lib/WebsiteContext";
import CommonLoading from "@/components/common/CommonLading";
import GoldTemplateOne from "@/components/templates/gold-template-one";
import GoldTemplateTwo from "@/components/templates/gold-template-two";
import { useGetWebsiteByDomain } from "@/api_stores/getAllDataByDomain";

export default function HomeClient() {
  const { websiteId, websiteDomain } = useWebsiteContext();

  console.log({ websiteId, websiteDomain });

  const { data: domainData, isPending: domainLoading } =
    useGetWebsiteByDomain(websiteDomain);

  console.log({ domainData });

  return (
    <PriceProvider>
      {domainLoading ? (
        <CommonLoading />
      ) : process.env.NEXT_PUBLIC_TEMPLATE_ONE ===
        domainData?.[0]?.templateId ? (
        <GoldTemplateOne webInfo={domainData} />
      ) : process.env.NEXT_PUBLIC_TEMPLATE_TWO ===
        domainData?.[0]?.templateId ? (
        <GoldTemplateTwo webInfo={domainData} />
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          Template not found
        </div>
      )}
    </PriceProvider>
  );
}
