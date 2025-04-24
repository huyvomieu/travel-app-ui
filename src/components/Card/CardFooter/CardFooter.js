import { useState } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CardFooter.module.scss';
import Modal from '../../Modal';
import Button from '../../Button';

const cx = classNames.bind(styles);
function CardFooter({ type, onClickConFirm, onClickSave }) {
    const [isOpenModal, setIsOpenModal] = useState(false);

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
                        onClickConFirm();
                    }}
                />
            )}
            <Button
                classNames={cx({ hide: type === 'add' })}
                danger
                small
                children="Xóa danh mục"
                onClick={() => setIsOpenModal(true)}
            />
            <div className={cx('actions-right')}>
                <Button to="/category" dark small children="Hủy" classNames={cx('btn-close')} />
                <Button primary small children="Lưu" classNames={cx('btn-save')} onClick={onClickSave} />
            </div>
        </div>
    );
}

export default CardFooter;
