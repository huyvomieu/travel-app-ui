import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Alert({
    content,
    primary = false,
    success = false,
    danger = false,
    warning = false,
    dark = false,
    hidden = false,
    handleClose,
}) {
    const classes = cx('wrapper', {
        primary,
        success,
        danger,
        warning,
        dark,
        hidden,
    });

    return (
        <div className={classes}>
            <span>{content}</span>
            <span className={cx('close')} onClick={handleClose}>
                <IoIosCloseCircleOutline />
            </span>
        </div>
    );
}

Alert.propTypes = {
    content: PropTypes.string,
    primary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    dark: PropTypes.bool,
};

export default Alert;
