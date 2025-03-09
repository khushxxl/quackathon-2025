import { createClient } from "@/supabase/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendEmail = async (
  email: string,
  buttonText: string,
  title: string,
  subtitle: string,
  paragraphs: string[],
  buttonUrl: string,
  subject: string
) => {
  const response = await fetch("/api/emails", {
    method: "POST",
    body: JSON.stringify({
      email,
      buttonText,
      title,
      subtitle,
      paragraphs,
      buttonUrl,
      subject,
    }),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to send email");
  }

  return response.json();
};

export const checkAuth = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (data.user) {
    return { user: data.user, error: null };
  }
  if (!data.user) return { user: null, error: error };
};
