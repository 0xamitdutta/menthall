export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  name: string;
  bio: string | null;
  profile_picture_url: string | null;
  is_creator: boolean;
  is_email_verified: boolean;
  created_at: Date;
  updated_at: Date;
}
