import { ReviewResponse, reviewDummyData } from "../../apis/mockData";
import { useEffect, useState } from "react";

const PopularCommentSection = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);

  useEffect(() => {
    const fetchReviews = () => {
      setReviews(reviewDummyData);
    };

    fetchReviews();
  }, []);

  return (
    <section className="col-span-8 p-4 bg-white">
      <a href="comment" className="text-xl font-bold">
        최근 인기 코멘트 ＞
      </a>

      <div className="space-y-4">
        {" "}
        {/* 리뷰 박스 사이에 여백 추가 */}
        {/* 리뷰 데이터를 기반으로 UI 렌더링 */}
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="bg-white shadow-xl p-4 rounded-md border border-gray-200"
          >
            {" "}
            {/* 개별 박스 */}
            <div className="flex mb-4">
              <img
                src="https://picsum.photos/200"
                className="w-40 h-40 object-contain rounded flex-shrink-0"
                alt="앨범 커버"
              />
              {/* 앨범 커버 */}
              <div className="ml-4 flex-grow flex flex-col justify-between py-4">
                <span className="text-yellow text-5xl">
                  {"★".repeat(Math.floor(review.rated))} {/* 별점 */}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-10 h-10 rounded-full bg-coral"></span>
                    {/* 작성자 프로필 이미지 */}
                    <h3 className="font-bold text-lg ml-2">
                      {review.user_uid}
                    </h3>
                    {/* 작성자 닉네임 (임시로 user_uid 사용) */}
                  </div>
                  <span className="text-sm text-gray_dark mr-2">
                    {new Date(review.created_at).toLocaleString()}{" "}
                    {/* 작성 시간 */}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="flex flex-col w-40">
                <h4 className="font-bold text-lg truncate">앨범 제목</h4>
                <p className="text-sm text-gray_dark truncate">아티스트 이름</p>
                <p className="text-sm text-gray_dark">앨범 발매일</p>
                <p className="text-sm text-gray-500">★ {review.rated} / 5.0</p>
                <div className="mt-4 flex space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                </div>
              </div>
              {/*앨범 정보*/}
              <div className="ml-4 flex-grow">
                <h2 className="font-bold text-lg mb-2 ml-2">{review.title}</h2>
                <p className="text-sm text-gray_dark ml-2">{review.contents}</p>
              </div>
            </div>
            {/*코멘트*/}
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
        ))}
      </div>
    </section>
  );
};

export default PopularCommentSection;
