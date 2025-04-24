import classNames from 'classnames/bind';
import styles from '../Category.module.scss';
import CategoryForm from '../../../components/CategoryForm';

const cx = classNames.bind(styles);

function Create() {
    return <CategoryForm />;
}

export default Create;
