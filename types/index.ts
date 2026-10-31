
export type Tab = "home" | "memories" | "notes" | "plans" | "music" | "wedding";

export type UserName = "Tara" | "Ahmad";

export type Memory = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  created_at: string;
  created_by: UserName | null;
};

export type Note = {
  id: string;
  content: string;
  created_at: string;
  created_by: UserName | null;
};

export type Plan = {
  id: string;
  title: string;
  plan_date: string | null;
  created_at: string;
  created_by: UserName | null;
};

export type Song = {
  id: string;
  title: string;
  provider: "spotify" | "youtube";
  spotify_url: string | null;
  spotify_id: string | null;
  youtube_url: string | null;
  youtube_id: string | null;
  dedication: string | null;
  created_at: string;
  created_by: UserName | null;
};

export type SongRating = {
  song_id: string;
  user_name: UserName;
  rating: number;
  updated_at: string;
};

export type SongComment = {
  id: string;
  song_id: string;
  content: string;
  created_at: string;
  created_by: UserName | null;
};
