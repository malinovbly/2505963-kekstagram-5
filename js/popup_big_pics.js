import {isEscapeKey} from './util.js';
import {photosData} from './data.js';
import {picsContainer} from './pics_render.js';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPicturePopupCloseElement = bigPicturePopup.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    onPopupClose(evt);
  }
};

function onPopupClose (evt) {
  evt.preventDefault();
  bigPicturePopup.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
}

const getSmallPhotoData = function (smallPic, photos) {
  for (let i = 0; i < photos.length; i++) {
    if (smallPic.src.toString().indexOf(photos[i]['url']) !== -1) {
      return photos[i];
    }
  }
};

const createCommentElements = function (smallPic, photos) {
  const fragment = document.createDocumentFragment();
  const comments = getSmallPhotoData(smallPic, photos).comments;

  for (let i = 0; i < comments.length; i++) {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const newCommentAvatar = document.createElement('img');
    newCommentAvatar.classList.add('social__picture');
    newCommentAvatar.src = comments[i].avatar;
    newCommentAvatar.alt = comments[i].name;
    newCommentAvatar.width = 35;
    newCommentAvatar.height = 35;

    const newCommentText = document.createElement('p');
    newCommentText.classList.add('social__text');
    newCommentText.textContent = comments[i].message;

    newComment.appendChild(newCommentAvatar);
    newComment.appendChild(newCommentText);

    fragment.appendChild(newComment);
  }

  return fragment;
};

const onPicsContainerClick = function (evt) {
  if (evt.target.matches('.picture__img')) {
    bigPicturePopup.classList.remove('hidden');
    const smallPic = evt.target;

    const popupPicture = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
    popupPicture.src = smallPic.src;

    const popupLikesCount = bigPicturePopup.querySelector('.likes-count');
    popupLikesCount.textContent = smallPic.closest('.picture').querySelector('.picture__likes').textContent;

    const popupCommentsCount = bigPicturePopup.querySelector('.comments-count');
    popupCommentsCount.textContent = smallPic.closest('.picture').querySelector('.picture__comments').textContent;

    const popupComments = bigPicturePopup.querySelector('.social__comments');
    popupComments.append(createCommentElements(smallPic, photosData));

    const popupCaption = bigPicturePopup.querySelector('.social__caption');
    popupCaption.textContent = getSmallPhotoData(smallPic, photosData).description;

    const commentCount = bigPicturePopup.querySelector('.social__comment-count');
    commentCount.classList.add('hidden');
    const commentsLoader = bigPicturePopup.querySelector('.comments-loader');
    commentsLoader.classList.add('hidden');

    body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeyDown);
  }
};

picsContainer.addEventListener('click', onPicsContainerClick);
bigPicturePopupCloseElement.addEventListener('click', onPopupClose);
