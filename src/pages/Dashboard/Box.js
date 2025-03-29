import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

const cx = classNames.bind(styles);
function Box({ title, subTitle, icon }) {
    return (
        <div className={cx('box')}>
            <div className={cx('step-1')}>
                <p className={cx('step-text')}>{title}</p>
                <strong className={cx('step-icon')}>{subTitle}</strong>
            </div>
            <div className={cx('step-2')}>{icon}</div>
        </div>
    );
}

export default Box;
