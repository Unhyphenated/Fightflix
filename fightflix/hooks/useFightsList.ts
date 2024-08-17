import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useFightsList = () => {
    const { data, error, isLoading } = useSWR('/api/fights', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return { 
        data,
        error,
        isLoading
    }
}

export default useFightsList;