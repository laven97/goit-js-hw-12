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
};

let query;
let currentPage;

hideLoadMoreButton();

refs.form.addEventListener("submit", async event => {
    event.preventDefault();

    clearGallery();
    hideLoadMoreButton();

    const searchQuery = event.target.elements['search-text'].value.trim();
    query = searchQuery;
    currentPage = 1;


    if (searchQuery === "") {
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

    showLoader();

    const data = await getImagesByQuery(searchQuery)
         if (data.hits.length === 0) {
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
        showLoadMoreButton();

});

refs.loaderBtn.addEventListener("click",async ()=> {
    try{
        currentPage += 1;
        showLoader();

        const data = await getImagesByQuery(query, currentPage)

        createGallery(data.hits);

        hideLoader();

        const {height: cardHeight} = document.querySelector(".gallery-container").getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        let totalPages = Math.ceil(data.totalHits / query.per_page);

        if (currentPage >= totalPages) {
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
            refs.form.reset();
        }
    }
);
          
        
