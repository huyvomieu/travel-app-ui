import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

const cx = classNames.bind(styles);
function MainLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                {children}
            </div>
        </div>
    );
}

export default MainLayout;
