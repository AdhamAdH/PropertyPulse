import Hero from "@/components/hero";
import InfoBoxes from "@/components/infoBoxes";
import FeaturedProperties from "@/components/featuredProperties";
import RecentProperties from "@/components/recentProperties";

export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <RecentProperties />
    </>
  );
};
export default HomePage;
