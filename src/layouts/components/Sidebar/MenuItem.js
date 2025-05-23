import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);

function MenuItem({ children, to, content, icon, active = false }) {
    const [hideShow, setHideShow] = useState(true);
    function handleClick(e) {
        setHideShow(!hideShow);
    }
    let Tag = Link;
    if (children) {
        Tag = 'div';
    }
    return (
        <Tag to={to} onClick={handleClick}>
            <div className={cx('menu-box', { active })}>
                <div className={cx('menu-icon')}>{icon}</div>
                <p className={cx('menu-item')}>{content}</p>
            </div>
            <div className={cx('menu-children', { 'd-none': hideShow })}>{children}</div>
        </Tag>
    );
}

MenuItem.propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    content: PropTypes.string,
    icon: PropTypes.node,
};

export default MenuItem;
