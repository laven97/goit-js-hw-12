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
    let totalHits = 0;

    hideLoadMoreButton();

refs.form.addEventListener("submit", async event => {
    event.preventDefault();



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

    clearGallery();
    hideLoadMoreButton();
    query = serchQuery;
    currentPage = 1;
    showLoader();
    
   try {
     const data = await getImagesByQuery(serchQuery, currentPage, per_page)
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

        totalHits = data.totalHits;
        createGallery(data.hits);

        if(currentPage * per_page < totalHits){
            showLoadMoreButton();
        }else{
            hideLoadMoreButton();
        }
   }catch(error){
        iziToast.error({
            message: "Something went wrong",
            messageColor: 'white',
            messageSize: '20',
            backgroundColor: 'red',
            position: 'topRight',
            timeout: 2000,
        });
        hideLoadMoreButton();
   } finally {
        hideLoader();
        refs.form.reset();
   }
});

refs.loaderBtn.addEventListener("click", async ()=> {
       currentPage += 1;
        hideLoadMoreButton();
        showLoader();

    try{
        const data = await getImagesByQuery(query, currentPage, per_page);

        createGallery(data.hits);

        const firsCart = document.querySelector('.gallery-container');
        if (firsCart) {
            const { height: cardHeight } = firsCart.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        }

        if (currentPage * per_page < totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "You've reached the end of search results.",
                messageColor: 'white',
                messageSize: '20',
                backgroundColor: 'red',
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
          
        
