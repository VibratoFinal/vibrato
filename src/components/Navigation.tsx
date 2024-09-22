const Navigation = () => {
  return (
    <nav className="flex space-x-4 text-gray_dark">
      <a href="chart" className="hover:text-coral">
        차트
      </a>
      <a href="artist" className="hover:text-coral">
        아티스트
      </a>
      <a href="album" className="hover:text-coral">
        앨범
      </a>
    </nav>
  );
};

export default Navigation;
