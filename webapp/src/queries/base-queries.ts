import { QueryKey, useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

const channelMap = new Map<string, boolean>();

type SupabaseSubscribeOptions = {
    event: '*';
    schema: string;
    table: string;
    filter?: string;
    enabled?: boolean;
}

type AppQueryOptions<TQueryFnData, TError, TData> = UseQueryOptions<TQueryFnData, TError, TData> & {
    subscribe?: SupabaseSubscribeOptions;
}


const supabaseSubscribe = (queryKey: QueryKey, options: SupabaseSubscribeOptions) => {
    const queryClient = useQueryClient();
    const handleChange = (payload: any) => {
        console.log(payload);
        queryClient.invalidateQueries({ queryKey: queryKey });
    }
    const channelName = queryKey.join('-');

    if (channelMap.has(channelName)) {
        return;
    }
    channelMap.set(channelName, true);
    supabase.channel(channelName).on('postgres_changes', options, handleChange).subscribe();
}

export const useAppQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(options: AppQueryOptions<TQueryFnData, TError, TData>) => {
    if (options.subscribe && options.subscribe.enabled) {
        supabaseSubscribe(options.queryKey, options.subscribe);
    }
    return useQuery<TQueryFnData, TError, TData>({
        ...options,
    });
}

export const useAppMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(options: UseMutationOptions<TData, TError, TVariables, TContext>) => {
    return useMutation<TData, TError, TVariables, TContext>({
        ...options,
        onSuccess: (data, variables, context) => {
            options.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options.onError?.(error, variables, context);
        },
        onSettled: (data, error, variables, context) => {
            options.onSettled?.(data, error, variables, context);
        },
    });
}
