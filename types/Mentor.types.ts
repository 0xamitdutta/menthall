export interface Mentor {
  user_id: string;
  college_name: string;
  college_email: string;
  is_college_email_verified: boolean;
  about: string | null;
  users: {
    full_name: string;
    username: string;
    profile_picture_url: string;
  };
}
