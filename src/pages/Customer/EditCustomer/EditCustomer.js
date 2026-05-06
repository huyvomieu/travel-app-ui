import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import BoxCustomer from '../../../components/BoxCustomer';
import { getCustomer } from '../../../services/CustomerService';

function EditCustomer() {
    const [customer, setCustomer] = useState({});
    const params = useParams();

    useEffect(() => {
        const fetchAPI = async () => {
            const data = await getCustomer(params.id);
            setCustomer(data);
        };
        fetchAPI();
    }, [params.id]);

    return <BoxCustomer data={customer} title="Sửa khách hàng" type="edit" btnPrimaryName="Cập nhật" />;
}

export default EditCustomer;
