import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as Avatar from '@radix-ui/react-avatar';
import { Pencil, Trash2 } from 'lucide-react';

function CustomerItem({ data, onChangeCheckBox, onDelete }) {
    const navigate = useNavigate();

    function handleChange(e) {
        onChangeCheckBox(e.target.checked, data.key);
    }

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="py-4 pl-6 pr-3 w-12 border-b border-transparent">
                <div className="flex items-center justify-center">
                    <input 
                        type="checkbox" 
                        onChange={handleChange} 
                        checked={Boolean(data.checked)} 
                        className="w-4 h-4 text-blue-600 bg-white border-slate-300 rounded focus:ring-blue-500 cursor-pointer transition-colors" 
                    />
                </div>
            </td>
            <td className="py-4 px-3">
                <div className="flex items-center gap-4">
                    <Avatar.Root className="inline-flex h-10 w-10 shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-blue-100 border border-blue-200">
                        <Avatar.Image
                            className="h-full w-full object-cover"
                            src={data.avatar || ''}
                            alt={data.name}
                        />
                        <Avatar.Fallback
                            className="text-blue-700 font-medium text-sm leading-none"
                            delayMs={600}
                        >
                            {getInitials(data.name)}
                        </Avatar.Fallback>
                    </Avatar.Root>
                    <div className="flex flex-col">
                        <span className="text-slate-900 font-medium text-sm truncate max-w-[200px]">{data.name}</span>
                        <span className="text-slate-500 text-sm truncate max-w-[200px]">{data.email}</span>
                    </div>
                </div>
            </td>
            <td className="py-4 px-3 hidden md:table-cell">
                <span className="text-slate-600 text-sm">{data.username}</span>
            </td>
            <td className="py-4 px-3 hidden lg:table-cell">
                <span className="text-slate-600 text-sm">{data.phone || 'Chưa cập nhật'}</span>
            </td>
            <td className="py-4 px-3">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${data.guide ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                    {data.guide ? 'Hướng dẫn viên' : 'Khách hàng'}
                </span>
            </td>
            <td className="py-4 pr-6 pl-3 text-right">
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => navigate(`/customers/${data.key}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={onDelete}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa khách hàng"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
}

CustomerItem.propTypes = {
    data: PropTypes.object,
    onChangeCheckBox: PropTypes.func,
    onDelete: PropTypes.func,
};

export default CustomerItem;
