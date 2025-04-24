import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import { useParams } from 'react-router-dom';
import CategoryForm from '../../../components/CategoryForm';

const cx = classNames.bind(styles);

function Edit() {
    const params = useParams();

    return <CategoryForm type="edit" id={params.id} />;
}

export default Edit;
