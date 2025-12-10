import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import 'simplelightbox/dist/simple-lightbox.min.css';

import { 
    clearGallery, 
    hideLoader, 
    showLoader, 
    createGallery, 
    hideLoadMoreButton,
    showLoadMoreButton
} from "./js/render-functions";
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
    form: document.querySelector(".form"),
    loader: document.querySelector(".loader"),
    loaderBtn: document.querySelector(".load-more-btn"),
    gallery: document.querySelector(".gallery"),
};

    let query = "";
    let currentPage = 1;
    const per_page = 15;

    hideLoadMoreButton();

refs.form.addEventListener("submit", async event => {
    event.preventDefault();

    clearGallery();

    const serchQuery = event.target.elements['search-text'].value.trim();

    if (!serchQuery) {
        iziToast.error({
            message: 'Please enter a search query',
            messageColor: 'white',
            messageSize: '20',
            backgroundColor: 'red',
            position: 'topRight',
            timeout: 2000,
        });
        return;
    }

    query = serchQuery;
    currentPage = 1;
    showLoader();
    
    const data = await getImagesByQuery(serchQuery,currentPage)
         if (!data || data.hits.length === 0) {
            hideLoader();
                iziToast.error({
                    message: 'No images found. Please try again.',
                    messageColor: 'white',
                    messageSize: '20',
                    backgroundColor: 'red',
                    position: 'topRight',
                    timeout: 2000,
                });
                return;
            }

        createGallery(data.hits);
        hideLoader();

        const totalPages = Math.ceil(data.totalHits / per_page);

        if(totalPages >= per_page) {
            showLoadMoreButton();
        }else {
            hideLoadMoreButton();
        }
});

refs.loaderBtn.addEventListener("click", async ()=> {
    try{
        currentPage += 1;
        showLoader();

        const data = await getImagesByQuery(query,currentPage);

        createGallery(data.hits);

        const totalPages = Math.ceil(data.totalHits / per_page);

        const {height: cardHeight} = refs.gallery.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        if (currentPage > totalPages) {
            hideLoadMoreButton();
            iziToast.info({
                message: "You've reached the end of search results.",
                messageColor: 'white',
                messageSize: '20',
                backgroundColor: 'blue',
                position: 'topRight',
                timeout: 2000,
            });
        }
        }catch(error) {
            iziToast.error({
                message: "Something went wrong",
                messageColor: 'white',
                messageSize: '20',
                backgroundColor: 'red',
                position: 'topRight',
                timeout: 2000,
            });
        }
        finally {
            hideLoader();
        }
    }
);
          
        
