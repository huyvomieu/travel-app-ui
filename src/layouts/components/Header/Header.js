import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { IoIosNotificationsOutline, IoIosSearch } from 'react-icons/io';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('ml-280')}></div>
            <div className={cx('search-box')}>
                <input className={cx('search-input')} placeholder="Tìm kiếm" />
                <button className={cx('search-icon')}>
                    <IoIosSearch />
                </button>
            </div>
            <div className={cx('right-header')}>
                <div className={cx('notiffi-icon')}>
                    <IoIosNotificationsOutline />
                </div>

                <div className={cx('profile')}>
                    <img className={cx('avatar')} src={images.user} alt="user" />
                    <div className={cx('profile-content')}>
                        <p className={cx('username')}>Huy Nguyễn</p>
                        <p className={cx('email')}>huy040424@gmail.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
