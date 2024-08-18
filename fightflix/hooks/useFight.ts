import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useFight = (id?: string) => {
    const { data, error, isLoading, mutate } = useSWR(id ? `/api/fights/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useFight;