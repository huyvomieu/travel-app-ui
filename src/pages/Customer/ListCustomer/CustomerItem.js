import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ListCustomer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Customeritem({ data, onChangeCheckBox }) {
    function handleChange(e) {
        onChangeCheckBox(e.target.checked, data.id);
        data.checked = e.target.checked;
    }
    return (
        <Link
            to={`/customers/${data.username}`}
            onClick={(e) => {
                if (e.target.type === 'checkbox') {
                    e.preventDefault();
                }
            }}
        >
            <div className={cx('grid', 'list-item')}>
                <div className={cx('checkbox')}>
                    <input type="checkbox" onChange={handleChange} checked={data.checked} />
                </div>
                <span className={cx('full-name')}>{data.name}</span>
                <span className={cx('email')}>{data.email}</span>
                <span className={cx('username')}>{data.username}</span>
                <span className={cx('current-tour')}></span>
                <span className={cx('total')}></span>
            </div>
        </Link>
    );
}

Customeritem.propTypes = {
    data: PropTypes.object,
};

export default Customeritem;
