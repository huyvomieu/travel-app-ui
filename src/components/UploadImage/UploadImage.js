import classNames from 'classnames/bind';
import styles from './UploadImage.module.scss';
import Button from '../Button';
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { uploadImageToClound } from '../../services/uploadService';

const cx = classNames.bind(styles);
function UploadImage({ src, className }, ref) {
    const [file, setFile] = useState(null);
    const [previewImg, setPreviewImg] = useState('');
    const [isPreview, setIsPreview] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
        setPreviewImg(src);
        if (src) {
            setIsPreview(true);
        }
    }, [src]);
    function handleResetBoxUpload() {
        setFile(null);
        setPreviewImg('');
        setIsPreview(false);
    }
    useImperativeHandle(ref, () => ({
        getLinkImage: async () => {
            if (file) {
                const resultURL = await uploadImageToClound(file);
                return resultURL;
            } else if (previewImg) {
                return previewImg;
            } else {
                return alert('Vui lòng tải ảnh lên!');
            }
        },
    }));
    function handleClickBtn(e) {
        inputRef.current.click();
    }
    function handUploadedFile(e) {
        const currentFile = e.target.files[0];
        if (currentFile) {
            setFile(currentFile);
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImg(e.target.result);
                setIsPreview(true);
            };
            // Đọc nội dung file dưới dạng Data URL (dùng cho ảnh, audio, v.v.) => Kích hoạt onload sau khi đọc song
            reader.readAsDataURL(currentFile);
        }
    }
    function handleLoad(e) {
        e.target.classList.add(cx('loaded'));
    }
    function handleError(e) {
        e.target.classList.add(cx('error'));
    }
    return (
        <div className={cx('wrapper')}>
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
                        className={cx('img')}
                        src={previewImg || null}
                        alt="avatar"
                        onLoad={handleLoad}
                        onError={handleError}
                    />

                    <Button
                        primary
                        small
                        classNames={cx('btn-upload', { 'd-none': isPreview })}
                        onClick={handleClickBtn}
                    >
                        Upload ảnh
                    </Button>
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
    );
}

export default forwardRef(UploadImage);
