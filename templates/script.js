window.addEventListener("DOMContentLoaded",() => {
  const wishlist = new Wishlist(".wishlist", "#card", document.forms.addForm);
});

class Wishlist {
  initialCards = [
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

  constructor(container, template, form) {
    this.cardsContainer = document.querySelector(container);
    this.cardTemplate = document.querySelector(template).content;
    this.addForm = form;
    this.lastRow = null;
    this.init();
  }
  init() {
    this.initialCards.forEach((element) => {
      this.lastRow = this.checkExistingRow(this.cardsContainer);
      const card = Cards.createCard(this.cardTemplate, element.name, element.link);
      this.addCard(this.lastRow, card, element.image, element.name);
    })
    this.addForm?.addEventListener('submit', this.formHandler.bind(this));
  } 
  formHandler(evt) {
    evt.preventDefault();
    if (this.addForm?.nameInput.value !== "" && this.addForm?.linkInput.value !== "" && this.addForm?.linkGiftInput.value !=="") {
      this.lastRow = this.checkExistingRow(this.cardsContainer);
      const card = Cards.createCard(this.cardTemplate, this.addForm?.nameInput.value, this.addForm?.linkGiftInput.value);
      this.addCard(this.lastRow, card, this.addForm?.linkInput.value, this.addForm?.nameInput.value, true)
    }
  }
  checkExistingRow(cardsContainer) {
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
  addCard(row, card, imageLink, imageAlt, startContainer = false) {
    const giftImage = card.querySelector('.item__image');
    this.createCardImage(giftImage, imageLink, imageAlt);
    startContainer ? row.prepend(card) : 
    row.append(card);
    this.setAspectRatio(card, giftImage);
  }
  createCardImage(giftImage, imageLink, imageAlt) {
    giftImage.src = imageLink;
    giftImage.alt = imageAlt;
  }
  setAspectRatio(card, giftImage){
    giftImage.addEventListener('load', () => { 
      const realWidth = giftImage.naturalWidth;
      const realHeight = giftImage.naturalHeight;
      card.style.setProperty('--ratio', `${realWidth} / ${realHeight}`);
    });
    
  }
}

class Cards {
  static createCard(cardTemplate, cardName, cardLink) {
    
    const cardElement = cardTemplate.querySelector('.item').cloneNode(true);
  
    // create link for gift-card
    const giftLink = cardElement.querySelector('.info__name');
    giftLink.textContent = cardName;
    giftLink.href = cardLink;
  
  
    const deleteIcon = cardElement.querySelector('.delete');
    
    deleteIcon.addEventListener('click', (evt) => {
      evt.target.parentElement.remove();
    });

    return cardElement;
  }
}