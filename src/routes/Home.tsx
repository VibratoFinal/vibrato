const Home = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <section className="col-span-8 p-4 bg-white">
        {/*최근 인기 코멘트 섹션*/}
        <a href="comment" className="text-xl font-bold mb-4">
          최근 인기 코멘트 ＞
        </a>
        <div className="bg-white shadow-xl p-4 rounded-md">
          <div className="flex mb-4">
            <div className="w-40 h-40 object-contain bg-coral rounded flex-shrink-0"></div>
            {/*앨범 커버*/}
            <div className="ml-4 flex-grow flex flex-col justify-between py-4">
              <span className="text-yellow text-5xl">★★★★★</span>
              {/*별점*/}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-10 h-10 rounded-full bg-coral"></span>
                  {/*작성자 프로필 이미지*/}
                  <h3 className="font-bold text-lg ml-2">Admin</h3>
                  {/*작성자 닉네임*/}
                </div>
                <span className="text-sm text-gray_dark mr-2">10시간 전</span>
                {/*작성 시간*/}
              </div>
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="flex flex-col w-40">
              <h4 className="font-bold text-lg">앨범 제목</h4>
              <p className="text-sm text-gray_dark">아티스트 이름</p>
              <p className="text-sm text-gray_dark">앨범 발매일</p>
              <p className="text-sm text-gray-500">★ 5.0 / 5.0 from 몇 명</p>
              <div className="mt-4 flex space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full"></div>
              </div>
            </div>
            {/*앨범 정보*/}
            <div className="ml-8 flex-grow bg-white rounded-md">
              <h2 className="font-bold text-lg mb-2 ml-2">코멘트 제목</h2>
              <p className="text-sm text-gray_dark ml-2">
                여기에 코멘트 내용이 들어갑니다. 코멘트는 사용자들의 평가와 함께
                제공됩니다.
              </p>
            </div>
          </div>
          {/*코멘트*/}
          <hr />
          <div className="mt-4 flex">
            <div className="flex items-center mr-8">
              <button className="text-lg font-bold text-gray_dark">
                좋아요 👍
              </button>
            </div>
            <div className="flex items-center">
              <button className="text-lg font-bold text-gray_dark">
                댓글 💬
              </button>
            </div>
          </div>
        </div>
      </section>

      <aside className="col-span-4 p-4">
        <a href="chart" className="text-xl font-bold mb-4">
          인기 앨범 ＞
        </a>

        <div className="shadow-xl p-4 rounded-md mb-4">
          <div className="flex flex-grow items-center">
            <div className="w-20 h-20 bg-coral rounded"></div>
            <div className="ml-4 flex flex-col">
              <h4 className="font-bold text-lg">앨범 제목</h4>
              <p className="text-sm text-gray_dark">아티스트 이름</p>
              <p className="text-sm text-gray_dark">앨범 발매일</p>
              <span className="text-sm">★ 5.0 / 5.0</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;
