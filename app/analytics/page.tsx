import { analytics } from "@/utils/analytics";

const Page = async () => {
  const pageview = await analytics.retrieveDays("pageview", 2);
  return <pre className="text-white">{JSON.stringify(pageview, null, 4)}</pre>;
};

export default Page;
