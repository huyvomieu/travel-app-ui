import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BoxCustomer.module.scss';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { postPutCustomer } from '../../services/CustomerService';
import Button from '../../components/Button';
import Alert from '../Alert';

const cx = classNames.bind(styles);
function BoxCustomer({ title, btnPrimaryName, type, data }) {
    const [name, setName] = useState(data?.name ?? '');
    const [email, setEmail] = useState(data?.email ?? '');
    const [username, setUsername] = useState(data?.username ?? '');
    const [password, setPassword] = useState('111111');
    const [alert, setAlert] = useState(null);
    useEffect(() => {
        setName(data?.name ?? '');
        setEmail(data?.email ?? '');
        setUsername(data?.username ?? '');
        setPassword(data?.password ?? '111111');
    }, [data]);
    function handleClick() {
        setAlert(null);
        if (type === 'add') {
            const customerPost = {
                cartId: username,
                name,
                email,
                password: password,
                username,
            };
            const fetchAPI = async () => {
                const res = await postPutCustomer(customerPost, 'POST');
                if (res.status === 201) {
                    setName('');
                    setEmail('');
                    setUsername('');
                }
                setAlert(res.status);
            };
            fetchAPI();
        } else if (type === 'edit') {
            const customerPut = {
                cartId: username,
                name,
                email,
                password,
                username,
            };
            const fetchAPI = async () => {
                const res = await postPutCustomer(customerPut, 'PUT');

                setAlert(res.status);
            };
            fetchAPI();
        } else {
            return;
        }
    }
    return (
        <div className={cx('wrapper')}>
            {alert === 201 && <Alert success content="Thêm khách hàng thành công!" />}
            {alert === 200 && <Alert success content="Cập nhật khách hàng thành công!" />}
            {alert && <Alert danger content="Thêm khách hàng thất bại!" />}
            <div className={cx('inner')}>
                <Link to={'/customers'} className={cx('breadcrumb')}>
                    <IoIosArrowBack />
                    <span>Khách hàng</span>
                </Link>
                <div className={cx('title')}>
                    <h1>{title}</h1>
                </div>
                <div className={cx('add-customer')}>
                    <div className={cx('customer-inner')}>
                        <div className={cx('grid')}>
                            <span className={cx('label')}>Họ và tên</span>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={cx('input')}
                                type="text"
                            />
                            <span className={cx('label')}>Email</span>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cx('input')}
                                type="email"
                            />
                            <span className={cx('label')}>Tên đăng nhập</span>
                            <input
                                value={username}
                                disabled={type === 'edit'}
                                onChange={(e) => setUsername(e.target.value)}
                                className={cx('input')}
                                type="text"
                            />
                            <span className={cx('label')}>Mật khẩu</span>
                            <input
                                value={password}
                                disabled
                                onChange={(e) => setPassword(e.target.value)}
                                className={cx('input')}
                                type="text"
                            />
                        </div>
                        <div className={cx('submit')}>
                            <Button secondary>Hủy</Button>
                            <Button primary onClick={handleClick}>
                                {btnPrimaryName}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

BoxCustomer.propTypes = {
    title: PropTypes.string.isRequired,
    btnPrimaryName: PropTypes.string.isRequired,
    type: PropTypes.string,
    data: PropTypes.object,
};

export default BoxCustomer;
