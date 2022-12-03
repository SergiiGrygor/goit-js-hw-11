import './common.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './news-service';


const refs = {
    searchForm: document.querySelector('#search-form'),
    loadMoreBTN: document.querySelector('.load-more'),
    galleryContainer: document.querySelector('.gallery')
}

refs.loadMoreBTN.classList.add("is-hidden");
refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBTN.addEventListener('click', onloadMore)

const newsApiService = new NewsApiService();

function onSearch(evt) {
  evt.preventDefault();
  clearGalleryContainer();
  if (evt.currentTarget.elements.searchQuery.value === '') {
    (Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
    return;
  }
  newsApiService.query = evt.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendPictureMarkup)
  // newsApiService.calcEndOfPages().then (hideBtnLoadMore);
refs.loadMoreBTN.classList.remove("is-hidden");
}

async function onloadMore() {
   newsApiService.fetchArticles().then(appendPictureMarkup)

}

function appendPictureMarkup(hits) {
  if (hits.length === 0) {
    refs.loadMoreBTN.classList.add("is-hidden");
    (Notify.failure('Sorry, there are no images matching your search query. Please try again.'))
  }

  const markup = hits.map(({ webformatURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
  }).join('');
 refs.galleryContainer.insertAdjacentHTML('beforeend', markup)

}


function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
  refs.loadMoreBTN.classList.add("is-hidden");
}


function hideBtnLoadMore() {
  refs.loadMoreBTN.classList.add("is-hidden");
}


