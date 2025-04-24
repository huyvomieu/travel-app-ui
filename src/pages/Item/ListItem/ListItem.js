import classNames from 'classnames/bind';
import styles from '../Item.module.scss';
import CardList from '../../../components/Card/CardList/CardList';
import { getDeleteItem } from '../../../services/ItemService';

const cx = classNames.bind(styles);

async function fetchAPI() {
    const data = await getDeleteItem();
    return data;
}
function Item() {
    return (
        <CardList
            title="Chuyến đi"
            breadcrumbs="Tổng quan"
            toBack="/"
            toCreate="/items/create"
            callAPI={fetchAPI}
            page="item"
        />
    );
}

export default Item;
