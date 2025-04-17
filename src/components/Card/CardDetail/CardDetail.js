import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CardDetail.module.scss';
import Breadcrumbs from '../../Breadcrumbs';
import Button from '../../Button';
import { useEffect, useRef, useState } from 'react';
import { uploadImageToClound } from '../../../services/uploadService';
import { postPutCategory, getDeleteCategory } from '../../../services/CategoryService';
import Alert from '../../Alert';
import Modal from '../../Modal';
const cx = classNames.bind(styles);

function CardDetail({ title, breadcrumbs, toBack, toCreate, dataEdit, edit = false }) {
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [BoxAlert, setBoxAlert] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [data, setData] = useState(
        dataEdit && {
            Id: '',
            ImagePath: '',
            Name: '',
            Description: '',
        },
    );
    console.log('re-render', isOpenModal);

    // Ref
    const inputRef = useRef();

    // Effect
    useEffect(() => {
        setData(dataEdit);
        setPreviewImg(dataEdit?.ImagePath);
    }, [dataEdit]);

    // function handler
    function handleClickBtn(e) {
        inputRef.current.click();
    }

    function handUploadedFile(e) {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImg(e.target.result);
            };
            // Đọc nội dung file dưới dạng Data URL (dùng cho ảnh, audio, v.v.) => Kích hoạt onload sau khi đọc song
            reader.readAsDataURL(file);
        }
    }
    function handleResetBoxUpload() {
        setFile(null);
        setPreviewImg('');
    }

    function handleClickSave() {
        if (file) {
            const uploadImage = async () => {
                const resultURL = await uploadImageToClound(file);
                const dataPost = {
                    ...data,
                    ImagePath: resultURL,
                };
                const res = await postPutCategory(dataPost, 'post');
                if (res.status === 201) {
                    setBoxAlert(true);
                }
            };
            uploadImage();
        } else {
            return alert('Vui lòng tải ảnh lên!');
        }
    }

    function handleDelete() {
        const fetchAPI = async () => {
            const res = await getDeleteCategory(data.Id, 'delete');
            console.log(res);
        };
        fetchAPI();
    }

    return (
        <div className={cx('wrapper')}>
            {isOpenModal && (
                <Modal
                    title="Bạn có chắc chắn xóa danh mục này?"
                    isOpen={isOpenModal}
                    onClose={() => {
                        setIsOpenModal(false);
                    }}
                    onConfirm={() => {
                        handleDelete();
                    }}
                />
            )}
            {BoxAlert && <Alert content="Thêm danh mục thành công!" success />}
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} toBack={toBack} toCreate={toCreate} />
            <div className={cx('main-layout')}>
                <div className={cx('main-card')}>
                    <div className={cx('inner')}>
                        <div className={cx('card__item')}>
                            <label className={cx('label-input')}>Tên {breadcrumbs}</label>
                            <div className={cx('card__control')}>
                                <input
                                    className={cx('input')}
                                    value={data?.Name ?? ''}
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            Name: e.target.value,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                        <div className={cx('card__item')}>
                            <label className={cx('label-input')}>Mô tả</label>
                            <div className={cx('card__control')}>
                                <textarea
                                    value={data?.Description ?? ''}
                                    className={cx('input')}
                                    rows="10"
                                    onChange={(e) =>
                                        setData((prev) => ({
                                            ...prev,
                                            Description: e.target.value,
                                        }))
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('next-card')}>
                    <div className={cx('status-card')}>
                        <div className={cx('inner')}>
                            <strong className={cx('card-title')}>Trạng thái</strong>
                            <div className={cx('card__item')}>
                                <input type="radio" id="status" name="status" defaultValue={true} defaultChecked />
                                <span className={cx('status-value')}>Hiển thị</span>
                            </div>
                            <div className={cx('card__item')}>
                                <input type="radio" id="status" name="status" defaultValue={true} />
                                <span className={cx('status-value')}>Ẩn</span>
                            </div>
                            <div className={cx('card__item')}>
                                <button className={cx('btn-book')}>Đặt lịch hiển thị</button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('avatar-card')}>
                        <div className={cx('inner')}>
                            <strong className={cx('card-title')}>Ảnh</strong>
                            <div className={cx('box-upload-img')}>
                                <div className={cx({ 'd-none': !previewImg }, 'actions')}>
                                    <button className={cx('btn-delete')} onClick={handleResetBoxUpload}>
                                        Xóa
                                    </button>
                                    <button className={cx('btn-other')} onClick={handleClickBtn}>
                                        Chọn ảnh khác
                                    </button>
                                </div>
                                <img
                                    className={cx('img', { loaded: !!previewImg }, { error: !previewImg })}
                                    src={previewImg || null}
                                    alt="avatar"
                                />
                                <Button
                                    primary
                                    small
                                    children="Upload ảnh"
                                    classNames={cx('btn-upload')}
                                    onClick={handleClickBtn}
                                />
                                <input
                                    defaultValue={null}
                                    ref={inputRef}
                                    onChange={handUploadedFile}
                                    className={cx('d-none')}
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button
                    classNames={cx({ hide: edit })}
                    danger
                    small
                    children="Xóa danh mục"
                    onClick={() => setIsOpenModal(true)}
                />
                <div className={cx('actions-right')}>
                    <Button to="/category" dark small children="Hủy" classNames={cx('btn-close')} />
                    <Button primary small children="Lưu" classNames={cx('btn-save')} onClick={handleClickSave} />
                </div>
            </div>
        </div>
    );
}

CardDetail.propTypes = {
    title: PropTypes.string,
    breadcrumbs: PropTypes.string,
    toBack: PropTypes.string,
    toCreate: PropTypes.string,
    dataEdit: PropTypes.array,
    edit: PropTypes.bool,
};
export default CardDetail;
