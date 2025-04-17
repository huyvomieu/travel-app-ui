import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CardList.module.scss';
import { RiArrowDownSFill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function CardList({ title, breadcrumbs, toBack, toCreate, callAPI }) {
    const [dataArray, setDataArray] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const data = await callAPI();
            setDataArray(data);
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Breadcrumbs title={title} breadcrumbs={breadcrumbs} toBack={toBack} toCreate={toCreate} />
                <div className={cx('main-layout')}>
                    <div className={cx('main-layout__inner')}>
                        <div className={cx('main-layout__header')}>
                            <span>Tất cả {title}</span>
                        </div>
                        <div className={cx('main-layout__filter')}>
                            <div className={cx('filter')}>
                                <span>Lọc {title}</span>
                                <RiArrowDownSFill />
                            </div>
                            <div className={cx('search')}>
                                <div className={cx('search-inner')}>
                                    <input type="text" placeholder="Tìm kiếm " />
                                    <div className={cx('icon')}>
                                        <IoSearch />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('table-wrapper')}>
                            <table className={cx('table')}>
                                <thead>
                                    <tr className={cx('row', 'not-border')}>
                                        <th className={cx('checkbox')}>
                                            <input type="checkbox" />
                                        </th>
                                        <th className={cx('img')}></th>
                                        <th className={cx('name')}>{title}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataArray.map((data) => (
                                        <Link to={'/category/' + data.Id}>
                                            <tr key={data.Id} className={cx('row')}>
                                                <td className={cx('checkbox')}>
                                                    <input type="checkbox" />
                                                </td>
                                                <td className={cx('img')}>
                                                    <img width="40px" height="40px" src={data.ImagePath} alt="Hà nội" />
                                                </td>
                                                <td className={cx('name')}>{data.Name}</td>
                                            </tr>
                                        </Link>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CardList.propTypes = {
    title: PropTypes.string,
    breadcrumbs: PropTypes.string,
    toBack: PropTypes.string,
    toCreate: PropTypes.string,
    callAPI: PropTypes.func,
};

export default CardList;
