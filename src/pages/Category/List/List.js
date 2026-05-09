import { getDeleteCategory } from '../../../services/CategoryService';
import classNames from 'classnames';
import { useEffect, useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import { useLoading } from '../../../components/context/LoadingContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../../components/Modal';
import Alert from '../../../components/Alert';
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from '../../../components/ui/Table/Table';
import { CardTitle } from '../../../components/ui/Card/Card';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '../../../components/ui/Filter/Select';
function List() {
    const [categories, setCategories] = useState([]);
    const { setLoading } = useLoading();
    const [checkedItems, setCheckedItems] = useState({});
    
    const [searchParams] = useSearchParams();
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('newest');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    const q = searchParams.get('q') || '';

    const processedCategories = useMemo(() => {
        let result = [...categories];
        if (q) {
            const lowerQ = q.toLowerCase();
            result = result.filter(c => c.Name?.toLowerCase().includes(lowerQ) || c.Description?.toLowerCase().includes(lowerQ));
        }
        if (statusFilter === 'show') {
            result = result.filter(c => c.status === 1);
        } else if (statusFilter === 'hide') {
            result = result.filter(c => c.status === 0);
        }
        if (sortFilter === 'newest') {
            result.reverse();
        }
        return result;
    }, [categories, q, statusFilter, sortFilter]);

    const allChecked = processedCategories.length > 0 && processedCategories.every(c => checkedItems[c.key]);
    const someChecked = processedCategories.some(c => checkedItems[c.key]);

    const navigate = useNavigate();

    const fetchAPI = async () => {
        setLoading(true);
        try {
            const res = await getDeleteCategory();
            setCategories(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    // Khi categories thay đổi, cập nhật checkedItems
    useEffect(() => {
        const newChecked = {};
        categories.forEach((tour) => {
            newChecked[tour.key] = false;
        });
        setCheckedItems(newChecked);
    }, [categories]);
    const handleClickRow = (e, data) => {
        if (e.target.type === 'checkbox') {
            // e.preventDefault();
        } else {
            navigate(`/category/${data.key}`);
        }
    };
    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        const newCheckedItem = { ...checkedItems };
        processedCategories.forEach((item) => {
            newCheckedItem[item.key] = checked;
        });
        setCheckedItems(newCheckedItem);
    };

    const handleItemChange = (e) => {
        const { name, checked } = e.target;
        setCheckedItems((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleEditSelected = () => {
        const selectedKey = processedCategories.find(c => checkedItems[c.key])?.key;
        if (selectedKey) navigate(`/category/${selectedKey}`);
    };

    const handleConfirmDelete = async () => {
        const selectedIds = processedCategories.filter(c => checkedItems[c.key]).map(c => c.key);
        try {
            setLoading(true);
            for (const id of selectedIds) {
                await getDeleteCategory(id, 'DELETE');
            }
            setAlert({ type: 'success', message: 'Xóa danh mục thành công' });
            setIsModalOpen(false);
            setCheckedItems({});
            fetchAPI();
            setTimeout(() => setAlert(null), 3000);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Xóa danh mục thất bại' });
            setTimeout(() => setAlert(null), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-2 mr-8 relative">
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-4">
               {alert?.type === 'success' && <Alert success content={alert.message} handleClose={() => setAlert(null)} />}
               {alert?.type === 'danger' && <Alert danger content={alert.message} handleClose={() => setAlert(null)} />}
            </div>

            {isModalOpen && (
                <Modal
                    title={`Bạn có chắc chắn muốn xóa ${processedCategories.filter(c => checkedItems[c.key]).length} danh mục?`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
            <div className="">
                <div className="flex justify-end mb-4">
                    <Button to="/category/create" primary>
                        Tạo mới danh mục
                    </Button>
                </div>
                <div className="bg-white shadow-sm">
                    <div className="p-8">
                        <div>
                            <CardTitle>Tất cả danh mục</CardTitle>
                        </div>
                        <div className="p-6 flex items-center gap-4 mb-4">
                            <Select defaultValue="all" onValueChange={(val) => setStatusFilter(val)}>
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Lọc theo trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                                    <SelectItem value="show">Danh mục hiển thị</SelectItem>
                                    <SelectItem value="hide">Danh mục ẩn</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest" onValueChange={(val) => setSortFilter(val)}>
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Danh mục mới nhất</SelectItem>
                                    <SelectItem value="oldest">Danh mục cũ nhất</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            <input type="checkbox" onChange={handleCheckAll} checked={allChecked} />
                                        </TableHead>
                                        {someChecked ? (
                                            <>
                                                <TableHead colSpan="4">
                                                    <div className="flex gap-4">
                                                        <Button onClick={handleEditSelected} className="p-2 border border-solid border-[#e5e5e5]">
                                                            Sửa danh mục
                                                        </Button>
                                                        <Button onClick={() => setIsModalOpen(true)} className="p-2 border border-solid border-[#e5e5e5]">
                                                            Xóa danh mục
                                                        </Button>
                                                    </div>
                                                </TableHead>
                                            </>
                                        ) : (
                                            <>
                                                <TableHead>Ảnh</TableHead>
                                                <TableHead>Tên Danh mục</TableHead>
                                                <TableHead>Mô tả</TableHead>
                                                <TableHead>Trạng thái</TableHead>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {processedCategories.map((data) => {
                                        return (
                                            <TableRow onClick={(e) => handleClickRow(e, data)} key={data.key}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleItemChange}
                                                        name={data.key}
                                                        checked={checkedItems[data.key] || false}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img
                                                        className="object-cover w-16 h-16"
                                                        src={data.ImagePath}
                                                        alt={data.Name}
                                                    />
                                                </TableCell>
                                                <TableCell>{data.Name}</TableCell>
                                                <TableCell>{data.Description}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={classNames('min-w-4 px-3 py-2 rounded-full', {
                                                            'bg-[#d4edda]': data.status,
                                                            'text-[#155724]': data.status,
                                                            'bg-[#f8d7da]': !data.status,
                                                            'text-[#721c24]': !data.status,
                                                        })}
                                                    >
                                                        {data.status === 1 ? 'Hiển thị' : 'Ẩn'}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter></TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default List;
