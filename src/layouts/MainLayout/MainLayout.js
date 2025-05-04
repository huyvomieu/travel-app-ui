import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './MainLayout.module.scss';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar';
import { ContentScrollProvider } from '../../components/context/ContentScrollContext';
import { useRef } from 'react';
const cx = classNames.bind(styles);
function MainLayout({ children }) {
    const contentRef = useRef();
    return (
        <ContentScrollProvider contentRef={contentRef}>
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('container')}>
                    <Header />
                    <div className={cx('content')} ref={contentRef}>
                        {children}
                    </div>
                </div>
            </div>
        </ContentScrollProvider>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;
