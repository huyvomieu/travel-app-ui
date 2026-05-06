import PropTypes from 'prop-types';
import { ChevronLeft, Save, User, Mail, Lock, Phone, Image as ImageIcon, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { postPutCustomer } from '../../services/CustomerService';
import Button from '../../components/Button';
import Alert from '../Alert';

const initialForm = {
    name: '',
    email: '',
    username: '',
    phone: '',
    password: '111111',
    avatar: '',
    guide: false,
};

function BoxCustomer({ title, btnPrimaryName, type, data }) {
    const [form, setForm] = useState(initialForm);
    const [alert, setAlert] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (type !== 'edit') {
            setForm(initialForm);
            return;
        }

        setForm({
            name: data?.name ?? '',
            email: data?.email ?? '',
            username: data?.username ?? data?.key ?? '',
            phone: data?.phone ?? '',
            password: data?.password ?? '',
            avatar: data?.avatar ?? '',
            guide: Boolean(data?.guide),
        });
    }, [data, type]);

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        if (!form.name.trim() || !form.email.trim() || !form.username.trim()) {
            return 'Vui lòng nhập họ tên, email và tên đăng nhập';
        }

        if (type === 'add' && !form.password.trim()) {
            return 'Vui lòng nhập mật khẩu';
        }

        return '';
    };

    async function handleSubmit() {
        const errorMessage = validateForm();
        if (errorMessage) {
            setAlert({ type: 'danger', message: errorMessage });
            return;
        }

        const payload = {
            ...form,
            name: form.name.trim(),
            email: form.email.trim(),
            username: form.username.trim(),
            phone: form.phone.trim(),
            avatar: form.avatar.trim(),
            cartId: form.username.trim(),
        };

        if (type === 'edit' && !payload.password) {
            delete payload.password;
        }

        setSubmitting(true);
        setAlert(null);

        try {
            const res = await postPutCustomer(payload, type === 'edit' ? 'PUT' : 'POST');
            if (res.status === 201) {
                setForm(initialForm);
                setAlert({ type: 'success', message: 'Thêm khách hàng thành công' });
                return;
            }

            if (res.status === 200) {
                setAlert({ type: 'success', message: 'Cập nhật khách hàng thành công' });
                return;
            }

            setAlert({ type: 'danger', message: 'Lưu khách hàng thất bại' });
        } catch (error) {
            setAlert({
                type: 'danger',
                message: error.response?.data?.error || error.response?.data?.message || 'Lưu khách hàng thất bại',
            });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-[calc(100vh-4rem)] w-full">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <Link to="/customers" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium mb-4">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Quay lại danh sách
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        {type === 'edit' ? 'Cập nhật thông tin và quyền hạn của khách hàng.' : 'Điền các thông tin dưới đây để tạo tài khoản mới cho khách hàng.'}
                    </p>
                </div>

                {alert?.type === 'success' && <Alert success content={alert.message} handleClose={() => setAlert(null)} />}
                {alert?.type === 'danger' && <Alert danger content={alert.message} handleClose={() => setAlert(null)} />}

                <div className="space-y-8 mt-6">
                    {/* Section 1: Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-semibold text-slate-900">Thông tin chung</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Những thông tin cơ bản để định danh người dùng trên hệ thống.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            type="text"
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ảnh đại diện (URL)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <ImageIcon className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.avatar}
                                            onChange={(e) => updateField('avatar', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            type="url"
                                            placeholder="https://example.com/avatar.jpg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.email}
                                            onChange={(e) => updateField('email', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            type="email"
                                            placeholder="example@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.phone}
                                            onChange={(e) => updateField('phone', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            type="tel"
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-slate-200" />

                    {/* Section 2: Security & Permissions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-lg font-semibold text-slate-900">Bảo mật & Phân quyền</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Quản lý tài khoản đăng nhập và cấp quyền hạn đặc biệt.
                            </p>
                        </div>
                        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tên đăng nhập</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.username}
                                            disabled={type === 'edit'}
                                            onChange={(e) => updateField('username', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed disabled:border-slate-200"
                                            type="text"
                                            placeholder="Nhập tên đăng nhập"
                                        />
                                    </div>
                                    {type === 'edit' && <p className="text-xs text-amber-600 mt-2 font-medium">Không thể thay đổi tên đăng nhập.</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            value={form.password}
                                            onChange={(e) => updateField('password', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                            type="password"
                                            placeholder={type === 'edit' ? 'Để trống nếu không đổi' : 'Nhập mật khẩu'}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 mt-4">
                                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className="relative flex items-center justify-center mt-1">
                                            <input
                                                checked={form.guide}
                                                onChange={(e) => updateField('guide', e.target.checked)}
                                                type="checkbox"
                                                className="peer sr-only"
                                                id="guide-toggle"
                                            />
                                            <label htmlFor="guide-toggle" className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors cursor-pointer relative block">
                                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                                            </label>
                                        </div>
                                        <div className="cursor-pointer select-none" onClick={() => updateField('guide', !form.guide)}>
                                            <span className="block text-sm font-bold text-slate-800">Quyền Hướng dẫn viên</span>
                                            <span className="block text-sm text-slate-500 mt-1">Bật công tắc này nếu người dùng được phép dẫn tour.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-6 mt-8">
                        <button 
                            type="button" 
                            onClick={() => navigate('/customers')}
                            className="px-6 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-200 transition-colors"
                        >
                            Hủy bỏ
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSubmit} 
                            disabled={submitting}
                            className="flex items-center gap-2 px-8 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <Save className="w-5 h-5" />
                            {submitting ? 'Đang xử lý...' : btnPrimaryName}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

BoxCustomer.propTypes = {
    title: PropTypes.string.isRequired,
    btnPrimaryName: PropTypes.string.isRequired,
    type: PropTypes.string,
    data: PropTypes.object,
};

export default BoxCustomer;
