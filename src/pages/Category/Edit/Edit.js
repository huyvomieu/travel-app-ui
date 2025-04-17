import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import CardDetail from '../../../components/Card/CardDetail';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDeleteCategory } from '../../../services/CategoryService';

const cx = classNames.bind(styles);

function Edit() {
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getDeleteCategory(params.id);
            setData(data);
        };
        fetchAPI();
    }, [params.id]);
    return <CardDetail title="Chi tiết danh mục" breadcrumbs="Danh mục" toBack="/category" dataEdit={data} edit />;
}

export default Edit;
