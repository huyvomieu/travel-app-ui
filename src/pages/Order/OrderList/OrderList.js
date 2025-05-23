import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import Input from '../../../components/ui/Input';
import Button from '../../../components/Button';
import { CiFilter } from 'react-icons/ci';
import { RxDownload } from 'react-icons/rx';
import { IoIosArrowDown, IoIosMore } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { getOrder } from '../../../services/OrderService';
import { useLoading } from '../../../components/context/LoadingContext';
const cx = classNames.bind(styles);

function OrderList() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    const { setLoading } = useLoading();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getOrder(null, 'GET');
                setOrders(res);
            } catch (error) {
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    function handleExport() {
        const worksheet = XLSX.utils.json_to_sheet(orders);

        // Bước 2: Tạo workbook và gán worksheet vào
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DanhSachDonHang');

        // Bước 3: Xuất file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        // Bước 4: Tạo Blob và lưu file
        const fileData = new Blob([excelBuffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
        });

        saveAs(fileData, `DanhSachDonHang_${Date.now()}.xlsx`);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Input placeholder="Search orders..." />
                <Button outline classNames={cx('icon-filter')}>
                    <CiFilter className={cx('icon')} />
                </Button>
                <Button onClick={handleExport} dark classNames={cx('icon-export')}>
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
                            <span>Xem và quản lý tất cả Tour và Đơn hàng.</span>
                        </div>
                    </div>
                    <div className={cx('filter')}>
                        <Button outline classNames={cx('br-4', 'filter-btn')}>
                            <span>Tất cả đơn hàng</span>
                            <IoIosArrowDown />
                        </Button>
                        <Button outline classNames={cx('br-4', 'filter-btn')}>
                            <span>Đơn hàng mới nhất</span>
                            <IoIosArrowDown />
                        </Button>
                    </div>
                    <div className={cx('table')}>
                        <table>
                            <thead>
                                <tr className={cx('row')}>
                                    <th>Mã đơn hàng</th>
                                    <th>Khách hàng</th>
                                    <th>Tên Tour</th>
                                    <th>Thời gian đặt</th>
                                    <th>Tổng tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr
                                            key={order.orderId}
                                            onClick={() => navigate(`/order/${order.key}`)}
                                            className={cx('row')}
                                        >
                                            <td className={cx('order-id')}>{order.orderId}</td>
                                            <td>{order.userInfo.name}</td>
                                            <td>
                                                {order.tourInfo.title?.length > 25
                                                    ? order.tourInfo.title.slice(0, 25) + '...'
                                                    : order.tourInfo.title}
                                            </td>
                                            <td>{order.date}</td>
                                            <td>{order.total}VND</td>
                                            <td>
                                                <span
                                                    className={cx({
                                                        'stt-success': order.status === 'success',
                                                        'stt-processing': order.status === 'processing',
                                                        'stt-cancel': order.status === 'cancel',
                                                    })}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" align="center">
                                            Không có đơn hàng nào!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderList;
