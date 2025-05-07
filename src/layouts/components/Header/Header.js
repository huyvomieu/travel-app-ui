import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { IoIosNotificationsOutline } from 'react-icons/io';
import images from '../../../assets/images';
import Input from '../../../components/ui/Input';
import Button from '../../../components/Button';
import { useAuth } from '../../../components/context/AuthContext';

const cx = classNames.bind(styles);

function Header() {
    const { info } = useAuth();
    const { fullname, email } = info();
    return (
        <header className={cx('wrapper', 'hide-on-print')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>Dashboard</h1>
                <div className={cx('right-header')}>
                    <Input placeholder="Search..." />
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
