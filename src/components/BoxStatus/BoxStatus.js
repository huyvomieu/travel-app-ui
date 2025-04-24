import classNames from 'classnames/bind';
import styles from './BoxStatus.module.scss';

const cx = classNames.bind(styles);

function BoxStatus({ classNames }) {
    const classes = cx('wrapper', {
        [classNames]: classNames,
    });
    return (
        <div className={classes}>
            <div className={cx('inner')}>
                <strong className={cx('card-title')}>Trạng thái</strong>
                <div className={cx('card__item')}>
                    <input type="radio" id="status" name="status" defaultValue={true} defaultChecked />
                    <span className={cx('status-value')}>Hiển thị</span>
                </div>
                <div className={cx('card__item')}>
                    <input type="radio" id="status" name="status" defaultValue={true} />
                    <span className={cx('status-value')}>Ẩn</span>
                </div>
                <div className={cx('card__item')}>
                    <button className={cx('btn-book')}>Đặt lịch hiển thị</button>
                </div>
            </div>
        </div>
    );
}

export default BoxStatus;
