import { useEffect, useState } from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';

import Customeritem from './CustomerItem';
import { deleteCustomer, getCustomer } from '../../../services/CustomerService';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';

const cx = classNames.bind(styles);

function ListCustomer() {
    const [hideShowHeader, sethideShowHeader] = useState(false);
    const [checkedALl, setCheckedAll] = useState(false);
    const [hideIconUp, sethideIconUp] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [countCoustomerChecked, setCountCoustomerChecked] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle fetch API getCustomer
    useEffect(() => {
        const fetchAPI = async () => {
            const customersData = await getCustomer();

            setCustomers(customersData);
        };
        fetchAPI();
    }, []);

    // Handle logic checkbox when customer is changed
    useEffect(() => {
        const checkHideShowHeader = customers.some((cus) => cus.checked);
        const countCoustomerChecked = customers.reduce((count, current) => count + (current.checked ? 1 : 0), 0);
        setCountCoustomerChecked(countCoustomerChecked);
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
    function handleDeleteCustomer() {
        const cusChecked = customers.filter((customer) => customer.checked);
        const cusId = cusChecked.map((cus) => cus.id);
        const fetchAPI = async () => {
            const res = await deleteCustomer(cusId);
            if (res?.code === 200) {
                const customersData = await getCustomer();
                setCustomers(customersData);
                setIsModalOpen(false);
            } else {
                throw new Error('Error Delete');
            }
        };
        fetchAPI();
    }
    return (
        <div className={cx('wrapper')}>
            {isModalOpen && (
                <Modal
                    title="Bạn có chắc chắn xóa?"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteCustomer}
                />
            )}
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
                                            <button onClick={() => setIsModalOpen(true)}>Xóa khách hàng</button>
                                        </div>
                                        <hr />
                                        <div className={cx('item', { disabled: countCoustomerChecked > 1 })}>
                                            <Link
                                                to={
                                                    `/customers/` +
                                                    // Lấy ra id customer đang được checked
                                                    customers.filter((customer) => customer.checked)[0]?.username
                                                }
                                            >
                                                <button>Chỉnh sửa khách hàng</button>
                                            </Link>
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
