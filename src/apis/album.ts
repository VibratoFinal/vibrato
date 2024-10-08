import { useEffect, useState } from "react";
import { albumDetailMock } from "../mockData";
import { getToken } from "../store/authStore";

interface Album {
  name: string; // 앨범 이름
  image_url: string; // 앨범 이미지
  artists_names: string[]; // 피쳐링, 듀엣 등의 경우 배열에 여러가지가 들어감
  genres: string[]; // 앨범 장르
  release_date: string; // 노래 발매 일자
  total_tracks: number; // 앨범 수록 곡 수
  spotify_url: string; // Spotify로 넘어가는 URL
  avg_rated: number; // 평균 별점
  count_rated: number; // 별점 매긴 수
  liked: boolean; // 선호 여부 (로그인 안했다면 false)
  tracks: Track[]; // 트랙 정보
  artists: Artist[]; // 아티스트 정보
}

interface Track {
  id: number; // 노래 ID
  name: string; // 노래 이름
  spotify_url: string; // Spotify로 넘어가는 URL
  track_number: number; // 앨범 내 몇 번째 노래인지
  avg_rated: number; // 평균 별점
  liked: boolean; // 선호 여부
}

interface Artist {
  id: number; // 가수 ID
  name: string; // 가수 이름
  spotify_url: string; // Spotify로 넘어가는 URL
  avg_rated: number; // 평균 별점
  liked: boolean; // 선호 여부
}


export const useAlbumDetail = (type_id: string) => {
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
    const token = getToken();

      try {
        // const response = await fetch(`/search/single/album`, {
        // method: "GET",
        // headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        // },
        // body: JSON.stringify({ type_id }),
        // });

        // if (!response.ok) {
        //   throw new Error(`Error: ${response.status}`);
        // }

        // const data: Album = await response.json();
        // setAlbum(data);

        // 일단 목데이터 사용
        setAlbum(albumDetailMock);        

    //   } catch (err: unknown) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
      } catch (err: unknown) {  // `unknown`으로 변경
        if (err instanceof Error) {
          setError(err.message);  // 타입 검사 후 `Error` 타입 처리
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [type_id]);

  return { album, loading, error };
};

export default useAlbumDetail;
