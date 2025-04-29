import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import { IoSearchOutline } from 'react-icons/io5';

const cx = classNames.bind(styles);

function Input({ placeholder }) {
    return (
        <div className={cx('wrapper')}>
            <IoSearchOutline className={cx('icon')} />
            <input className={cx('input')} type="text" placeholder={placeholder} />
        </div>
    );
}

export default Input;
