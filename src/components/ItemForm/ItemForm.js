import classNames from 'classnames/bind';
import styles from './ItemForm.module.scss';
import { useState, useRef, useReducer, useEffect, useContext } from 'react';
import Tippy from '@tippyjs/react/headless';
import { useLoading } from '../../components/context/LoadingContext';

import CardItem from '../Card/CardItem';
import UploadImage from '../UploadImage';
import Alert from '../Alert';
import CardBox from '../Card/CardBox';

import useDebounce from '../../hooks/useDebounce';
import reducer, {
    initState,
    setSearchCategory,
    setListCategory,
    setCategory,
    setTourGuide,
    setData,
    setListTourGuide,
    setSearchTourGuide,
    getData,
    setAlert,
} from '../reducers/itemReducer';
import { postPutItem, getDeleteItem } from '../../services/ItemService';
import { getDeleteCategory } from '../../services/CategoryService';
import { getCustomer } from '../../services/CustomerService';
import { IoCloseOutline } from 'react-icons/io5';

import { ContentScrollContext } from '../context/ContentScrollContext';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import Radio from '../ui/Radio/Radio';
const cx = classNames.bind(styles);

function ItemForm({ type = 'add', id }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const [isValid, setIsValid] = useState({ type: [], message: '' });
    const [tippy, setTippy] = useState(false);
    const [tippyTourGuide, setTippyTourGuide] = useState(false);

    const categorydebounced = useDebounce(state.searchCategory, 500);
    const guidedebounced = useDebounce(state.searchTourGuide, 500);

    const { setLoading } = useLoading();
    const contentRef = useContext(ContentScrollContext);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getDeleteCategory(null, 'GET', {
                    q: categorydebounced,
                    type: ['Id', 'Name'],
                });
                dispatch(setListCategory(res));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categorydebounced]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getCustomer(null, {
                q: guidedebounced,
                type: ['name', 'phone', 'avatar'],
                typeuser: 'guide',
            });
            if (res) {
                dispatch(setListTourGuide(res));
            } else {
                throw new Error('Call API lỗi khi lấy list tour guide');
            }
        };
        fetchData();
    }, [guidedebounced]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                const res = await getDeleteItem(id);

                dispatch(getData(res));
            }
        };
        fetchData();
    }, [id, type]);

    const uploadImageRef = useRef();
    const inputShowRef = useRef();
    const inputHideRef = useRef();
    useEffect(() => {
        const handleInputShowClick = (e) => {
            dispatch(setData(1, 'status'));
        };
        const handleInputHideClick = (e) => {
            dispatch(setData(0, 'status'));
        };
        inputShowRef.current.addEventListener('click', handleInputShowClick);
        inputHideRef.current.addEventListener('click', handleInputHideClick);
        return () => {
            window.removeEventListener('click', handleInputShowClick);
            window.removeEventListener('click', handleInputHideClick);
        };
    }, []);
    function handleClickSave() {
        const keys = Object.keys(state.data).filter((key) => state.data[key] !== 'key' && state.data[key] === '');

        if (keys.length > 2) {
            setIsValid({ type: keys, message: '' });
            handleScrollTop();
            return;
        }

        const fetchAPI = async () => {
            if (type === 'edit') {
                try {
                    setLoading(true);
                    const res = await postPutItem(state.data, 'PUT');
                    if (res.status === 200) {
                        dispatch(setAlert({ active: true, content: 'Cập nhật Tour thành công!' }));
                    } else {
                        dispatch(setAlert({ active: true, content: 'Cập nhật Tour thất bại!' }));
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    handleScrollTop();
                }
            } else {
                try {
                    setLoading(true);
                    const result = await uploadImageRef.current?.getLinkImage();
                    if (result) {
                        state.data.pic = result;
                        const res = await postPutItem(state.data, 'POST');
                        if (res.status === 201) {
                            dispatch(setAlert({ active: true, content: 'Thêm mới Tour thành công!' }));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                            throw new Error(res);
                        }
                    } else {
                        throw new Error('Lỗi tải ảnh lên');
                    }
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    handleScrollTop();
                }
            }
        };
        fetchAPI();
    }

    function handleClickItem(item) {
        dispatch(setCategory(item));
        setTippy(false);
    }

    function handleClickGuide(guide) {
        dispatch(setTourGuide(guide));
        setTippyTourGuide(false);
    }
    function handleConFirmDelete() {
        const fetchAPI = async () => {
            try {
                setLoading(true);
                const res = await getDeleteItem(state.data.key, 'DELETE');
                if (res.status === 200) {
                    dispatch(setAlert({ active: true, content: 'Xóa Tour thành công!' }));
                    handleScrollTop();
                    setTimeout(() => {
                        navigate('/items');
                    }, 2000);
                } else {
                    dispatch(setAlert({ active: true, content: 'Xóa Tour thất bại!, Có lỗi xảy ra!' }));
                }
            } catch (error) {
                dispatch(setAlert({ active: true, content: 'Xóa Tour thất bại!, Có lỗi xảy ra!', danger: true }));
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }

    function handleScrollTop() {
        contentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }

    return (
        <div className={cx('wrapper')}>
            {state.alert && <Alert content={state.alertContent} success />}
            <div className={cx('inner')}>
                <div className={cx('main-layout')}>
                    <div className={cx('main-card')}>
                        <div className={cx('inner')}>
                            <CardItem
                                label={'Tên tour'}
                                state={state.data.title}
                                setState={(value) => {
                                    dispatch(setData(value, 'title'));
                                }}
                            />
                            {isValid.type.includes('title') && (
                                <span className=" text-sm font-normal text-red-400">
                                    Không được bỏ trống trường này
                                </span>
                            )}
                            <CardItem
                                label={'Địa chỉ'}
                                state={state.data.address}
                                setState={(value) => {
                                    dispatch(setData(value, 'address'));
                                }}
                            />
                            {isValid.type.includes('address') && (
                                <span className=" text-sm font-normal text-red-400">
                                    Không được bỏ trống trường này
                                </span>
                            )}
                            <CardItem
                                control="textarea"
                                label={'Mô tả'}
                                rows="10"
                                state={state.data.description}
                                setState={(value) => {
                                    dispatch(setData(value, 'description'));
                                }}
                            />
                            {isValid.type.includes('description') && (
                                <span className=" text-sm font-normal text-red-400">
                                    Không được bỏ trống trường này
                                </span>
                            )}
                            <div className={cx('row')}>
                                <CardItem
                                    type="date"
                                    label={'Ngày tour'}
                                    state={state.data.dateTour}
                                    setState={(value) => {
                                        dispatch(setData(value, 'dateTour'));
                                    }}
                                />

                                <CardItem
                                    type="time"
                                    step="3600"
                                    classNames={cx('col')}
                                    label={'Giờ tour'}
                                    state={state.data.timeTour}
                                    setState={(value) => {
                                        dispatch(setData(value, 'timeTour'));
                                    }}
                                />

                                <CardItem
                                    type="number"
                                    min="0"
                                    max="100"
                                    classNames={cx('col')}
                                    label={'Số giường'}
                                    state={state.data.bed}
                                    setState={(value) => {
                                        dispatch(setData(Number.parseInt(value), 'bed'));
                                    }}
                                />

                                <CardItem
                                    classNames={cx('col')}
                                    label={'Thời gian'}
                                    state={state.data.duration}
                                    setState={(value) => {
                                        dispatch(setData(value, 'duration'));
                                    }}
                                />
                            </div>
                            <div className={cx('row')}>
                                {isValid.type.includes('dateTour') && (
                                    <span className=" text-sm font-normal text-red-400">Không được bỏ trống!</span>
                                )}
                                {isValid.type.includes('bed') && (
                                    <span className=" text-sm font-normal text-red-400">Không được bỏ trống!</span>
                                )}
                                {isValid.type.includes('timeTour') && (
                                    <span className=" text-sm font-normal text-red-400">Không được bỏ trống!</span>
                                )}
                                {isValid.type.includes('duration') && (
                                    <span className=" text-sm font-normal text-red-400">Không được bỏ trống!</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cx('next-card')}>
                        <div className="p-4 bg-white">
                            <div>Trạng thái</div>
                            <Radio ref={inputShowRef}>Hiển thị</Radio>
                            <Radio ref={inputHideRef}>Ẩn</Radio>
                        </div>

                        <CardBox label="Danh mục">
                            <Tippy
                                visible={tippy}
                                interactive
                                placement="bottom-start"
                                onClickOutside={() => setTippy(false)}
                                render={(attrs) => (
                                    <div className={cx('box')} tabIndex="-1" {...attrs}>
                                        <ul className={cx('popper')}>
                                            {state.listCategory.map((item) => (
                                                <li
                                                    key={item.Id}
                                                    className={cx('item')}
                                                    onClick={() => handleClickItem(item)}
                                                >
                                                    {item.Name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            >
                                <CardItem
                                    label={'Chọn danh mục'}
                                    state={state.searchCategory}
                                    setState={(value) => dispatch(setSearchCategory(value))}
                                    onClick={() => setTippy(true)}
                                />
                            </Tippy>
                            {state.categoryName && (
                                <div className={cx('category-choose')}>
                                    <span>{state.categoryName}</span>
                                    <IoCloseOutline onClick={() => dispatch(setCategory(''))} />
                                </div>
                            )}
                        </CardBox>
                        <UploadImage src={state.data.pic} ref={uploadImageRef} className={cx('avatar-card')} />
                    </div>
                </div>
                <div className={cx('row')}>
                    <CardBox label="Giá tour">
                        <CardItem
                            label={'Giá'}
                            state={state.data.price}
                            setState={(value) => {
                                dispatch(setData(Number.parseInt(value), 'price'));
                            }}
                        />
                        {isValid.type.includes('price') && (
                            <span className=" text-sm font-normal text-red-400">Không được bỏ trống trường này</span>
                        )}
                    </CardBox>
                    <CardBox label="Người hướng dẫn tour">
                        <Tippy
                            visible={tippyTourGuide}
                            interactive
                            placement="bottom-start"
                            onClickOutside={() => setTippyTourGuide(false)}
                            render={(attrs) => (
                                <div className={cx('box')} tabIndex="-1" {...attrs}>
                                    <ul className={cx('popper')}>
                                        {state.listTourGuide.map((item) => (
                                            <li
                                                key={item.key}
                                                className={cx('item')}
                                                onClick={() => handleClickGuide(item)}
                                            >
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        >
                            <CardItem
                                label={'Chọn người hướng dẫn'}
                                state={state.searchTourGuide}
                                setState={(value) => dispatch(setSearchTourGuide(value))}
                                onClick={() => setTippyTourGuide(true)}
                            />
                        </Tippy>
                        {state.data.tourGuideId && (
                            <div className={cx('category-choose')}>
                                <span>{state.data.tourGuideName}</span>
                                <IoCloseOutline onClick={() => dispatch(setTourGuide({}))} />
                            </div>
                        )}
                    </CardBox>
                </div>
                <div style={{ marginBottom: '20px' }}></div>
                <div className="flex justify-between items-center ">
                    {type === 'edit' ? (
                        <Button danger onClick={handleConFirmDelete}>
                            Xóa
                        </Button>
                    ) : (
                        <span></span>
                    )}
                    <div className="flex gap-8">
                        <Button dark onClick={() => navigate('/items')}>
                            Hủy
                        </Button>
                        <Button primary onClick={handleClickSave}>
                            Lưu
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemForm;
