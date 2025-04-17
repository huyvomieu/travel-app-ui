import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import CardDetail from '../../../components/Card/CardDetail';

const cx = classNames.bind(styles);

function Create() {
    return <CardDetail title="Thêm mới" breadcrumbs="Danh mục" toBack="/category" />;
}

export default Create;
