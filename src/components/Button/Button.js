import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    small = false,
    large = false,
    primary = false,
    secondary = false,
    danger = false,
    warning = false,
    dark = false,
    outline = false,
    onClick,
    children,
    classNames,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    const classes = cx('wrapper', {
        [classNames]: classNames,
        small,
        large,
        primary,
        secondary,
        danger,
        warning,
        dark,
        outline,
    });

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    small: PropTypes.bool,
    large: PropTypes.bool,
    secondary: PropTypes.bool,
    danger: PropTypes.bool,
    warning: PropTypes.bool,
    dark: PropTypes.bool,
    classNames: PropTypes.object,
};

export default Button;
