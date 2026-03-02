
import Banner from '../components/Banner'
import LogoCarousel from '../components/LogoCarousel'
import ExploreCategories from '../components/ExploreCategories'
import ShortBanner from '../components/ShortBanner'
import FeaturedJobs from '../components/FeaturedJobs'
import LatestJobs from '../components/LatestJobs'


import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-50">
      <main className="">
        <Banner
          onSearch={(q, l) => {
            const params = new URLSearchParams();
            if (q) params.set("keyword", q);
            if (l) params.set("location", l);
            navigate(`/jobs?${params.toString()}`);
          }}
        />

        <div className="mt-6">
          <LogoCarousel />

          <ExploreCategories />

          <ShortBanner />

          <FeaturedJobs />

          <LatestJobs />
        </div>
      </main>
    </div>
  )
}

export default Home
