import { createClient as createSupabaseClient } from "@supabase/supabase-js"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Missing Supabase environment variables. Using mock client.")
    // Return a mock client that won't throw errors
    return {
      auth: {
        signInWithPassword: async () => ({
          data: {
            user: {
              id: "mock-user-id",
              email: "mock@example.com",
              user_metadata: {
                first_name: "Mock",
                last_name: "User",
              },
            },
            session: {},
          },
          error: null,
        }),
        signUp: async (params: any) => ({
          data: {
            user: {
              id: "mock-user-id",
              email: params.email,
              user_metadata: params.options?.data || {},
            },
            session: {},
          },
          error: null,
        }),
        signOut: async () => ({ error: null }),
        getUser: async () => ({
          data: {
            user: {
              id: "mock-user-id",
              email: "mock@example.com",
              user_metadata: {
                first_name: "Mock",
                last_name: "User",
              },
            },
          },
          error: null,
        }),
        resend: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: null }),
          }),
        }),
        insert: async () => ({ error: null }),
      }),
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseKey)
}

