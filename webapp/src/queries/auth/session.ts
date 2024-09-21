import { supabase } from "../../supabase-client";
import { useAppQuery } from "../base-queries";

export const checkSession = async () => {
    const { data, error } = await supabase.auth.getUser();
    return { data, error };
};

export const useCheckSessionQuery = () => {
    return useAppQuery({
        queryKey: ['session'],
        queryFn: checkSession
    });
};

export const useCurrentUser = () => {
    const session = useCheckSessionQuery();    
    return session.data?.data.user;
}