export interface Profile {
  id: string;
  username: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  updated_at: string;
  notification_likes: boolean;
  notification_comments: boolean;
  notification_follows: boolean;
  email_frequency: string;
  profile_visibility: string;
  timezone: string;
  language: string;
  theme: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  updated_at: string;
}

export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  created_at: string;
} 