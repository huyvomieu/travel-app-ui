import Button from '../../components/Button';
import ListCustomer from './ListCustomer/ListCustomer';

function Customer() {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto rounded-xl shadow-sm border border-gray-200 p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh sách khách hàng</h1>
                    <div>
                        <Button to="/customers/create" primary className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                            Thêm khách hàng
                        </Button>
                    </div>
                </div>
                <ListCustomer />
            </div>
        </div>
    );
}

export default Customer;
