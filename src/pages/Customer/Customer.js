import { Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import ListCustomer from './ListCustomer/ListCustomer';

function Customer() {
    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-[calc(100vh-4rem)]">
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Quản lý khách hàng</h1>
                            <p className="text-sm text-slate-500 mt-1">Quản lý tài khoản, phân quyền và thông tin người dùng</p>
                        </div>
                    </div>
                    <div>
                        <Link 
                            to="/customers/create" 
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-200 shadow-sm hover:shadow active:scale-95"
                        >
                            <Plus className="w-5 h-5" />
                            Thêm khách hàng
                        </Link>
                    </div>
                </div>
                
                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <ListCustomer />
                </div>
            </div>
        </div>
    );
}

export default Customer;
