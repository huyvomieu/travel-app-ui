import CardList from '../../../components/Card/CardList/CardList';
import { getDeleteCategory } from '../../../services/CategoryService';

function List() {
    const fetchAPI = async () => {
        const data = await getDeleteCategory();
        return data;
    };
    return (
        <CardList
            title="Danh mục"
            breadcrumbs="Sản phẩm"
            toBack="/items"
            toCreate="/category/create"
            callAPI={fetchAPI}
            page="category"
        />
    );
}

export default List;
