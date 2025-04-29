import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import Button from '../../../components/ui/Button';
import { IoIosArrowRoundBack, IoIosPrint } from 'react-icons/io';
import { RxDownload } from 'react-icons/rx';
import { CiCalendarDate, CiCreditCard1, CiLocationOn, CiUser } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getOrderById } from '../../../services/OrderService';

import { useLoading } from '../../../components/context/LoadingContext';

const cx = classNames.bind(styles);
function OrderDetail() {
    const [isPrinting, setIsPrinting] = useState(false);
    const [order, setOrder] = useState({});

    // Loading
    const { setLoading } = useLoading();

    // Params
    const params = useParams();
    // navigate
    const navigate = useNavigate();

    // Effect
    useEffect(() => {
        if (!params.id) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getOrderById(params.id);
                setOrder(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);
    function handlePrint() {
        setIsPrinting(true);
        setTimeout(() => {
            window.print();
            setIsPrinting(false);
        }, 100);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header', 'hide-on-print')}>
                    <div className={cx('header__left')}>
                        <IoIosArrowRoundBack className={cx('icon')} onClick={() => navigate('/order')} />
                        <h2 className={cx('order-name')}>
                            Order
                            <span className="text-primary"> {order?.orderId ?? ''}</span>
                        </h2>
                    </div>
                    <div className={cx('header__right')}>
                        <Button dark onClick={handlePrint}>
                            <IoIosPrint className={cx('icon')} />
                            <span>Print Invoice</span>
                        </Button>
                        <Button outline>
                            <RxDownload className={cx('icon')} />
                            <span>Download PDF</span>
                        </Button>
                    </div>
                </div>
                <div className={cx('info')}>
                    <div className={cx('info__order')}>
                        <h3 className={cx('item_title')}>Thông tin đơn hàng</h3>
                        <div className={cx('info__content')}>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Order ID:</div>
                                <div className={cx('col-r')}>{order.orderId}</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Ngày đặt Tour:</div>
                                <div className={cx('col-r')}>{order.date}</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Trạng thái:</div>
                                <div
                                    className={cx('col-r', {
                                        'stt-success': order.status === 'success',
                                        'stt-processing': order.status === 'processing',
                                        'stt-cancel': order.status === 'cancel',
                                    })}
                                >
                                    {order.status}
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Payment</div>
                                <div className={cx('col-r')}>Credit Card</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info__customer')}>
                        <h3 className={cx('item_title')}>Thông tin khách hàng</h3>
                        <div className={cx('info__content')}>
                            <div className={cx('row', 'user')}>
                                <div className={cx('col-l')}>
                                    <CiUser />
                                </div>
                                <div className={cx('col-r')}>{order.userInfo?.name}</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Email:</div>
                                <div className={cx('col-r')}>{order.userInfo?.email}</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-l')}>Phone:</div>
                                <div className={cx('col-r')}>+84 364356053</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('tour-detail')}>
                    <h3 className={cx('item_title')}>Chi tiết Tour</h3>
                    <div className={cx('tour-detail-box')}>
                        <div className={cx('tour-detail-inner')}>
                            <div className={cx('tour-detail__left')}>
                                <h4 className={cx('tour-title')}>{order.tourInfo?.title}</h4>
                                <div className={cx('tour-address')}>
                                    <CiLocationOn />
                                    <span>{order.tourInfo?.address}</span>
                                </div>
                            </div>
                            <div className={cx('tour-detail__right')}>
                                <div className={cx('tour-time')}>
                                    <CiCalendarDate />
                                    <span>
                                        {order.tourInfo?.dateTour} - {order.tourInfo?.duration}
                                    </span>
                                </div>
                                <span className={cx('tour-duration')}>{order.tourInfo?.bed} days</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('pricing-detail')}>
                    <h3 className={cx('item_title')}>Chi tiết Dịch vụ</h3>
                    <div className={cx('table')}>
                        <table>
                            <thead className={cx('bgc-nau')}>
                                <tr className={cx('row')}>
                                    <th>Mô tả</th>
                                    <th>Số gường</th>
                                    <th className={cx('text-right')}>Giá</th>
                                    <th className={cx('text-right')}>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className={cx('row')}>
                                    <td className={cx('')}>
                                        <div>{order.tourInfo?.title}</div>
                                        <div>{order.tourInfo?.duration} days</div>
                                    </td>
                                    <td>{order.tourInfo?.bed}</td>
                                    <td align="right">{order.total} VND</td>
                                    <td align="right">{order.total * order.tourInfo?.bed}.000 VND</td>
                                </tr>
                            </tbody>
                            <tfoot className={cx('bgc-nau')}>
                                <tr>
                                    <td colSpan="3" align="right">
                                        Chi phí khác
                                    </td>
                                    <td align="right">0 VND</td>
                                </tr>
                                <tr className={cx('total')}>
                                    <td colSpan="3" align="right">
                                        Tổng cộng
                                    </td>
                                    <td align="right">{order.total * order.tourInfo?.bed}.000 VND</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div className={cx('note')}>
                    <h3 className={cx('item_title')}>Notes</h3>
                    <div className={cx('note-box', 'bgc-nau')}>
                        <span>{order.notes ?? 'Không có ghi chú!'}</span>
                    </div>
                </div>
                <div className={cx('info_payment')}>
                    <h3 className={cx('item_title')}>Thông tin thanh toán</h3>
                    <div className={cx('payment-box', 'bgc-nau')}>
                        <CiCreditCard1 />
                        <div className={cx('payment-content')}>
                            <div>Credit Card</div>
                            <div className={cx('payment-id')}>Payment ID: {order.paymentId}</div>
                        </div>
                    </div>
                </div>
                <div className={cx('btn_back', 'hide-on-print')}>
                    <Button outline onClick={() => navigate('/order')}>
                        Quay lại
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
