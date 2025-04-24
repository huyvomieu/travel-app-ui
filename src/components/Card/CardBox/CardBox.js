import classNames from 'classnames/bind';
import styles from './CardBox.module.scss';

const cx = classNames.bind(styles);
function CardItem({ children, label }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <strong className={cx('card-title')}>{label}</strong>
                {children}
            </div>
        </div>
    );
}

export default CardItem;
