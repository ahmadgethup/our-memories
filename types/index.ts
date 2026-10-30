
export type Tab = "home" | "memories" | "notes" | "plans" | "wedding";

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
