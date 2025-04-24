import { useState, useEffect, useCallback } from 'react';

function useFetch(apiFunc, immediate = true, ...args) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (...params) => {
            setLoading(true);
            setError(null);
            try {
                const res = await apiFunc(...params);
                setData(res);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        },
        [apiFunc],
    );
    useEffect(() => {
        if (immediate) {
            fetchData(...args);
        }
    }, [fetchData, immediate, ...args]);
    return { data, loading, error, refetch: fetchData };
}

export default useFetch;
