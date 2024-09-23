import PopularCommentSection from "../components/containers/PopularCommentSection";
import PopularAlbumSection from "../components/containers/PopularAlbumSection";

const Home = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <PopularCommentSection />
      <PopularAlbumSection />
    </div>
  );
};

export default Home;
