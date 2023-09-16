// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// const cardsContainer = document.querySelector('.cards');
// const cardTemplate = document.querySelector('#card').content;

// const addButton = document.querySelector('.add');
// const editButton = document.querySelector('.edit');

// // function transitionPopover() {
// //   const popover = document.querySelector('#edit-popover');
// //   popover.classList.toggle('active-popover');
// // }

// const editForm = document.forms.editForm;
// const inputName = editForm.elements.nameInput;
// const inputJob = editForm.elements.jobInput;
// editButton.addEventListener('click', function (evt) {
//   const titlePrefilled = document.querySelector('.title').textContent;
//   const subtitlePrefilled = document.querySelector('.subtitle').textContent;
//   inputName.value = titlePrefilled;
//   inputJob.value = subtitlePrefilled;
//   // const backdrop = document.querySelector('::backdrop');
//   // backdrop.addEventListener('click', transitionPopover);
//   // transitionPopover();
// }); 
// editForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   if (inputName.value !== "" && inputJob.value !== "") {
//     document.querySelector('.title').textContent = inputName.value;
//     document.querySelector('.subtitle').textContent = inputJob.value;
//   }
// });

// addButton.addEventListener('click', clearInput());

// function clearInput() {
//   const addForm = document.forms.addForm;
//   if(!addForm.elements.placeInput !== "" && addForm.elements.linkInput !== "") {
//     addForm.elements.placeInput = "";
//     addForm.elements.linkInput = "";
//   }
// }

// addForm.addEventListener('submit', function (evt) {
//   evt.preventDefault();
//   const placeInput = addForm.elements.placeInput;
//   const linkInput = addForm.elements.linkInput;
//   if (placeInput.value !== "" && linkInput.value !== "") {
//     createCard(placeInput.value, linkInput.value, true);
//     addButton.addEventListener('click', clearInput());
//     clearInput();
//   }
// });


// function createCard(cardName, cardLink, startContainer = false) {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//   const placeImage = cardElement.querySelector('.place');
//   placeImage.src = cardLink;
//   placeImage.alt = cardName;
//   placeImage.addEventListener('click', (evt) => {
//     showBigImage(evt.target);
//   });
//   cardElement.querySelector('.name').textContent = cardName;
//   const likeIcon = cardElement.querySelector('.like');
//   const deleteIcon = cardElement.querySelector('.delete');
//   likeIcon.addEventListener('click', (evt) => {
//     evt.target.classList.toggle('active');
//   });
//   deleteIcon.addEventListener('click', (evt) => {
//     deleteItem(evt.target.parentElement);
//   });
  
//   startContainer ? cardsContainer.prepend(cardElement) : 
//   cardsContainer.append(cardElement);
// }

// for (let i = 0; i < 6; i++) {
//   createCard(initialCards[i].name, initialCards[i].link);
// }

// const image = document.querySelectorAll('.place');

// function showBigImage(item) {
//   const buttonClose = document.querySelector('.close-btn-image');
//     buttonClose.disabled = 'true';
    
//     const imageBig = document.querySelector('.image-big');
//     imageBig.src = item.src;
//     document.querySelector('.caption').textContent = item.alt;
//     imageBig.addEventListener('load', () => { 
//       buttonClose.removeAttribute('disabled');
//     });
// }

// function deleteItem(item) {
//   item.remove();
// }