
import { Database } from "../../database.types";
import { supabase } from "../../supabase-client";
import { useAppMutation } from "../base-queries";

type Job = Database['public']['Tables']['jobs']['Insert'];

const create = async (job: Job) => {
  const { data, error } = await supabase.from('jobs').insert(job);
  return { data, error };
};

export const useCreateJobMutation = () => {
  return useAppMutation({
    mutationFn: create
  });
};