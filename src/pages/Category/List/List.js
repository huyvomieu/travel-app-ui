import { getDeleteCategory } from '../../../services/CategoryService';
import classNames from 'classnames';
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
function List() {
    const [categories, setCategories] = useState([]);
    const { setLoading } = useLoading();
    const [checkedItems, setCheckedItems] = useState({});

    const allChecked = Object.values(checkedItems).every(Boolean);
    const someChecked = Object.values(checkedItems).some(Boolean);

    const navigate = useNavigate();
    useEffect(() => {
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
        const newCheckedItem = {};
        categories.forEach((item) => {
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
                            <Select className="" defaultValue="all">
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Lọc theo trạng thái" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tất cả danh mục</SelectItem>
                                    <SelectItem value="show">Danh mục hiển thị</SelectItem>
                                    <SelectItem value="hide">Danh mục ẩn</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="newest">
                                <SelectTrigger className="w-[180px] h-16 border border-solid border-[#e5e5e5]">
                                    <SelectValue placeholder="Sắp xếp theo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Danh mục mới nhất</SelectItem>
                                    <SelectItem value="oldest">Danh mục cũ nhất</SelectItem>
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
                                        <TableHead>Ảnh</TableHead>
                                        <TableHead>Tên Danh mục</TableHead>
                                        <TableHead>Mô tả</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((data) => {
                                        return (
                                            <TableRow onClick={(e) => handleClickRow(e, data)} key={data.key}>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleItemChange}
                                                        name={data.key}
                                                        checked={checkedItems[data.key]}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <img
                                                        className="object-cover w-16 h-16"
                                                        src={data.ImagePath}
                                                        alt="Hà nội"
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
                                                        {data.status === 1 && 'Hiển thị'}
                                                        {data.status === 0 && 'Ẩn'}
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
