import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import Input from '../../components/ui/Input';
import Button from '../../components/Button';
import { CiFilter } from 'react-icons/ci';
import { RxDownload } from 'react-icons/rx';
import { IoIosArrowDown, IoIosMore } from 'react-icons/io';
const cx = classNames.bind(styles);

function Order() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Input />
                <Button outline classNames={cx('icon-filter')}>
                    <CiFilter className={cx('icon')} />
                </Button>
                <Button dark classNames={cx('icon-export')}>
                    <RxDownload className={cx('icon')} />
                    <span>Export</span>
                </Button>
            </div>
            <div className={cx('main-box')}>
                <div className={cx('inner-box')}>
                    <div className={cx('title-box')}>
                        <div className={cx('title')}>
                            <div>Order</div>
                        </div>
                        <div className={cx('sub-title')}>
                            <span>View and manage all tour bookings and orders.</span>
                        </div>
                    </div>
                    <div className={cx('filter')}>
                        <Button outline classNames={cx('br-4', 'filter-btn')}>
                            <span>All Order</span>
                            <IoIosArrowDown />
                        </Button>
                        <Button outline classNames={cx('br-4', 'filter-btn')}>
                            <span>Newest first</span>
                            <IoIosArrowDown />
                        </Button>
                    </div>
                    <div className={cx('table')}>
                        <table>
                            <thead>
                                <tr className={cx('row')}>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Tour</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={cx('row')}>
                                    <td className={cx('order-id')}>#ORD-7245</td>
                                    <td>Emma Wilson</td>
                                    <td>Historical City Tour</td>
                                    <td>Apr 13, 2025</td>
                                    <td>$899.00</td>
                                    <td>
                                        <span className={cx('stt-success')}>Completed</span>
                                    </td>
                                    <td className={cx('more')}>
                                        <IoIosMore />
                                    </td>
                                </tr>
                                <tr className={cx('row')}>
                                    <td className={cx('order-id')}>#ORD-7245</td>
                                    <td>Emma Wilson</td>
                                    <td>Historical City Tour</td>
                                    <td>Apr 13, 2025</td>
                                    <td>$899.00</td>
                                    <td>
                                        <span className={cx('stt-processing')}>Processing</span>
                                    </td>
                                    <td className={cx('more')}>
                                        <IoIosMore />
                                    </td>
                                </tr>
                                <tr className={cx('row')}>
                                    <td className={cx('order-id')}>#ORD-7245</td>
                                    <td>Emma Wilson</td>
                                    <td>Historical City Tour</td>
                                    <td>Apr 13, 2025</td>
                                    <td>$899.00</td>
                                    <td>
                                        <span className={cx('stt-cancel')}>Cancelled</span>
                                    </td>
                                    <td className={cx('more')}>
                                        <IoIosMore />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;
