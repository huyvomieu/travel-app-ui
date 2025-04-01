import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import Customeritem from './CustomerItem';
import { useEffect, useState } from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

function ListCustomer() {
    const [hideShowHeader, sethideShowHeader] = useState(false);
    const [checkedALl, setCheckedAll] = useState(false);
    const [hideIconUp, sethideIconUp] = useState(true);
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL_API}/api/user`)
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data);
            });
    }, []);
    useEffect(() => {
        const checkHideShowHeader = customers.some((cus) => cus.checked);
        sethideShowHeader(checkHideShowHeader);
    }, [customers]);
    function handleCheckBoxALl(e) {
        setCustomers((prev) =>
            prev.map((customer) => {
                customer.checked = e.target.checked;
                return customer;
            }),
        );
        setCheckedAll(!checkedALl);
    }
    function handleChangCheckBox(value, id) {
        setCustomers((prev) => {
            const updatedCustomers = prev.map((cus) => {
                if (cus.id === id) cus.checked = value;
                return cus;
            });
            const checkedAll = customers.every((cus) => cus.checked);
            setCheckedAll(checkedAll);

            return updatedCustomers;
        });
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('grid', 'header')}>
                    <div className={cx('checkbox-all')}>
                        <input checked={checkedALl} onChange={handleCheckBoxALl} type="checkbox" />
                    </div>
                    {hideShowHeader ? (
                        <>
                            <Tippy
                                interactive
                                onShow={() => sethideIconUp(!hideIconUp)}
                                onHidden={() => sethideIconUp(!hideIconUp)}
                                placement="bottom"
                                render={(attrs) => (
                                    <div className={cx('box-select')} tabIndex="-1" {...attrs}>
                                        <div className={cx('item')}>
                                            <button>Xóa khách hàng</button>
                                        </div>
                                        <hr />
                                        <div className={cx('item')}>
                                            <button>Chỉnh sửa khách hàng</button>
                                        </div>
                                        <hr />
                                        <div className={cx('item')}>
                                            <button>Đặt lại mật khẩu</button>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className={cx('select-option')}>
                                    <span>Chọn thao tác</span>
                                    {!hideIconUp && <RiArrowUpSFill />}
                                    {hideIconUp && <RiArrowDownSFill />}
                                </div>
                            </Tippy>
                        </>
                    ) : (
                        <>
                            <strong className={cx('full-name')}>Họ tên</strong>
                            <strong className={cx('email')}>Email</strong>
                            <strong className={cx('username')}>Tên đăng nhập</strong>
                            <strong className={cx('current-tour')}>Tour hiện tại</strong>
                            <strong className={cx('total')}>Tổng chi tiêu</strong>
                        </>
                    )}
                </div>
                <div className={cx('line')}>
                    <hr />
                </div>
                <div className={cx('list')}>
                    {customers.map((customer, key) => {
                        return <Customeritem key={key} data={customer} onChangeCheckBox={handleChangCheckBox} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default ListCustomer;
