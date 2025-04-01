import classNames from 'classnames/bind';
import styles from './Customer.module.scss';
import Button from '../../components/Button';
import ListCustomer from './ListCustomer/ListCustomer';

const cx = classNames.bind(styles);

function Customer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>Danh sách khách hàng</h1>
                <div className={cx('add-btn')}>
                    <Button to="/customers/create" primary>
                        Thêm khách hàng
                    </Button>
                </div>
                <ListCustomer />
            </div>
        </div>
    );
}

export default Customer;
