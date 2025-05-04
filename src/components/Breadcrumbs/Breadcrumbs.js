import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Button from '../ui/Button';

const cx = classNames.bind(styles);

function Breadcrumbs({ title, breadcrumbs, toBack, toCreate }) {
    return (
        <header className={cx('title-bar-container')}>
            <div className={cx('title-bar')}>
                <div className={cx('title-bar__navigation')}>
                    <div className={cx('breadcrumbs')}>
                        <Link to={toBack}>
                            <IoIosArrowBack />
                            <span>{breadcrumbs}</span>
                        </Link>
                    </div>
                </div>
                <div className={cx('title-bar__main-group')}>
                    <h2 className={cx('heading')}>{title} </h2>
                </div>
                {toCreate && (
                    <div className={cx('title-bar__actions')}>
                        <Button to={toCreate} primary small children={'Tạo ' + title} />
                    </div>
                )}
            </div>
        </header>
    );
}

Breadcrumbs.propTypes = {
    title: PropTypes.string,
    breadcrumbs: PropTypes.string,
    toBack: PropTypes.string,
    toCreate: PropTypes.string,
};

export default Breadcrumbs;
