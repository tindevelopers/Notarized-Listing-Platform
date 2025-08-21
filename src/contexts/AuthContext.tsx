"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";
import { generateVerificationToken } from "@/lib/auth/client-verification";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error?: any; requiresVerification?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error?: any }>;
  signOut: () => Promise<{ error?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;
    setIsHydrated(true);

    // Get initial session
    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        // Prevent state updates if component is unmounted
        if (!mounted) return;

        if (error) {
          console.error("Error getting session:", error);
          // If it's a configuration error, provide more helpful logging
          if (error.message.includes("Supabase not configured")) {
            console.error("🚨 Supabase Configuration Issue:");
            console.error(
              "This error indicates that Supabase environment variables are not properly configured.",
            );
            console.error("Required environment variables:");
            console.error("- NEXT_PUBLIC_SUPABASE_URL");
            console.error("- NEXT_PUBLIC_SUPABASE_ANON_KEY");
            console.error(
              "Please check your environment configuration in production.",
            );
          }
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error("Error in getSession:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;

        console.log("Auth state changed:", event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Prevent hydration mismatch by not rendering auth-dependent content until hydrated
  if (!isHydrated) {
    return (
      <AuthContext.Provider
        value={{
          user: null,
          session: null,
          loading: true,
          signUp: async () => ({ error: new Error("Not hydrated") }),
          signIn: async () => ({ error: new Error("Not hydrated") }),
          signOut: async () => ({ error: new Error("Not hydrated") }),
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      setLoading(true);

      // First, create the user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          // Disable email confirmation through Supabase - we'll handle it ourselves
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        console.error("Sign up error:", error);
        return { error, requiresVerification: false };
      }

      // If user creation was successful, send verification email
      if (data.user) {
        try {
          // Generate verification code and send email
          const verificationCode = generateVerificationToken(); // This now generates a 6-digit code

          try {
            const emailResponse = await fetch("/api/email/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                userName: fullName || email.split("@")[0],
                verificationCode,
              }),
            });

            if (!emailResponse.ok) {
              const errorData = await emailResponse.json().catch(() => ({}));
              console.error("Failed to send verification email:", errorData);
              // Don't fail the signup if email fails, just log it
            } else {
              const responseData = await emailResponse.json().catch(() => ({}));
              console.log(
                "✅ Verification email processed:",
                responseData.message || "Success",
              );

              // Check if this is development mode
              if (responseData.error?.includes("Development mode")) {
                console.log(
                  "📧 Check the server console for the email content that would be sent",
                );
              }
            }
          } catch (fetchError: any) {
            // Ignore AbortError as it's expected when requests are cancelled
            if (fetchError?.name === "AbortError") {
              console.log("Email verification request was cancelled");
              return { error: null, requiresVerification: true };
            }
            console.error("Error sending verification email:", fetchError);
            // Don't fail the signup if email fails
          }
        } catch (emailError) {
          console.error("Error sending verification email:", emailError);
          // Don't fail the signup if email fails
        }
      }

      return { error: null, requiresVerification: true };
    } catch (error) {
      console.error("Sign up catch error:", error);
      return { error, requiresVerification: false };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Sign in catch error:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error("Sign out catch error:", error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
