import classNames from 'classnames/bind';
import styles from './AddCustomer.module.scss';

import BoxCustomer from '../../../components/BoxCustomer';

const cx = classNames.bind(styles);

function AddCustomer() {
    return <BoxCustomer title="Thêm khách hàng" btnPrimaryName="Thêm khách hàng" type="add" />;
}

export default AddCustomer;
