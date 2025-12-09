import axios from 'axios';

export async function getImagesByQuery (query,page) {{
    const per_page = 15;
    const currentPage = page ?? 1;

    try {
        const responce = await axios.get ('https://pixabay.com/api/', {
        params: {
            key: '53618010-1b89e63a15719169e29158a57',
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: per_page,
            page:currentPage,
        }
    });
     return responce.data;
    }catch (error) {
        console.error(error);
    }
   
}}