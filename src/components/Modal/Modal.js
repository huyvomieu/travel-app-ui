import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import { useEffect, useRef } from 'react';
import Button from '../Button';

const cx = classNames.bind(styles);
function Modal({ title, isOpen, onClose, onConfirm }) {
    const modalRef = useRef();
    const fullScreenRef = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            // Kiểm tra xem có click ngoài modal không
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            fullScreenRef.current.addEventListener('click', handleClickOutside);
        }
        // Remove event listener when Element is unmount to avoid memory leaks (Tránh rò rỉ bộ nhớ khi Element được unmount)
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen, onClose]);
    if (!isOpen) return null;
    return (
        <div className={cx('modal')} ref={fullScreenRef}>
            <div className={cx('wrapper', 'modal-body')} ref={modalRef}>
                <div className={cx('inner')}>
                    <header className={cx('header')}>
                        <strong>{title}</strong>
                    </header>
                    <div className={cx('body')}>
                        <Button small dark onClick={onClose}>
                            Hủy
                        </Button>
                        <Button small primary onClick={onConfirm}>
                            Có
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
