import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../supabase-client';
import { useAppMutation } from '../base-queries';

interface Credentials {
    email: string;
    password: string;
}

const login = async (credentials: Credentials) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
    })
    return { data, error };
};

export const useLoginMutation = () => {
    const queryClient = useQueryClient()

    return useAppMutation({
        mutationFn: login,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['session'] })
        }
    });
};
