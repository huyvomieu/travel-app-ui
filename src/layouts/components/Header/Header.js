import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { IoIosNotificationsOutline } from 'react-icons/io';
import images from '../../../assets/images';
import Input from '../../../components/ui/Input';
import Button from '../../../components/Button';
import { useAuth } from '../../../components/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getDeleteItem } from '../../../services/ItemService';
import { getDeleteCategory } from '../../../services/CategoryService';
import { getOrder } from '../../../services/OrderService';
import useDebounce from '../../../hooks/useDebounce';

const cx = classNames.bind(styles);

function Header() {
    const { info } = useAuth();
    const { fullname, email } = info();

    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState({ tours: [], categories: [], orders: [] });
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const wrapperRef = useRef(null);

    const debouncedSearch = useDebounce(searchTerm, 400);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Gọi API khi từ khóa thay đổi
    useEffect(() => {
        if (!debouncedSearch.trim()) {
            setResults({ tours: [], categories: [], orders: [] });
            setShowDropdown(false);
            return;
        }
        const fetchSearch = async () => {
            setIsSearching(true);
            try {
                const [toursRes, categoriesRes, ordersRes] = await Promise.allSettled([
                    getDeleteItem(null, 'GET', 1, { q: debouncedSearch }),
                    getDeleteCategory(null, 'GET', { q: debouncedSearch }),
                    getOrder(null, 'GET', { q: debouncedSearch }),
                ]);

                const tours = toursRes.status === 'fulfilled' ? (toursRes.value?.data || []).slice(0, 3) : [];
                const categories = categoriesRes.status === 'fulfilled' ? (Array.isArray(categoriesRes.value) ? categoriesRes.value : []).slice(0, 3) : [];
                const orders = ordersRes.status === 'fulfilled' ? (Array.isArray(ordersRes.value) ? ordersRes.value : []).slice(0, 3) : [];

                setResults({ tours, categories, orders });
                setShowDropdown(true);
            } catch (e) {
                console.log(e);
            } finally {
                setIsSearching(false);
            }
        };
        fetchSearch();
    }, [debouncedSearch]);

    const hasResults = results.tours.length > 0 || results.categories.length > 0 || results.orders.length > 0;

    const handleResultClick = (path) => {
        navigate(path);
        setShowDropdown(false);
        setSearchTerm('');
    };

    const action = location.pathname.split('/')[1];
    let title;
    switch (action) {
        case '':
            title = 'Tổng quan';
            break;
        case 'category':
            title = 'Danh mục';
            break;
        case 'customers':
            title = 'Khách hàng';
            break;
        case 'report':
            title = 'Phân tích - Báo cáo';
            break;
        case 'order':
            title = 'Đơn hàng';
            break;
        case 'settings':
            title = 'Cài đặt';
            break;
        default:
            title = 'Tổng quan';
    }
    return (
        <header className={cx('wrapper', 'hide-on-print')}>
            <div className={cx('inner')}>
                <h1 className={cx('title')}>{title}</h1>
                <div className={cx('right-header')}>
                    <div className={cx('search-container')} ref={wrapperRef}>
                        <Input
                            placeholder="Tìm kiếm tour, danh mục, đơn hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => { if (hasResults) setShowDropdown(true); }}
                        />
                        {showDropdown && (
                            <div className={cx('search-dropdown')}>
                                {isSearching && (
                                    <div className={cx('search-loading')}>Đang tìm kiếm...</div>
                                )}
                                {!isSearching && !hasResults && debouncedSearch && (
                                    <div className={cx('search-empty')}>Không tìm thấy kết quả</div>
                                )}

                                {results.tours.length > 0 && (
                                    <div className={cx('search-group')}>
                                        <div className={cx('search-group-title')}>Tour</div>
                                        {results.tours.map((tour) => (
                                            <div
                                                key={tour.key}
                                                className={cx('search-item')}
                                                onClick={() => handleResultClick(`/items/${tour.key}`)}
                                            >
                                                <img src={tour.pic} alt={tour.title} className={cx('search-item-img')} />
                                                <div className={cx('search-item-info')}>
                                                    <div className={cx('search-item-name')}>{tour.title}</div>
                                                    <div className={cx('search-item-sub')}>{tour.price?.toLocaleString('vi-VN')} VND</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.categories.length > 0 && (
                                    <div className={cx('search-group')}>
                                        <div className={cx('search-group-title')}>Danh mục</div>
                                        {results.categories.map((cat) => (
                                            <div
                                                key={cat.key}
                                                className={cx('search-item')}
                                                onClick={() => handleResultClick(`/category/${cat.key}`)}
                                            >
                                                <img src={cat.ImagePath} alt={cat.Name} className={cx('search-item-img')} />
                                                <div className={cx('search-item-info')}>
                                                    <div className={cx('search-item-name')}>{cat.Name}</div>
                                                    <div className={cx('search-item-sub')}>{cat.Description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {results.orders.length > 0 && (
                                    <div className={cx('search-group')}>
                                        <div className={cx('search-group-title')}>Đơn hàng</div>
                                        {results.orders.map((order) => (
                                            <div
                                                key={order.key}
                                                className={cx('search-item')}
                                                onClick={() => handleResultClick(`/order/${order.key}`)}
                                            >
                                                <div className={cx('search-item-info')}>
                                                    <div className={cx('search-item-name')}>#{order.orderId}</div>
                                                    <div className={cx('search-item-sub')}>{order.userInfo?.name} · {order.total?.toLocaleString('vi-VN')} VND</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <Button className={cx('notiffi-icon')}>
                        <IoIosNotificationsOutline />
                    </Button>

                    <div className={cx('profile')}>
                        <img className={cx('avatar')} src={images.user} alt="user" />
                        <div className={cx('profile-content')}>
                            <p className={cx('username')}>{fullname}</p>
                            <p className={cx('email')}>{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
