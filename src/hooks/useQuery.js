import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default useQuery;

// cách dùng:
// const query = useQuery();
// const page = query.get("page");
