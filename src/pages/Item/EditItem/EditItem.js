import ItemForm from '../../../components/ItemForm';
import { useParams } from 'react-router-dom';

function EditItem() {
    const params = useParams();

    return <ItemForm id={params.id} type="edit" />;
}

export default EditItem;
