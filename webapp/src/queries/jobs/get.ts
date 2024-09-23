import { supabase } from "../../supabase-client";
import { useCurrentUser } from "../auth/session";
import { useAppQuery } from "../base-queries";


const getJobs = async (userId?: string) => {
    if (!userId) return { data: [] };
    const { data, error } = await supabase.from('jobs').select('*').eq('owner_id', userId);
    return { data, error };
}

export const useMyJobsQuery = () => {
    const user = useCurrentUser();
    
    return useAppQuery({
        queryKey: [`jobs-${user?.id}`],
        queryFn: () => getJobs(user?.id),
        subscribe: {
            event: '*',
            schema: 'public',
            table: 'jobs',
            enabled: !!user
        },
        enabled: !!user

    });
}
