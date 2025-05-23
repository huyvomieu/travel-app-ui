import { useParams } from 'react-router-dom';
import CategoryForm from '../../../components/CategoryForm';

function Edit() {
    const params = useParams();

    return <CategoryForm type="edit" id={params.id} />;
}

export default Edit;
