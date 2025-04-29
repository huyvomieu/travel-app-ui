import classNames from 'classnames/bind';
import styles from './Spinner.module.scss';

const cx = classNames.bind(styles);
function Spinner() {
    return (
        <div className={cx('spinner-overlay')}>
            <div className={cx('spinner')}></div>
        </div>
    );
}

export default Spinner;
