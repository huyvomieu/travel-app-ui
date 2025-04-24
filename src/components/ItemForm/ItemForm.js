import classNames from 'classnames/bind';
import styles from './ItemForm.module.scss';
import { useState, useRef, useReducer, useEffect } from 'react';
import CardItem from '../Card/CardItem/CardItem';
import BoxStatus from '../BoxStatus';
import UploadImage from '../UploadImage';
import CardFooter from '../Card/CardFooter';
import reducer, {
    initState,
    setSearchCategory,
    setListCategory,
    setCategory,
    setTourGuide,
    setData,
    setListTourGuide,
    setSearchTourGuide,
} from '../reducers/itemReducer';
import { postPutItem, getDeleteItem } from '../../services/ItemService';
import { getDeleteCategory } from '../../services/CategoryService';
import { getCustomer } from '../../services/CustomerService';
import { SET_SEARCH_CATEGORY } from '../reducers/constants';
import Alert from '../Alert';
import CardBox from '../Card/CardBox';
import Tippy from '@tippyjs/react/headless';
import useDebounce from '../../hooks/useDebounce';
import { IoCloseOutline } from 'react-icons/io5';
const cx = classNames.bind(styles);

function ItemForm({ type = 'add', id }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const [alert, setAlert] = useState(false);
    const [tippy, setTippy] = useState(false);
    const [tippyTourGuide, setTippyTourGuide] = useState(false);

    const categorydebounced = useDebounce(state.searchCategory, 500);
    const guidedebounced = useDebounce(state.searchTourGuide, 500);
    useEffect(() => {
        const fetchData = async () => {
            // const res = await getDeleteCategory(id);
            // dispatch(getData(res));
        };
        fetchData();
    }, [id, type]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getDeleteCategory(null, 'GET', {
                q: categorydebounced,
                type: ['Id', 'Name'],
            });
            if (res) {
                dispatch(setListCategory(res));
            } else {
                throw new Error('Call API lỗi khi lấy list Category');
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

    const uploadImageRef = useRef();

    function handleClickSave() {
        console.log(state.data);

        const fetchAPI = async () => {
            const result = await uploadImageRef.current?.getLinkImage();
            if (result) {
                state.data.pic = result;
                const res = await postPutItem(state.data, 'POST');
                if (res.status === 201) {
                    setAlert(true);
                } else {
                    throw new Error(res);
                }
            } else {
                throw new Error('Lỗi tải ảnh lên');
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

    return (
        <div className={cx('wrapper')}>
            {alert && <Alert content="Thêm tour thành công!" success />}
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
                            <CardItem
                                label={'Địa chỉ'}
                                state={state.data.address}
                                setState={(value) => {
                                    dispatch(setData(value, 'address'));
                                }}
                            />
                            <CardItem
                                control="textarea"
                                label={'Mô tả'}
                                rows="10"
                                state={state.data.description}
                                setState={(value) => {
                                    dispatch(setData(value, 'description'));
                                }}
                            />
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
                                        dispatch(setData(value, 'bed'));
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
                        </div>
                    </div>
                    <div className={cx('next-card')}>
                        <BoxStatus classNames={cx('status-card')} />

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
                        <UploadImage src={state.ImagePath} ref={uploadImageRef} className={cx('avatar-card')} />
                    </div>
                </div>
                <div className={cx('row')}>
                    <CardBox label="Giá tour">
                        <CardItem
                            label={'Giá'}
                            state={state.data.price}
                            setState={(value) => {
                                dispatch(setData(value, 'price'));
                            }}
                        />
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
                <CardFooter type={type} onClickSave={handleClickSave} />
            </div>
        </div>
    );
}

export default ItemForm;
