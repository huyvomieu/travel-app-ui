import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Customeritem({ data, onChangeCheckBox }) {
    function handleChange(e) {
        onChangeCheckBox(e.target.checked, data.id);
        data.checked = e.target.checked;
    }
    return (
        <Link
            to={`/customers/${data.username}`}
            onClick={(e) => {
                if (e.target.type === 'checkbox') {
                    e.preventDefault();
                }
            }}
            className="block hover:bg-blue-50 transition-colors duration-150 group"
        >
            <div className="grid grid-cols-[50px_2.5fr_2.5fr_1.5fr_1.5fr_1.5fr] items-center py-4 border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-center">
                    <input type="checkbox" onChange={handleChange} checked={data.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" />
                </div>
                <span className="px-2 text-gray-800 font-medium truncate">{data.name}</span>
                <span className="px-2 text-gray-600 truncate">{data.email}</span>
                <span className="px-2 text-gray-600 truncate">{data.username}</span>
                <span className="px-2 text-blue-600 font-medium truncate"></span>
                <span className="px-3 text-gray-800 font-semibold text-right"></span>
            </div>
        </Link>
    );
}

Customeritem.propTypes = {
    data: PropTypes.object,
};

export default Customeritem;
