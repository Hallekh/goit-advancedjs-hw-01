// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const container = document.querySelector('.gallery');

function createMarkup(array) {
  return array
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>`
    )
    .join('');
}
container.insertAdjacentHTML('afterbegin', createMarkup(galleryItems));

const lightbox = new SimpleLightbox('.gallery__link', {
  captions: true,
  captionDelay: 250,
  captionPosition: 'bottom',
  captionsData: 'alt',
  history: false,
});

console.log(galleryItems);
