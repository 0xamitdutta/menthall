import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      profile_picture_url: string;
      bio: string;
      is_mentor: boolean | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    profile_picture_url: string;
    bio: string;
    is_mentor: boolean | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    profile_picture_url: string;
    bio: string;
    is_mentor: boolean | null;
  }
}
