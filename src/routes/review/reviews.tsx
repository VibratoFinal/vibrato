import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReviews } from "../../apis/review";

interface ReviewList {
  review_list: Review[];
}

interface Review {
  review_id: number;
  user_uid: string;
  rated: number;
  title: string;
  contents: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  likes: Like[];
}

interface Comment {
  comment_id: number;
  user_uid: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface Like {
  user_uid: string;
  liked_at: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewList | null>(null);
  const [sortOrder, setSortOrder] = useState<"인기순" | "추천순" | "최신순">(
    "인기순"
  );
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  const navigate = useNavigate();

  const { typeID } = useParams();
  console.log(typeID);

  const handleCommentClick = (reviewID: string) => {
    navigate(`/Review/${reviewID}/Comments`);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      if (typeID) {
        try {
          // const albumData = await getAlbumInfo("5NMtxQJy4wq3mpo3ERVnLs");
          console.log(typeID);
          const reviewsData = await getReviews(typeID);
          setReviews(reviewsData); // 앨범 정보를 상태로 설정
        } catch (error) {
          console.error("Error fetching reviews data info:", error);
        } finally {
          setLoading(false); // 로딩 완료
        }
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 UI
  }

//   useEffect(() => {
//   if (reviews) {
//     const sortedReviews = [...reviews].sort((a, b) => {
//       if (sortOrder === "인기순") {
//         return b.commentsCount - a.commentsCount;
//       } else if (sortOrder === "추천순") {
//         return b.likes - a.likes;
//       } else if (sortOrder === "최신순") {
//         return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
//       }
//       return 0;
//     });
//     setReviews(sortedReviews);
//   }
// }, [sortOrder, reviews]);

//   const handleLike = (commentId: number) => {
//     setReviews((prevComments) =>
//       prevComments.map((comment) =>
//         comment.id === commentId
//           ? { ...comment, likes: comment.likes + 1 }
//           : comment
//       )
//     );
//   };

  const toggleComments = (commentId: number) => {
    console.log(`댓글 보기 토글, 코멘트 ID: ${commentId}`);
  };

  return (
    <div className="p-4">
      {/* {reviews && reviews.length > 0 ? ( */}
      {reviews ? (
        <>
          {/* 1. 아티스트 이름 */}
          <h1 className="text-3xl font-bold">{` 000에 대한 리뷰`}</h1>
  
          {/* 2. 정렬 버튼 */}
          <div className="flex justify-end mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="border p-2 rounded"
            >
              <option value="인기순">인기순</option>
              <option value="추천순">추천순</option>
              <option value="최신순">최신순</option>
            </select>
          </div>
  
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded-lg mb-4 flex items-start"
              onClick={() => {handleCommentClick(review.review_id)}}
            >
              {/* 3. 아티스트 이미지 */}
              <img
                src={review.profileImage}
                alt={review.artistName}
                className="w-20 h-20 mr-4"
              />
  
              {/* 4. 아티스트 별점 */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{review.title}</p>
                  <p className="text-yellow-500">★ {review.rated}</p>
                </div>
  
                {/* 5. 코멘트 남긴 사람의 프로필 */}
                <div className="flex items-center mt-2">
                  <img
                    src={review.userProfile}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p>{review.timeAgo}</p>
                </div>
  
                {/* 8. 코멘트 내용 */}
                <p className="mt-2">
                  {review.contents}
                </p>
  
                {/* 9. 좋아요 버튼과 좋아요 수 */}
                <div className="flex items-center mt-4">
                  <button
                    className="text-blue-500 flex items-center"
                    onClick={() => handleLike(review.id)}
                  >
                    <span>👍</span>
                    <span className="ml-2">{review.likes.length}</span>
                  </button>
  
                  {/* 10. 댓글 버튼과 댓글 수 */}
                  <button
                    className="ml-4 text-blue-500 flex items-center"
                    onClick={() => toggleComments(review.id)}
                  >
                    <span>💬 댓글</span>
                    <span className="ml-2">{review.comments.length}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>리뷰가 없습니다</div> // 리뷰가 없을 때 렌더링
      )}
    </div>
  );
  
};

export default Reviews;
