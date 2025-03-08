import { createClient } from "@/supabase/client";

export async function signInWithSupabase(form: {
  email: string;
  password: string;
}) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}
export async function signUpWithSupabase(form: {
  email: string;
  password: string;
  username: string;
}) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
        },
      },
    });
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}
export const getAuthenticatedUser = async () => {
  const supabase = createClient();
  const user = (await supabase.auth.getSession()).data?.session?.user;
  // const user = await supabase.auth.getUser();
  return user;
};
export const signoutUser = async () => {
  const supabase = createClient();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
export async function addDataToSupabase(tableName: string, data: any) {
  const supabase = createClient();
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select();
    if (error) {
      throw error;
    }
    return insertedData;
  } catch (error) {
    console.error(`Error adding data to ${tableName}:`, error);
    throw error;
  }
}
export async function deleteDataFromSupabase(
  tableName: string,
  condition: { column: string; value: any }
) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from(tableName)
      .delete()
      .eq(condition.column, condition.value);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error deleting data from ${tableName}:`, error);
    throw error;
  }
}
export async function updateDataInSupabase(
  tableName: string,
  id: number,
  data: any
) {
  const supabase = createClient();
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq("id", id)
      .select();
    if (error) {
      throw error;
    }
    return updatedData;
  } catch (error) {
    console.error(`Error updating data in ${tableName}:`, error);
    throw error;
  }
}
