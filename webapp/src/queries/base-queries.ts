import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useAppQuery = <TQueryFnData = unknown, TError = unknown, TData = TQueryFnData>(options: UseQueryOptions<TQueryFnData, TError, TData>) => {
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
