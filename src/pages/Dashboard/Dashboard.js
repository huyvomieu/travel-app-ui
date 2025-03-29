import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { IoIosTrendingUp } from 'react-icons/io';
import Box from './Box';

const cx = classNames.bind(styles);

function Dashboard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-page')}>
                <h2 className={cx('title')}>Tổng quan</h2>
                <p className={cx('sub')}>Xin chào, Huy</p>
            </div>
            <div className={cx('report')}>
                <Box title="Doanh số" subTitle="5,555,555Đ" icon={<IoIosTrendingUp />} />
                <Box title="Đơn hàng" subTitle="9999" icon={<IoIosTrendingUp />} />
                <Box title="Khách hàng" subTitle="99" icon={<IoIosTrendingUp />} />
            </div>
            <h3 className={cx('recent-message')}>Tin nhắn gần đây</h3>
            <div className={cx('message-box')}>
                <div className={cx('inner')}>
                    <div className={cx('message-item')}>
                        <strong className={cx('avatar-header')}>Ảnh</strong>
                        <strong className={cx('name-header')}>Tên đăng nhập</strong>
                        <strong className={cx('order_id-header')}>Mã chuyến đi</strong>
                        <strong className={cx('status-header')}>Trạng thái</strong>
                        <strong className={cx('time-header')}>Thời gian</strong>
                    </div>
                    <div className={cx('message-item')}>
                        <img
                            className={cx('avatar')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/474148288_1373162650710384_494981326257857233_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE7bwgmIng9IMwfkyFKODp3tY-DwHfWxzW1j4PAd9bHNY_psqFvRF3mNd39LXQB2iNphjl7drzUOgmyjDlESNLx&_nc_ohc=k6YRLF0f0o0Q7kNvgH8qAcB&_nc_oc=AdmpWRMtnoGxeIIARVknBJVUTJDqCXtCwfhVTxOwmlBPHmBPlW4BNlYfPcrxi_IY9B0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=gwjy8a-5V37qn31O78sq6A&oh=00_AYGXu4me4N1Usqxm8_OsLYzeXE54Tf1KfUVu4VSwBFkNWA&oe=67EDBB3D"
                            alt="avatar"
                        />
                        <span className={cx('name')}>Nguyễn Huy</span>
                        <span className={cx('order_id')}>#1111</span>
                        <span className={cx('status')}>Đã hỗ trợ</span>
                        <span className={cx('time')}>04-04-2025 12:12</span>
                    </div>
                    <div className={cx('message-item')}>
                        <img
                            className={cx('avatar')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/474148288_1373162650710384_494981326257857233_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE7bwgmIng9IMwfkyFKODp3tY-DwHfWxzW1j4PAd9bHNY_psqFvRF3mNd39LXQB2iNphjl7drzUOgmyjDlESNLx&_nc_ohc=k6YRLF0f0o0Q7kNvgH8qAcB&_nc_oc=AdmpWRMtnoGxeIIARVknBJVUTJDqCXtCwfhVTxOwmlBPHmBPlW4BNlYfPcrxi_IY9B0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=gwjy8a-5V37qn31O78sq6A&oh=00_AYGXu4me4N1Usqxm8_OsLYzeXE54Tf1KfUVu4VSwBFkNWA&oe=67EDBB3D"
                            alt="avatar"
                        />
                        <span className={cx('name')}>Nguyễn Huy</span>
                        <span className={cx('order_id')}>#1111</span>
                        <span className={cx('status')}>Đã hỗ trợ</span>
                        <span className={cx('time')}>04-04-2025 12:12</span>
                    </div>
                    <div className={cx('message-item')}>
                        <img
                            className={cx('avatar')}
                            src="https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-6/474148288_1373162650710384_494981326257857233_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE7bwgmIng9IMwfkyFKODp3tY-DwHfWxzW1j4PAd9bHNY_psqFvRF3mNd39LXQB2iNphjl7drzUOgmyjDlESNLx&_nc_ohc=k6YRLF0f0o0Q7kNvgH8qAcB&_nc_oc=AdmpWRMtnoGxeIIARVknBJVUTJDqCXtCwfhVTxOwmlBPHmBPlW4BNlYfPcrxi_IY9B0&_nc_zt=23&_nc_ht=scontent.fhan14-5.fna&_nc_gid=gwjy8a-5V37qn31O78sq6A&oh=00_AYGXu4me4N1Usqxm8_OsLYzeXE54Tf1KfUVu4VSwBFkNWA&oe=67EDBB3D"
                            alt="avatar"
                        />
                        <span className={cx('name')}>Nguyễn Huy</span>
                        <span className={cx('order_id')}>#1111</span>
                        <span className={cx('status')}>Đã hỗ trợ</span>
                        <span className={cx('time')}>04-04-2025 12:12</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
