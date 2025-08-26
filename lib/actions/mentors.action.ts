import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

interface GetAllMentorsParams {
    limit?: number;
    page?: number;
    university?: string;
    specialization?: string;
}

export const getAllMentors = async ({ limit = 10, page = 1, university }: GetAllMentorsParams) => {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value
            },
            set(name: string, value: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value, ...options })
              } catch {
                // Supress error
              }
            },
            remove(name: string, options: CookieOptions) {
              try {
                cookieStore.set({ name, value: '', ...options })
              } catch {
                // Supress error
              }
            },
          },
        }
      );

    let query = supabase.from('mentors').select(`
        *,
        users (
            full_name,
            username,
            profile_picture_url
        )
    `);

    if(university)
        query = query.ilike('college_name', `%${university}%`);


    query = query.range((page - 1) * limit, page * (limit - 1));
    const { data, error } = await query;
    if(error)
        throw new Error(error.message);
    return data;
}
