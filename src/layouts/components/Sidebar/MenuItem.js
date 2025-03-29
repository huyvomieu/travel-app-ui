import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function MenuItem({ to, content, icon }) {
    return (
        <Link to={to}>
            <div className={cx('menu-box')}>
                <div className={cx('menu-icon')}>{icon}</div>
                <p className={cx('menu-item')}>{content}</p>
            </div>
        </Link>
    );
}

MenuItem.propTypes = {
    to: PropTypes.string,
    content: PropTypes.string,
    icon: PropTypes.node,
};

export default MenuItem;
