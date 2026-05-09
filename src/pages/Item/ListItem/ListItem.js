import classNames from 'classnames';
import { getDeleteItem } from '../../../services/ItemService';
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
import useQuery from '../../../hooks/useQuery';

function Item() {
    const [data, setData] = useState({});
    const [checkedItems, setCheckedItems] = useState({});

    const meta = data.meta;
    const tours = data.data;

    const totalPage = meta?.pagination?.total_page;
    const currentPage = meta?.pagination?.current_page;

    const [searchParams] = useSearchParams();
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('newest');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alert, setAlert] = useState(null);

    const q = searchParams.get('q') || '';
    
    // Client-side filter and sort
    const processedTours = useMemo(() => {
        if (!tours) return [];
        let result = [...tours];
        if (q) {
            const lowerQ = q.toLowerCase();
            result = result.filter(c => c.title?.toLowerCase().includes(lowerQ));
        }
        if (statusFilter === 'show') {
            result = result.filter(c => c.status === 1);
        } else if (statusFilter === 'hide') {
            result = result.filter(c => c.status === 0);
        }
        if (sortFilter === 'newest') {
            result.reverse();
        } else if (sortFilter === 'highest') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortFilter === 'lowest') {
            result.sort((a, b) => a.price - b.price);
        }
        return result;
    }, [tours, q, statusFilter, sortFilter]);

    const allChecked = processedTours.length > 0 && processedTours.every(c => checkedItems[c.key]);
    const someChecked = processedTours.some(c => checkedItems[c.key]);

    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page');

    const fetchAPI = async () => {
        setLoading(true);
        try {
            const res = await getDeleteItem(null, 'GET', page ?? 1);
            setData(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, [page]);


    // Khi tours thay đổi, cập nhật checkedItems
    useEffect(() => {
        const newChecked = {};
        tours?.forEach((tour) => {
            newChecked[tour.key] = false;
        });
        setCheckedItems(newChecked);
    }, [tours]);
    const handleClickRow = (e, data) => {
        if (e.target.type === 'checkbox') {
            // e.preventDefault();
        } else {
            navigate(`/items/${data.key}`);
        }
    };

    const handleCheckAll = (e) => {
        const checked = e.target.checked;
        const newCheckedItem = { ...checkedItems };
        processedTours.forEach((item) => {
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
        const selectedKey = processedTours.find(c => checkedItems[c.key])?.key;
        if (selectedKey) navigate(`/items/${selectedKey}`);
    };

    const handleConfirmDelete = async () => {
        const selectedIds = processedTours.filter(c => checkedItems[c.key]).map(c => c.key);
        try {
            setLoading(true);
            for (const id of selectedIds) {
                await getDeleteItem(id, 'DELETE');
            }
            setAlert({ type: 'success', message: 'Xóa Tour thành công' });
            setIsModalOpen(false);
            setCheckedItems({});
            fetchAPI();
            setTimeout(() => setAlert(null), 3000);
        } catch (error) {
            setAlert({ type: 'danger', message: 'Xóa Tour thất bại' });
            setTimeout(() => setAlert(null), 3000);
        } finally {
            setLoading(false);
        }
    };
    const handlePrevPage = () => {
        if (Number(page) === 1) return;
        navigate(`/items?page=${Number(page) - 1}`);
    };
    const handleNextPage = () => {
        if (Number(page) === totalPage) return;
        navigate(`/items?page=${Number(page) + 1}`);
    };
    if (loading) return null;
    if (!tours) return null;
    return (
        <div className="mr-8 relative">
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-4">
               {alert?.type === 'success' && <Alert success content={alert.message} handleClose={() => setAlert(null)} />}
               {alert?.type === 'danger' && <Alert danger content={alert.message} handleClose={() => setAlert(null)} />}
            </div>

            {isModalOpen && (
                <Modal
                    title={`Bạn có chắc chắn muốn xóa ${processedTours.filter(c => checkedItems[c.key]).length} Tour?`}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}
            <div className="">
                <div className="flex justify-end mb-4">
                    <Button to="/items/create" primary>
                        Tạo mới Tour
                    </Button>
                </div>
                <div className="bg-white shadow-sm">
                    <div className="p-8">
                        <div>
                            <CardTitle>Tất cả Tour</CardTitle>
                        </div>
                        <div className="p-6 flex items-center gap-4 mb-4">
                            <Select defaultValue="all" onValueChange={(val) => setStatusFilter(val)}>
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Lọc theo trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả Tour</SelectItem>
                                    <SelectItem value="show">Tour hiển thị</SelectItem>
                                    <SelectItem value="hide">Tour ẩn</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest" onValueChange={(val) => setSortFilter(val)}>
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Tour mới nhất</SelectItem>
                                    <SelectItem value="oldest">Tour cũ nhất</SelectItem>
                                    <SelectItem value="highest">Giá lớn nhất</SelectItem>
                                    <SelectItem value="lowest">Giá nhỏ nhất</SelectItem>
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
                                                <TableHead colSpan="6">
                                                    <div className="flex gap-4">
                                                        <Button onClick={handleEditSelected} className="p-2 border border-solid border-[#e5e5e5]">
                                                            Sửa tour
                                                        </Button>
                                                        <Button onClick={() => setIsModalOpen(true)} className="p-2 border border-solid border-[#e5e5e5]">
                                                            Xóa tour
                                                        </Button>
                                                    </div>
                                                </TableHead>
                                            </>
                                        ) : (
                                            <>
                                                <TableHead>Ảnh</TableHead>
                                                <TableHead>Tên Tour</TableHead>
                                                <TableHead>Thời gian đi</TableHead>
                                                <TableHead>Giá/Người</TableHead>
                                                <TableHead>Số người</TableHead>
                                                <TableHead>Trạng thái</TableHead>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {processedTours.map((data) => {
                                        return (
                                            <TableRow key={data.key} onClick={(e) => handleClickRow(e, data)}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        name={data.key}
                                                        onChange={handleItemChange}
                                                        checked={checkedItems[data.key] || false}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img
                                                        className="object-cover w-16 h-16"
                                                        src={data.pic}
                                                        alt="Hà nội"
                                                    />
                                                </TableCell>
                                                <TableCell>{data.title}</TableCell>
                                                <TableCell>{data.timeTour + ' ' + data.dateTour}</TableCell>
                                                <TableCell>{data.price.toLocaleString('vi-VN')} VND</TableCell>
                                                <TableCell>{data.bed}</TableCell>
                                                <TableCell>
                                                    <span
                                                        className={classNames('px-3 py-2 rounded-full', {
                                                            'bg-[#d4edda]': data.status,
                                                            'text-[#155724]': data.status,
                                                            'bg-[#f8d7da]': !data.status,
                                                            'text-[#721c24]': !data.status,
                                                        })}
                                                    >
                                                        {data.status === 1 && 'Hiển thị'}
                                                        {data.status === 0 && 'Không hiển thị'}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan="7">
                                            <div className="flex justify-center">
                                                <Button onClick={handlePrevPage}>Trước</Button>
                                                {new Array(totalPage).fill(null).map((_, i) => (
                                                    <Button
                                                        primary={currentPage === i + 1}
                                                        onClick={() => navigate(`/items?page=${i + 1}`)}
                                                    >
                                                        {i + 1}
                                                    </Button>
                                                ))}
                                                <Button onClick={handleNextPage}>Sau</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
