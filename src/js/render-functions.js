import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    galleryContainer: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    loaderBtn: document.querySelector(".load-more-btn"),
}

function randomImages ({webformatURL,largeImageURL,tags,likes,views,comments,downloads}) {
    return `<li class="gallery-container">
  <a href="${largeImageURL}" class="gallery-container-a">
    <img class="gallery-container-img" src="${webformatURL}" alt="${tags}">
  </a>
  <ul class="img-info-list">
    <li class="img-description">
      <h3 class="description-headerline">Likes</h3>
      <p class="description-text">${likes}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Views</h3>
      <p class="description-text">${views}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Comments</h3>
      <p class="description-text">${comments}</p>
    </li>
    <li class="img-description">
      <h3 class="description-headerline">Downloads</h3>
      <p class="description-text">${downloads}</p>
    </li>
  </ul>
</li>`
}

let simplelightbox = new SimpleLightbox('.gallery-container-a ', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  refresh: true,
});

function createGallery (images) {
    const markup = images.map(image => randomImages(image)).join('');
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
    simplelightbox.refresh();
}

function clearGallery () {
    refs.galleryContainer.innerHTML = '';
}

function showLoader () {
    refs.loader.style.display = 'block';
}

function hideLoader () {
    refs.loader.style.display = 'none';
}

function showLoadMoreButton() {
    refs.loaderBtn.style.display = 'block';
}

function hideLoadMoreButton() {
    refs.loaderBtn.style.display = 'none';
}

export {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton
}