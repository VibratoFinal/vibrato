import axios from "axios";

export interface Track {
  id: string;
  name: string;
  preview: string | null; // null 처리 추가
  album_id: string;
  album_name: string;
  image_url: string; // 변경: album_image -> image_url
  album_spotify_url: string;
  release_date: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
    liked: boolean; // 추가된 필드
  }[];
  avg_rated: number; // 변경: rated -> avg_rated
  count_rated: number; // 추가
  liked: boolean; // 추가
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  spotify_url: string;
  rated: number;
  genres: string[];
}

export interface Album {
  id: string;
  name: string;
  image: string;
  total_tracks: number;
  release_date: string;
  album_artists: {
    id: string;
    name: string;
    spotify_url: string;
  }[];
  rated: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 새로운 플레이리스트 API 추가
export const fetchJazzForSleepChart = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/charts/genres/jazzforsleep`,
      {
        limit: limit.toString(),
        offset: "0",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Jazz for Sleep 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("Jazz for Sleep 차트를 가져오는 데 실패했습니다.");
  }
};

export const fetchKPopDanceChart = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/charts/genres/kpopdance`,
      {
        limit: limit.toString(),
        offset: "0",
      }
    );
    return response.data;
  } catch (error) {
    console.error("K Pop Dance 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("K Pop Dance 차트를 가져오는 데 실패했습니다.");
  }
};

export const fetchAllTimeHighestChart = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/charts/genres/alltimehighest`,
      {
        limit: limit.toString(),
        offset: "0",
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "All-Time Highest Rated 차트를 가져오는 데 실패했습니다:",
      error
    );
    throw new Error("All-Time Highest Rated 차트를 가져오는 데 실패했습니다.");
  }
};

export const fetchTodaysHitChart = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/charts/genres/todayshit`,
      {
        limit: limit.toString(),
        offset: "0",
      }
    );
    return response.data;
  } catch (error) {
    console.error("Today’s Hit 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("Today’s Hit 차트를 가져오는 데 실패했습니다.");
  }
};

// 기존 API들 유지
// 한국 Top 50 차트 조회
export const fetchKoreaTop50 = async (limit: number = 20): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/korea`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("한국 Top 50 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("한국 Top 50 차트를 가져오는 데 실패했습니다.");
  }
};

// 글로벌 Top 50 차트 조회
export const fetchGlobalTop50 = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/global`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("글로벌 Top 50 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("글로벌 Top 50 차트를 가져오는 데 실패했습니다.");
  }
};

// 한국 주간 50차트 조회
export const fetchKoreaWeeklyTop50 = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/korea/weekly`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("한국 주간 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("한국 주간 차트를 가져오는 데 실패했습니다.");
  }
};

// 글로벌 주간 50차트 조회
export const fetchGlobalWeeklyTop50 = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/global/weekly`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("글로벌 주간 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("글로벌 주간 차트를 가져오는 데 실패했습니다.");
  }
};

// 최신 노래 조회 (국내)
export const fetchKoreaRecentTracks = async (
  limit: number = 20
): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/korea/recent`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("최신 노래(한국)를 가져오는 데 실패했습니다:", error);
    throw new Error("최신 노래(한국)를 가져오는 데 실패했습니다.");
  }
};

// Anima R&B 장르 차트 조회
export const fetchAnimaRnBChart = async (
  limit: number = 50
): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charts/genres/animarnb`, {
      limit: limit.toString(),
      offset: "0",
    });
    return response.data;
  } catch (error) {
    console.error("Anima R&B 차트를 가져오는 데 실패했습니다:", error);
    throw new Error("Anima R&B 차트를 가져오는 데 실패했습니다.");
  }
};

// 전체 검색 API 호출
export const searchAll = async (
  searchContent: string
): Promise<{
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
}> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/search/all`, {
      search_content: searchContent,
    });
    return response.data;
  } catch (error) {
    console.error("검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 노래 검색 API 호출
export const searchTracks = async (searchContent: string): Promise<Track[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/search/tracks`, {
      search_content: searchContent,
    });
    return response.data;
  } catch (error) {
    console.error("노래 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("노래 검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 아티스트 검색 API 호출
export const searchArtists = async (
  searchContent: string
): Promise<Artist[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/search/artists`, {
      search_content: searchContent,
    });
    return response.data;
  } catch (error) {
    console.error("아티스트 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("아티스트 검색 결과를 가져오는 데 실패했습니다.");
  }
};

// 앨범 검색 API 호출
export const searchAlbums = async (searchContent: string): Promise<Album[]> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/search/albums`, {
      search_content: searchContent,
    });
    return response.data;
  } catch (error) {
    console.error("앨범 검색 결과를 가져오는 데 실패했습니다:", error);
    throw new Error("앨범 검색 결과를 가져오는 데 실패했습니다.");
  }
};
