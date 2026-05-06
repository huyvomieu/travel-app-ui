import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, Pencil, AlertCircle } from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import CustomerItem from './CustomerItem';
import { deleteCustomer, getCustomer } from '../../../services/CustomerService';
import { Link } from 'react-router-dom';
import Modal from '../../../components/Modal';
import Alert from '../../../components/Alert';

function ListCustomer() {
    const [hideIconUp, setHideIconUp] = useState(true);
    const [customers, setCustomers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const selectedCustomers = useMemo(() => customers.filter((customer) => customer.checked), [customers]);
    const selectedCount = selectedCustomers.length;
    const checkedAll = customers.length > 0 && selectedCount === customers.length;
    const selectedUser = selectedCustomers[0];

    const fetchCustomers = useCallback(async () => {
        setLoading(true);
        setAlert(null);

        try {
            const customersData = await getCustomer();
            setCustomers((customersData || []).map((customer) => ({ ...customer, checked: false })));
        } catch (error) {
            setAlert({ type: 'danger', message: error.response?.data?.error || 'Không thể tải danh sách khách hàng' });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    function handleCheckBoxAll(e) {
        const checked = e.target.checked;
        setCustomers((prev) => prev.map((customer) => ({ ...customer, checked })));
    }

    function handleChangeCheckBox(value, key) {
        setCustomers((prev) => prev.map((customer) => (customer.key === key ? { ...customer, checked: value } : customer)));
    }

    async function handleConfirmDelete() {
        const selectedIds = userToDelete ? [userToDelete] : selectedCustomers.map((customer) => customer.key);

        try {
            const res = await deleteCustomer(selectedIds);
            if (res.status === 200) {
                setIsModalOpen(false);
                setUserToDelete(null);
                await fetchCustomers();
                setAlert({ type: 'success', message: 'Xóa khách hàng thành công' });
                return;
            }

            throw new Error('Error Delete');
        } catch (error) {
            setAlert({ type: 'danger', message: error.response?.data?.error || 'Xóa khách hàng thất bại' });
        }
    }

    function triggerDeleteModal(id = null) {
        setUserToDelete(id);
        setIsModalOpen(true);
    }

    return (
        <div className="w-full relative">
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-4">
               {alert?.type === 'success' && <Alert success content={alert.message} handleClose={() => setAlert(null)} />}
               {alert?.type === 'danger' && <Alert danger content={alert.message} handleClose={() => setAlert(null)} />}
            </div>

            {isModalOpen && (
                <Modal
                    title={userToDelete ? 'Bạn có chắc chắn muốn xóa khách hàng này?' : `Bạn có chắc chắn muốn xóa ${selectedCount} khách hàng?`}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setUserToDelete(null);
                    }}
                    onConfirm={handleConfirmDelete}
                />
            )}

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm uppercase tracking-wider">
                            <th className="py-4 pl-6 pr-3 w-12">
                                <div className="flex items-center justify-center">
                                    <input 
                                        checked={checkedAll} 
                                        onChange={handleCheckBoxAll} 
                                        type="checkbox" 
                                        className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-colors" 
                                    />
                                </div>
                            </th>
                            {selectedCount > 0 ? (
                                <th colSpan="5" className="py-2 pr-6 font-medium normal-case">
                                    <div className="flex items-center">
                                        <Tippy
                                            interactive
                                            onShow={() => setHideIconUp(false)}
                                            onHidden={() => setHideIconUp(true)}
                                            placement="bottom-start"
                                            render={(attrs) => (
                                                <div className="bg-white min-w-[200px] shadow-xl border border-slate-100 rounded-xl py-2 z-10 animate-in fade-in zoom-in duration-200" tabIndex="-1" {...attrs}>
                                                    <button 
                                                        onClick={() => triggerDeleteModal()} 
                                                        className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 font-medium text-sm transition-colors flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Xóa {selectedCount} khách hàng
                                                    </button>
                                                    
                                                    <div className="border-t border-slate-100 my-1"></div>
                                                    
                                                    <div className={`px-2 ${selectedCount > 1 ? 'opacity-50 pointer-events-none' : ''}`}>
                                                        <Link 
                                                            to={`/customers/${selectedUser?.key}`} 
                                                            className="w-full block px-2 py-2.5 hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors rounded-lg flex items-center gap-2"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                            Chỉnh sửa khách hàng
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        >
                                            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 transition-all duration-200 shadow-sm">
                                                <span className="text-sm font-semibold">Đã chọn ({selectedCount})</span>
                                                {hideIconUp ? <ChevronDown className="w-4 h-4"/> : <ChevronUp className="w-4 h-4"/>}
                                            </div>
                                        </Tippy>
                                    </div>
                                </th>
                            ) : (
                                <>
                                    <th className="py-4 px-3 font-semibold">Khách hàng</th>
                                    <th className="py-4 px-3 font-semibold hidden md:table-cell">Tên đăng nhập</th>
                                    <th className="py-4 px-3 font-semibold hidden lg:table-cell">Số điện thoại</th>
                                    <th className="py-4 px-3 font-semibold">Vai trò</th>
                                    <th className="py-4 pr-6 pl-3 font-semibold text-right">Thao tác</th>
                                </>
                            )}
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                        <p>Đang tải dữ liệu...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : customers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-16 text-center text-slate-500 font-medium">
                                    <div className="flex flex-col items-center justify-center gap-3">
                                        <AlertCircle className="w-12 h-12 text-slate-300" />
                                        <p className="text-lg text-slate-600">Không có khách hàng nào</p>
                                        <p className="text-sm text-slate-400">Hãy thêm khách hàng mới để quản lý tại đây.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                           customers.map((customer) => (
                               <CustomerItem key={customer.key} data={customer} onChangeCheckBox={handleChangeCheckBox} onDelete={() => triggerDeleteModal(customer.key)} />
                           ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListCustomer;
