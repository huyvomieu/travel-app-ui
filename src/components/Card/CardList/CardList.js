import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './CardList.module.scss';
import { RiArrowDownSFill } from 'react-icons/ri';
import { IoSearch } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../../Breadcrumbs/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../../components/context/LoadingContext';

const cx = classNames.bind(styles);
function CardList({ title, breadcrumbs, toBack, toCreate, callAPI, page }) {
    const [dataArray, setDataArray] = useState([]);

    const { setLoading } = useLoading();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true);
            try {
                const data = await callAPI();
                setDataArray(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
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
                                        {page === 'item' && (
                                            <>
                                                <th className={cx('col')}>Thời gian</th>
                                                <th className={cx('col')}>Giá</th>
                                                <th className={cx('col')}>Sức chứa chỗ</th>
                                                <th className={cx('col')}>Trạng thái</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataArray.map((data) => {
                                        if (page === 'category') {
                                            return (
                                                <tr
                                                    onClick={() => navigate(`/category/${data.key}`)}
                                                    key={data.Id}
                                                    className={cx('row')}
                                                >
                                                    <td className={cx('checkbox')}>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className={cx('img')}>
                                                        <img
                                                            width="40px"
                                                            height="40px"
                                                            src={data.ImagePath}
                                                            alt="Hà nội"
                                                        />
                                                    </td>
                                                    <td className={cx('name')}>{data.Name}</td>
                                                </tr>
                                            );
                                        } else if (page === 'item') {
                                            return (
                                                <tr
                                                    onClick={() => navigate(`/items/${data.key}`)}
                                                    key={data.key}
                                                    className={cx('row')}
                                                >
                                                    <td className={cx('checkbox')}>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td className={cx('img')}>
                                                        <img width="40px" height="40px" src={data.pic} alt="Hà nội" />
                                                    </td>
                                                    <td className={cx('name')}>{data.title}</td>
                                                    <td className={cx('col')}>{data.timeTour + ' ' + data.dateTour}</td>
                                                    <td className={cx('col')}>${data.price}</td>
                                                    <td className={cx('col')}>{data.bed}</td>
                                                    <td
                                                        className={cx('col', {
                                                            active: data.status,
                                                            'not-active': !data.status,
                                                        })}
                                                    >
                                                        {data.status && 'Hiển thị'}
                                                        {!data.status && 'Không hiển thị'}
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
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
