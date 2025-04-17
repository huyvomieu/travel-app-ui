import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import {
    IoCartOutline,
    IoHomeOutline,
    IoLogOutOutline,
    IoSettingsOutline,
    IoTrendingDownOutline,
} from 'react-icons/io5';
import { FiUser } from 'react-icons/fi';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Link to="/">
                <div className={cx('logo-box')}>
                    <span className={cx('logo')}>HT</span>
                    <h1 className={cx('name')}>Travel App</h1>
                </div>
            </Link>
            <div className={cx('main-menu')}>
                <MenuItem to="/" content="Tổng quan" icon={<IoHomeOutline />} />
                <MenuItem
                    content="Chuyến đi"
                    icon={<MdOutlineTravelExplore />}
                    children={
                        <>
                            <MenuItem to="/category" content="Danh mục" />
                            <MenuItem to="/items" content="Danh sách chuyến bay" />
                        </>
                    }
                />

                <MenuItem to="/order" content="Đơn hàng" icon={<IoCartOutline />} />
                <MenuItem to="/customers" content="Khách hàng" icon={<FiUser />} />
                <MenuItem to="/report" content="Báo cáo" icon={<IoTrendingDownOutline />} />
            </div>
            <div className={cx('bottom-menu')}>
                <MenuItem to="/settings" content="Cài đặt" icon={<IoSettingsOutline />} />
                <MenuItem to="/logout" content="Đăng xuất" icon={<IoLogOutOutline />} />
            </div>
        </aside>
    );
}

export default Sidebar;
