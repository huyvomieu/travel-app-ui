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
import { useLocation, useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import { useAuth } from '../../../components/context/AuthContext';

const cx = classNames.bind(styles);

function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    const action = location.pathname.split('/')[1];

    return (
        <aside className={cx('wrapper', 'hide-on-print')}>
            <div onClick={() => navigate('/')} className={cx('logo-box')}>
                <span className={cx('logo')}>HT</span>
                <span className={cx('name')}>Travel App</span>
            </div>
            <nav className={cx('nav')}>
                <MenuItem to="/" content="Tổng quan" active={action === ''} icon={<IoHomeOutline />} />
                <MenuItem
                    content="Tour"
                    active={action === 'category' || action === 'items'}
                    icon={<MdOutlineTravelExplore />}
                >
                    <MenuItem submenu to="/category" icon={<MdOutlineTravelExplore />} content="Danh mục Tour" />
                    <MenuItem submenu to="/items" icon={<MdOutlineTravelExplore />} content="Danh sách Tour" />
                </MenuItem>

                <MenuItem to="/order" active={action === 'order'} content="Đơn hàng" icon={<IoCartOutline />} />
                <MenuItem to="/customers" active={action === 'customers'} content="Khách hàng" icon={<FiUser />} />
                <MenuItem
                    to="/report"
                    active={action === 'report'}
                    content="Báo cáo"
                    icon={<IoTrendingDownOutline />}
                />
                <MenuItem
                    to="/settings"
                    active={action === 'settings'}
                    content="Cài đặt"
                    icon={<IoSettingsOutline />}
                />
            </nav>
            <div onClick={logout} className={cx('bottom-menu')}>
                <MenuItem content="Đăng xuất" icon={<IoLogOutOutline />} />
            </div>
        </aside>
    );
}

export default Sidebar;
