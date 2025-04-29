import classNames from 'classnames/bind';
import styles from './CategoryForm.module.scss';
import { useState, useRef, useReducer, useEffect } from 'react';
import CardItem from '../Card/CardItem/CardItem';
import BoxStatus from '../BoxStatus';
import UploadImage from '../UploadImage';
import CardFooter from '../Card/CardFooter';
import reducer, { initState, setData, getData } from '../reducers/categoryReducer';
import { postPutCategory, getDeleteCategory } from '../../services/CategoryService';
import Alert from '../Alert';
import { useLoading } from '../context/LoadingContext';
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

    function handleClickSave() {
        const fetchAPI = async () => {
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
                        <BoxStatus classNames={cx('status-card')} />

                        <UploadImage src={state.ImagePath} ref={uploadImageRef} className={cx('avatar-card')} />
                    </div>
                </div>
                <CardFooter type={type} onClickSave={handleClickSave} />
            </div>
        </div>
    );
}

export default CategoryForm;
