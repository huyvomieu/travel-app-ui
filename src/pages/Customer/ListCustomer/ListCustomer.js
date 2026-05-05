import { useEffect, useState } from 'react';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import Customeritem from './CustomerItem';
import { deleteCustomer, getCustomer } from '../../../services/CustomerService';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';

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
        <div className="w-full mt-4">
            {isModalOpen && (
                <Modal
                    title="Bạn có chắc chắn xóa?"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteCustomer}
                />
            )}
            <div className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] w-full overflow-hidden border border-gray-200">
                <div className="grid grid-cols-[50px_2.5fr_2.5fr_1.5fr_1.5fr_1.5fr] bg-gray-50 text-gray-600 font-semibold text-sm uppercase py-3 border-b border-gray-200 items-center">
                    <div className="flex items-center justify-center">
                        <input checked={checkedALl} onChange={handleCheckBoxALl} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                    </div>
                    {hideShowHeader ? (
                        <div className="col-span-5 flex items-center pr-4">
                            <Tippy
                                interactive
                                onShow={() => sethideIconUp(!hideIconUp)}
                                onHidden={() => sethideIconUp(!hideIconUp)}
                                placement="bottom-start"
                                render={(attrs) => (
                                    <div className="bg-white w-52 shadow-lg border border-gray-100 rounded-md py-1 z-10" tabIndex="-1" {...attrs}>
                                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-red-600 font-medium text-sm transition-colors">
                                            <button onClick={() => setIsModalOpen(true)} className="w-full text-left">Xóa khách hàng</button>
                                        </div>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <div className={`px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium text-sm transition-colors ${countCoustomerChecked > 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}>
                                            <Link
                                                to={`/customers/` + customers.filter((customer) => customer.checked)[0]?.username}
                                                className="w-full block"
                                            >
                                                <button className="w-full text-left">Chỉnh sửa khách hàng</button>
                                            </Link>
                                        </div>
                                        <div className="border-t border-gray-100 my-1"></div>
                                        <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 font-medium text-sm transition-colors">
                                            <button className="w-full text-left">Đặt lại mật khẩu</button>
                                        </div>
                                    </div>
                                )}
                            >
                                <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-200 ml-2">
                                    <span className="text-sm font-medium normal-case">Đã chọn ({countCoustomerChecked}) khách hàng</span>
                                    {!hideIconUp && <RiArrowUpSFill className="w-5 h-5"/>}
                                    {hideIconUp && <RiArrowDownSFill className="w-5 h-5"/>}
                                </div>
                            </Tippy>
                        </div>
                    ) : (
                        <>
                            <strong className="px-2 truncate tracking-wide">Họ tên</strong>
                            <strong className="px-2 truncate tracking-wide">Email</strong>
                            <strong className="px-2 truncate tracking-wide">Tên đăng nhập</strong>
                            <strong className="px-2 truncate tracking-wide">Tour hiện tại</strong>
                            <strong className="px-3 truncate tracking-wide text-right">Tổng chi tiêu</strong>
                        </>
                    )}
                </div>
                
                <div className="divide-y divide-gray-100 pb-1">
                    {customers.length === 0 ? (
                       <div className="p-8 text-center text-gray-500 font-medium">Không có khách hàng nào</div>
                    ) : (
                       customers.map((customer, key) => (
                           <Customeritem key={key} data={customer} onChangeCheckBox={handleChangCheckBox} />
                       ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListCustomer;
