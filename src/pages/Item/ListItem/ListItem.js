import classNames from 'classnames';
import { getDeleteItem } from '../../../services/ItemService';
import { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import { useLoading } from '../../../components/context/LoadingContext';
import { useNavigate } from 'react-router-dom';
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

function Item() {
    const [tours, setTours] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean);

    const { setLoading } = useLoading();
    const navigate = useNavigate();

    // Call API khi mount
    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true);
            try {
                const res = await getDeleteItem();
                setTours(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }, []);

    // Khi tours thay đổi, cập nhật checkedItems
    useEffect(() => {
        const newChecked = {};
        tours.forEach((tour) => {
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
        const newCheckedItem = {};
        tours.forEach((item) => {
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
    return (
        <div className="mt-8 mr-8">
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
                            <Select className="" defaultValue="all">
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Lọc theo trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả Tour</SelectItem>
                                    <SelectItem value="show">Tour hiển thị</SelectItem>
                                    <SelectItem value="hide">Tour ẩn</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest">
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
                                                <TableHead></TableHead>
                                                <TableHead>
                                                    <Button className="p-2 border border-solid border-[#e5e5e5]">
                                                        Sửa tour
                                                    </Button>
                                                    <Button className="p-2 border border-solid border-[#e5e5e5]">
                                                        Xóa tour
                                                    </Button>
                                                </TableHead>
                                                <TableHead></TableHead>
                                                <TableHead></TableHead>
                                                <TableHead></TableHead>
                                            </>
                                        ) : (
                                            <>
                                                <TableHead>Ảnh</TableHead>
                                                <TableHead>Tên Tour</TableHead>
                                                <TableHead>Thời gian</TableHead>
                                                <TableHead>Giá</TableHead>
                                                <TableHead>Giường</TableHead>
                                                <TableHead>Trạng thái</TableHead>
                                            </>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tours.map((data) => {
                                        return (
                                            <TableRow key={data.key} onClick={(e) => handleClickRow(e, data)}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        name={data.key}
                                                        onChange={handleItemChange}
                                                        checked={checkedItems[data.key]}
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
                                                        className={classNames('p-2 rounded-full', {
                                                            'bg-green-400': data.status,
                                                            'bg-red-400': !data.status,
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
                                        <TableCell colSpan="7" className="flex w-full justify-center">
                                            <Button>Trước</Button>
                                            <Button>Sau</Button>
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
