import classNames from 'classnames/bind';
import styles from './CardItem.module.scss';

const cx = classNames.bind(styles);
function CardItem({ label, control, type, classNames, state, setState, onClick, ...props }) {
    let Control = 'input';
    if (control) {
        Control = control;
    }
    const classes = cx('wrapper', { [classNames]: classNames });
    return (
        <div className={classes}>
            <div className={cx('inner')}>
                <label className={cx('label')}>{label}</label>
                <div className={cx('control')}>
                    <Control
                        type={type}
                        value={state ?? ''}
                        className={cx('input')}
                        {...props}
                        onClick={onClick}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default CardItem;
