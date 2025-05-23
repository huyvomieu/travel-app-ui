import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { IoIosNotificationsOutline } from 'react-icons/io';
import images from '../../../assets/images';
import Input from '../../../components/ui/Input';
import Button from '../../../components/Button';
import { useAuth } from '../../../components/context/AuthContext';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    const { info } = useAuth();
    const { fullname, email } = info();

    const location = useLocation();
    const action = location.pathname.split('/')[1];
    let title;
    switch (action) {
        case '':
            title = 'Tổng quan';
            break;
        case 'category':
            title = 'Danh mục';
            break;
        case 'customers':
            title = 'Khách hàng';
            break;
        case 'report':
            title = 'Phân tích - Báo cáo';
            break;
        case 'order':
            title = 'Đơn hàng';
            break;
        case 'settings':
            title = 'Cài đặt';
            break;
        default:
            title = 'Tổng quan';
    }
    return (
        <header className={cx('wrapper', 'hide-on-print')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>{title}</h1>
                <div className={cx('right-header')}>
                    <Input placeholder="Tìm kiếm..." />
                    <Button className={cx('notiffi-icon')}>
                        <IoIosNotificationsOutline />
                    </Button>

                    <div className={cx('profile')}>
                        <img className={cx('avatar')} src={images.user} alt="user" />
                        <div className={cx('profile-content')}>
                            <p className={cx('username')}>{fullname}</p>
                            <p className={cx('email')}>{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
