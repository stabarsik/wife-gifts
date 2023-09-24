const initialCards = [
  {
    name: 'Айфон пятнадцатый',
    link: 'https://www.apple.com/iphone-15-pro/',
    image: 'https://www.apple.com/v/iphone-15-pro/a/images/overview/closer-look/blue_titanium__wsqgpa9i1822_large_2x.jpg'
  },
  {
    name: 'Bottega Veneta Small Jodie',
    link: 'https://www.bottegaveneta.com/en-us/small-jodie-jacobean-600261V38S12282.html',
    image: 'https://bottega-veneta.dam.kering.com/m/2ec387e1347c19a7/Large-600261V38S12282_A.jpg?v=1'
  },
  {
    name: 'В Сербию',
    link: 'https://www.aviasales.ru/',
    image: 'https://incrussia.ru/wp-content/uploads/2022/08/1-1.jpg'
  },
  {
    name: 'Билет на Пятницу',
    link: 'https://somewhere.show/5nizza-montenegroru',
    image: 'https://thumb.tildacdn.com/tild6166-6431-4632-b633-313839653831/-/format/webp/1920N1080-3.jpg'
  },
  {
    name: 'Найки хуарачи',
    link: 'https://www.nike.com/t/air-huarache-craft-womens-shoes-Cp4dSR/DQ8031-100',
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/6eff4067-24d3-47d8-b524-6553d17ba71f/air-huarache-craft-womens-shoes-Cp4dSR.png'
  },
  {
    name: 'Лонгборд левый какой-то',
    link: 'https://sporttop.com.ua/ua/catalog/aktivnyy_sport/skeytbordy/longbordy/29346/',
    image: 'https://sporttop.com.ua/upload/iblock/30f/30f85a99a0b98a777332df6bcc6d20b0.jpg'
  }
];

const cardsContainer = document.querySelector('.wishlist');
const cardTemplate = document.querySelector('#card').content;
const addForm = document.forms.addForm;

for (let i = 0; i < 6; i++) {
  createCard(initialCards[i].name, initialCards[i].image, initialCards[i].link);
}

// const images = document.querySelectorAll('.item__image');
// images.forEach((image) => {
//   let realWidth = image.naturalWidth;
//   let realHeight = image.naturalHeight;
//   image.parentElement.style.setProperty('--ratio', `${realWidth} / ${realHeight}`);
//   console.log("Original width=" + realWidth + ", " + "Original height=" + realHeight);
// })

// addButton.addEventListener('click', clearInput());

function clearInput() {
  if(!addForm.elements.nameInput !== "" && addForm.elements.linkInput !== "" && addForm.elements.linkGiftInput !== "") {
    addForm.elements.nameInput = "";
    addForm.elements.linkInput = "";
    addForm.elements.linkGiftInput = "";
  }
}

addForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const nameInput = addForm.elements.nameInput;
  const linkInput = addForm.elements.linkInput;
  const linkGiftInput = addForm.elements.linkGiftInput;
  if (nameInput.value !== "" && linkInput.value !== "" && linkGiftInput.value !=="") {
    createCard(nameInput.value, linkInput.value, linkGiftInput.value, true);
    clearInput();
  }
});

function createCard(cardName, imageLink, cardLink, startContainer = false) {
  const lastRow = checkExistingRow(cardsContainer);
  
  const cardElement = cardTemplate.querySelector('.item').cloneNode(true);

  //create image
  const giftImage = cardElement.querySelector('.item__image');
  giftImage.src = imageLink;
  giftImage.alt = cardName;

  // create link for gift-card
  const giftLink = cardElement.querySelector('.info__name');
  giftLink.textContent = cardName;
  giftLink.href = cardLink;


  const deleteIcon = cardElement.querySelector('.delete');

  deleteIcon.addEventListener('click', (evt) => {
    deleteItem(evt.target.parentElement);
  });
  
  startContainer ? lastRow.prepend(cardElement) : 
  lastRow.append(cardElement);

    //setting aspect-ratio
    const realWidth = giftImage.naturalWidth;
    const realHeight = giftImage.naturalHeight;
    cardElement.style.setProperty('--ratio', `${realWidth} / ${realHeight}`);
}

function checkExistingRow(cardsContainer) {
  let lastRow = {};
  const existingRows = cardsContainer.querySelectorAll('.row');
  existingRows.forEach((element, index) =>{
    if (index === existingRows.length-1){
      if (!element.classList.contains('last-row')){
        element.classList.add('last-row');
      }
      lastRow = element;
    }
  })
  if (lastRow.childElementCount > 1) {
    const row = document.createElement('div');
    cardsContainer.append(row);

    row.classList.add('row');
    lastRow.classList.remove('last-row');
    row.classList.add('last-row');
    return row;
  }
  return lastRow;
}

function showBigImage(item) {
  const buttonClose = document.querySelector('.close-btn-image');
    buttonClose.disabled = 'true';
    
    const imageBig = document.querySelector('.image-big');
    imageBig.src = item.src;
    document.querySelector('.caption').textContent = item.alt;
    imageBig.addEventListener('load', () => { 
      buttonClose.removeAttribute('disabled');
    });
}

function deleteItem(item) {
  item.remove();
}