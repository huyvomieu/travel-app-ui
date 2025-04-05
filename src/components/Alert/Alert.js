import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

function Alert({ content, primary = false, success = false, danger = false, warning = false, dark = false }) {
    console.log('re-render');

    const classes = cx('wrapper', {
        primary,
        success,
        danger,
        warning,
        dark,
    });
    return <span className={classes}>{content}</span>;
}

Alert.propTypes = {
    content: PropTypes.string,
    primary: PropTypes.bool,
    success: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    dark: PropTypes.bool,
};

export default Alert;
