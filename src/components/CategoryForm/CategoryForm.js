import classNames from 'classnames/bind';
import styles from './CategoryForm.module.scss';
import { useState, useRef, useReducer, useEffect } from 'react';
import CardItem from '../Card/CardItem/CardItem';
import UploadImage from '../UploadImage';
import reducer, { initState, setData, getData } from '../reducers/categoryReducer';
import { postPutCategory, getDeleteCategory } from '../../services/CategoryService';
import Alert from '../Alert';
import { useLoading } from '../context/LoadingContext';
import Radio from '../ui/Radio/Radio';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const cx = classNames.bind(styles);

function CategoryForm({ type = 'add', id }) {
    const [state, dispatch] = useReducer(reducer, initState);
    const [alert, setAlert] = useState(false);

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

    const navigate = useNavigate();
    function handleClickSave() {
        const fetchAPI = async () => {
            try {
                setLoading(true);
                const result = await uploadImageRef.current?.getLinkImage();
                if (result) {
                    state.ImagePath = result;
                    const res = await postPutCategory(state, 'POST');
                    if (res.status === 201) {
                        setAlert(true);
                    } else {
                        throw new Error('Lỗi thêm mới Category');
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
    return (
        <div className={cx('wrapper')}>
            {alert && <Alert content="Thêm danh mục thành công!" success />}
            <div className={cx('inner')}>
                <div className={cx('main-layout')}>
                    <div className={cx('main-card')}>
                        <div className={cx('inner')}>
                            <CardItem
                                label={'Tên danh mục'}
                                state={state.Name}
                                setState={(value) => {
                                    dispatch(setData(value, 'Name'));
                                }}
                            />
                            <CardItem
                                control="textarea"
                                label={'Mô tả'}
                                rows="10"
                                state={state.Description}
                                setState={(value) => {
                                    dispatch(setData(value, 'Description'));
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('next-card')}>
                        <div className="p-4 bg-white">
                            <div>Trạng thái</div>
                            <Radio ref={inputShowRef}>Hiển thị</Radio>
                            <Radio ref={inputHideRef}>Ẩn</Radio>
                        </div>

                        <UploadImage src={state.ImagePath} ref={uploadImageRef} className={cx('avatar-card')} />
                    </div>
                </div>
                <div className="flex justify-between items-center ">
                    {type === 'edit' ? (
                        <Button danger onClick={() => {}}>
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
