import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supabase-client";
import { useAppMutation } from "../base-queries";

const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};

export const useLogOutMutation = () => {
    const queryClient = useQueryClient()

    return useAppMutation({
        mutationFn: logOut,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
        }
    });
};