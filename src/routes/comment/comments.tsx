import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificReview } from "../../apis/review"; // API 호출 함수

interface Review {
  review_id: number;
  nickname: string;
  user_uid: string;
  rated: number;
  title: string;
  contents: string;
  type_id: string;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  likes: Like[];
  liked: boolean;
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

const Comments = () => {
  const [review, setReview] = useState<Review | null>(null); // 리뷰 상태
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 상태
  const [newComment, setNewComment] = useState<string>(""); // 새로운 댓글 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  
  const { reviewID } = useParams(); // URL에서 reviewID 가져오기

  useEffect(() => {
    const fetchReviewData = async () => {
      if (reviewID) {
        try {
          const reviewData = await getSpecificReview(reviewID); // 리뷰 데이터 가져오기
          setReview(reviewData); // 리뷰 상태 설정
          setComments(reviewData.comments); // 댓글 상태 설정
        } catch (error) {
          console.error("리뷰를 가져오는 데 실패했습니다.", error);
        } finally {
          setLoading(false); // 로딩 완료
        }
      }
    };

    fetchReviewData();
  }, [reviewID]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 UI 표시
  }

  const handleLikeReview = () => {
    // 좋아요 처리 (추가 로직 필요)
  };

  const handleLikeComment = (commentId: number) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      comment_id: comments.length + 1,
      user_uid: "새로운 유저",
      content: newComment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setComments([newCommentData, ...comments]); // 새로운 댓글 추가
    setNewComment(""); // 입력 필드 초기화
  };

  const reviewDate = new Date(review.created_at); // API에서 받은 날짜
  reviewDate.setHours(reviewDate.getHours() + 9); // 9시간 추가
  const formattedDate = reviewDate.toLocaleString();

  return (
    <div className="p-4 container mx-auto grid-cols-12 px-5 gap-10">
      {/* 리뷰 상세 페이지 */}
      {review && (
        <div className="border p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <p className="text-xl font-bold">{review.title}</p>
                  <p className="text-yellow-500">★ {review.rated}</p>
                </div>
  
                {/* 5. 코멘트 남긴 사람의 프로필 */}
                <div className="flex items-center mt-4">
                  {/* <img
                    src={review.userProfile}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-2"
                  /> */}
                  <span className="w-5 h-5 rounded-full bg-light_coral"></span>
                  <p className="text-m ml-2 font-bold">{review.nickname}</p>
                </div>

                {/* <p className="text-xs mt-2">{timeAgo(review.created_at)}</p> */}
                <p className="text-xs mt-2">{formattedDate}</p>

              <p className="mt-2">
                  {review.contents}
              </p>

              <div className="flex items-center mt-4">
                <button
                  className="text-blue-500 flex items-center"
                  onClick={handleLikeReview}
                >
                  👍 좋아요
                  <span className="ml-2">{review.likes.length}</span>
                </button>
                <span className="ml-4 text-blue-500 flex items-center">
                  💬 댓글
                  <span className="ml-2">{review.comments.length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 댓글 리스트 */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.comment_id} className="border p-4 rounded-lg mb-4">
            <div className="flex justify-between">
              <p className="font-bold">{comment.user_uid}</p>
              <p className="text-gray-500 text-xs">{new Date(comment.created_at).toLocaleString()}</p>
            </div>
            <p>{comment.content}</p>
            <div className="flex items-center mt-2">
              <button
                className="text-blue-500 flex items-center"
                onClick={() => handleLikeComment(comment.comment_id)}
              >
                👍 좋아요
                <span className="ml-2">{comment.likes ? comment.likes.length : 0}</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-20">댓글이 아직 없습니다</div> // 댓글이 없을 때
      )}

      {/* 댓글 작성 섹션 */}
      <div className="mt-4">
        <textarea
          className="border p-2 w-full rounded mb-2"
          placeholder="댓글을 작성하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleAddComment}
        >
          댓글 달기
        </button>
      </div>
    </div>
  );
};

export default Comments;







// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getComments } from "../../apis/comment";

// // interface CommentList {
// //     reviews: Comment[];
// // }
  
// // interface Comment {
// //     comment_id: number;
// //     user_uid: string;
// //     contents: string;
// //     created_at: string;
// //     updated_at: string;
// //     likes: Like[];
// // }

// // interface Like {
// //     user_uid: string;
// //     liked_at: string;
// // }

// interface Review {
//     review_id: number;
//     nickname: string;
//     user_uid: string;
//     rated: number;
//     title: string;
//     contents: string;
//     type_id: string;
//     created_at: string;
//     updated_at: string;
//     comments: Comment[];
//     likes: Like[];
//     liked: boolean;
//   }
  
//   interface Comment {
//     comment_id: number;
//     user_uid: string;
//     content: string;
//     created_at: string;
//     updated_at: string;
//   }
  
//   interface Like {
//     user_uid: string;
//     liked_at: string;
//   }

// const Comments = () => {
//   const [reviews, setReviews] = useState<any[]>([]);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState<CommentList | null>(null);

//   const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  
//   const { reviewID } = useParams();
//   console.log("review_id: ", reviewID);

// //   dd
// //   const [reviews, setReviews] = useState<any[]>([]); // 리뷰 데이터를 상태로 관리
// //   const [likedComments, setLikedComments] = useState<{ [key: number]: boolean }>({});
// //   const [expandedComments, setExpandedComments] = useState<{ [key: number]: boolean }>({});
  
// //   const navigate = useNavigate();

// //   // 비동기 함수 호출을 useEffect 내에서 처리
// //   useEffect(() => {
// //     if (typeID) {
// //       const fetchReviews = async () => {
// //         try {
// //           const reviewsData = await getReviews(typeID); // API 호출
// //           setReviews(reviewsData); // 받아온 데이터 상태에 저장
// //         } catch (error) {
// //           console.error("리뷰를 가져오는 데 실패했습니다.", error);
// //         }
// //       };

// //       fetchReviews(); // 컴포넌트 마운트 시 API 호출
// //     }
// //   }, [typeID]); // typeID가 변경될 때마다 다시 호출
  
//   useEffect(() => {
//       const fetchComments = async () => {
//           if (reviewID) {
//           try {
//               console.log(reviewID);
//               const commentsData = await getComments(reviewID);
//               setComments(commentsData);
//           } catch (error) {
//               console.error("Error fetching reviews data info:", error);
//           } finally {
//               setLoading(false); // 로딩 완료
//           }
//           }
//       };
  
//       fetchComments();
//       }, []);
  
//       if (loading) {
//       return <div>Loading...</div>; // 데이터 로딩 중일 때 UI
//       }

//   const handleLikeReview = () => {
//     setReview((prevReview) => ({
//       ...prevReview,
//       likes: prevReview.likes + 1,
//     }));
//   };

//   const handleLikeComment = (commentId: number) => {
//     setComments((prevComments) =>
//         prevComments.map((comment) =>
//             comment.comment_id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
//       )
//     );
//   };

//   const handleAddComment = () => {
//     if (newComment.trim() === "") return;

//     const newCommentData = {
//       id: comments.length + 1,
//       username: "새로운 유저",
//       content: newComment,
//       likes: 0,
//       timeAgo: "방금 전",
//     };

//     setComments([newCommentData, ...comments]);
//     setNewComment("");
//   };

//   return (
//     <div className="p-4 container mx-auto grid-cols-12 px-5 gap-10">
//       {/* 코멘트 상세 페이지 */}
//       <div className="border p-4 rounded-lg mb-4">
//         <div className="flex items-start">
//           {/* <img
//             src={review.profileImage}
//             alt={review.artistName}
//             className="w-20 h-20 mr-4"
//           /> */}

//           <div className="flex flex-col w-full">
//             <div className="flex justify-between">
//               <p className="text-xl font-bold">{review.nickname}</p>
//               <p className="text-gray-500">{review.timeAgo}</p>
//             </div>

//             <div className="flex items-center mb-2">
//               <span className="text-yellow-500 mr-2">★ {review.rated}</span>
//             </div>

//             <p>{review.contents}</p>

//             <div className="flex items-center mt-4">
//               <button
//                 className="text-blue-500 flex items-center"
//                 onClick={handleLikeReview}
//               >
//                 👍 좋아요
//                 <span className="ml-2">{review.likes}</span>
//               </button>
//               <span className="ml-4 text-blue-500 flex items-center">
//                 💬 댓글
//                 <span className="ml-2">{review.comments.length}</span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 댓글 리스트 */}
//       {comments ? (
//         comments.map((comment) => (
//             <div key={comment.comment_id} className="border p-4 rounded-lg mb-4">
//               <div className="flex justify-between">
//                 <p className="font-bold">{comment.user_uid}</p>
//                 <p className="text-gray-500">{comment.created_at + "  ~~전 으로 바꾸기"}</p>
//               </div>
//               <p>{comment.contents}</p>
//               <div className="flex items-center mt-2">
//                 <button
//                   className="text-blue-500 flex items-center"
//                   onClick={() => handleLikeComment(comment.comment_id)}
//                 >
//                   👍 좋아요
//                   <span className="ml-2">{comment.likes.length}</span>
//                 </button>
//               </div>
//             </div>
//           ))
//       ) : (
//         <div>댓글이 아직 없습니다</div> // 리뷰가 없을 때 렌더링
//       )}

//         {/* 댓글 작성 섹션 */}
//         <div className="mt-4">
//             <textarea
//                 className="border p-2 w-full rounded mb-2"
//                 placeholder="댓글을 작성하세요..."
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button
//                 className="bg-blue-500 text-white py-2 px-4 rounded"
//                 onClick={handleAddComment}
//             >
//                 댓글 달기
//             </button>
//         </div>
//     </div>
//   );
// };

// export default Comments;
