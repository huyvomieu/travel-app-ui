import axios from 'axios';

export const uploadImageToClound = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'reactDACN');

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUNDINARY_KEY}/image/upload`,
        formData,
    );

    return res.data.secure_url;
};
