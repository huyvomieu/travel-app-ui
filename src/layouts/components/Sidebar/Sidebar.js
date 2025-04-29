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
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Sidebar() {
    const navigate = useNavigate();
    return (
        <aside className={cx('wrapper', 'hide-on-print')}>
            <div onClick={() => navigate('/')} className={cx('logo-box')}>
                <span className={cx('logo')}>HT</span>
                <span className={cx('name')}>Travel App</span>
            </div>
            <nav className={cx('nav')}>
                <MenuItem to="/" content="Tổng quan" icon={<IoHomeOutline />} />
                <MenuItem
                    content="Tour"
                    icon={<MdOutlineTravelExplore />}
                    children={
                        <>
                            <MenuItem to="/category" content="Danh mục Tour" />
                            <MenuItem to="/items" content="Danh sách Tour" />
                        </>
                    }
                />

                <MenuItem to="/order" content="Đơn hàng" icon={<IoCartOutline />} />
                <MenuItem to="/customers" content="Khách hàng" icon={<FiUser />} />
                <MenuItem to="/report" content="Báo cáo" icon={<IoTrendingDownOutline />} />
                <MenuItem to="/settings" content="Cài đặt" icon={<IoSettingsOutline />} />
            </nav>
            <div className={cx('bottom-menu')}>
                <MenuItem to="/logout" content="Đăng xuất" icon={<IoLogOutOutline />} />
            </div>
        </aside>
    );
}

export default Sidebar;
