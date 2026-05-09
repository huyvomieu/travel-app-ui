import classNames from 'classnames/bind';
import styles from './CategoryForm.module.scss';
import { useState, useRef, useReducer, useEffect, useContext } from 'react';
import CardItem from '../Card/CardItem/CardItem';
import UploadImage from '../UploadImage';
import reducer, { initState, setData, getData } from '../reducers/categoryReducer';
import { postPutCategory, getDeleteCategory } from '../../services/CategoryService';
import Alert from '../Alert';
import { useLoading } from '../context/LoadingContext';
import Radio from '../ui/Radio/Radio';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ContentScrollContext } from '../context/ContentScrollContext';
import Modal from '../Modal';

const cx = classNames.bind(styles);

function CategoryForm({ type = 'add', id }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertmessage] = useState('');
    const [isValid, setIsValid] = useState({ type: [], message: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setLoading } = useLoading();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await getDeleteCategory(id);
                dispatch(getData(res));
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchData();
        }
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
    const navigate = useNavigate();

    const contentRef = useContext(ContentScrollContext);

    function handleClickSave() {
        if (!state.Name) {
            setIsValid({ type: ['Name'], message: '' });
            handleScrollTop();
            return;
        }

        const fetchAPI = async () => {
            try {
                setLoading(true);
                const result = await uploadImageRef.current?.getLinkImage();
                if (result) {
                    state.ImagePath = result;
                    if (type === 'add') {
                        const res = await postPutCategory(state, 'POST');
                        if (res.status === 201) {
                            setAlert(true);
                            setAlertmessage('Thêm danh mục thành công!');
                        } else {
                            throw new Error('Lỗi thêm mới Category');
                        }
                    } else {
                        const res = await postPutCategory(state, 'PUT');
                        if (res.status === 200) {
                            setAlert(true);
                            setAlertmessage('Sửa danh mục thành công!');
                        } else {
                            throw new Error('Lỗi Sửa Category');
                        }
                    }
                } else {
                    throw new Error('Lỗi tải ảnh lên');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }

    function handleChangeCategory(value) {
        if (value.length > 50) {
            return;
        }

        dispatch(setData(value, 'Name'));
    }
    function handleChangeDescription(value) {
        if (value.length > 1000) {
            return;
        }

        dispatch(setData(value, 'Description'));
    }
    function handleConFirmDelete() {
        const fetchAPI = async () => {
            try {
                setLoading(true);
                const res = await getDeleteCategory(state.Id, 'DELETE');
                if (res.status === 200) {
                    handleScrollTop();
                    setAlert(true);
                    setAlertmessage('Xóa danh mục thành công!');
                    setIsModalOpen(false);
                    setTimeout(() => {
                        navigate('/category');
                    }, 2000);
                } else {
                }
            } catch (error) {
                setAlert(true);
                setAlertmessage('Có lỗi xảy ra, vui lòng thử lại!');
            } finally {
                setLoading(false);
            }
        };
        fetchAPI();
    }
    function handleScrollTop() {
        contentRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    }
    function handleCloseAlert() {
        setAlert(false);
        setAlertmessage('');
    }
    function handleFocus() {
        setIsValid((prev) => {
            prev.type = prev.type.filter((type) => type !== 'Name');
            return prev;
        });
    }
    return (
        <div className={cx('wrapper')}>
            {alert && <Alert content={alertMessage} success handleClose={handleCloseAlert} />}
            {isModalOpen && (
                <Modal
                    title="Bạn có chắc chắn muốn xóa danh mục này?"
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConFirmDelete}
                />
            )}
            <div className={cx('inner')}>
                <div className={cx('main-layout')}>
                    <div className={cx('main-card')}>
                        <div className={cx('inner')}>
                            <CardItem
                                label={'Tên danh mục'}
                                state={state.Name}
                                setState={handleChangeCategory}
                                onFocus={handleFocus}
                            />
                            {isValid.type.includes('Name') && (
                                <span className="mb-2 text-sm font-normal text-red-400">
                                    Không được bỏ trống trường này
                                </span>
                            )}
                            <CardItem
                                control="textarea"
                                label={'Mô tả'}
                                rows="10"
                                state={state.Description}
                                setState={handleChangeDescription}
                            />
                        </div>
                    </div>
                    <div className={cx('next-card')}>
                        <div className="p-4 bg-white">
                            <div>Trạng thái</div>
                            <Radio ref={inputShowRef} defaultChecked={true}>
                                Hiển thị
                            </Radio>
                            <Radio ref={inputHideRef}>Ẩn</Radio>
                        </div>

                        <UploadImage src={state.ImagePath} ref={uploadImageRef} className={cx('avatar-card')} />
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    {type === 'edit' ? (
                        <Button danger onClick={() => setIsModalOpen(true)}>
                            Xóa
                        </Button>
                    ) : (
                        <span></span>
                    )}
                    <div className="flex gap-8">
                        <Button dark onClick={() => navigate('/category')}>
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

export default CategoryForm;
