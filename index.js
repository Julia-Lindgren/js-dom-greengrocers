const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      type: 'vegetable'
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      type: 'vegetable'
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      type: 'fruit'
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      type: 'fruit'
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      type: 'vegetable'
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      type: 'fruit'
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      type: 'vegetable'
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      type: 'fruit'
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      type: 'fruit'
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      type: 'vegetable'
    }
  ],
  cart: []
};



const storeItemList = document.querySelector('.store--item-list');

function renderStoreItems(filteredItems) {
  filteredItems.forEach(item => {
    
    const listItem = document.createElement('li');

    const itemIconDiv = document.createElement('div');
    itemIconDiv.classList.add('store--item-icon');

    const itemImage = document.createElement('img');
    itemImage.src = `assets/icons/${item.id}.svg`;
    itemImage.alt = item.name;

    itemIconDiv.appendChild(itemImage);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add to cart';

    addButton.addEventListener('click', () => {
      console.log('Clicked')
      addItemToCart(item.id);
    });

    listItem.appendChild(itemIconDiv);
    listItem.appendChild(addButton);

    storeItemList.appendChild(listItem);
  });
}

const filterButtons = document.querySelectorAll('.filterBtn');

function filterItems(category) {

  storeItemList.innerHTML = '';

  const filteredItems = state.items.filter(item => {
    if (category === 'all') return true;
    
    return item.type === category;
  });

  renderStoreItems(filteredItems);
}

function addItemToCart(itemId) {
  const cartItem = state.cart.find(item => item.id === itemId);
  
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    state.cart.push({ id: itemId, quantity: 1 });
  }

  renderCartItems()
}

const cartItemList = document.querySelector('.cart--item-list');
const totalNumber = document.querySelector('.total-number');

function renderCartItems() {
  cartItemList.innerHTML = '';

  state.cart.forEach(cartItem => {
    
    const item = state.items.find(item => item.id === cartItem.id);

    const listItem = document.createElement('li');

    const itemIcon = document.createElement('img');
    itemIcon.classList.add('cart--item-icon');
    itemIcon.src = `assets/icons/${item.id}.svg`;
    itemIcon.alt = item.name;

    const itemName = document.createElement('p');
    itemName.textContent = item.name;

    const minusButton = document.createElement('button');
    minusButton.classList.add('quantity-btn', 'remove-btn', 'center');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => {
      updateCartItemQuantity(cartItem.id, -1);
    });

    const quantityText = document.createElement('span');
    quantityText.classList.add('quantity-text', 'center');
    quantityText.textContent = cartItem.quantity;

    const plusButton = document.createElement('button');
    plusButton.classList.add('quantity-btn', 'add-btn', 'center');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => {
      updateCartItemQuantity(cartItem.id, 1);
    });

    listItem.appendChild(itemIcon);
    listItem.appendChild(itemName);
    listItem.appendChild(minusButton);
    listItem.appendChild(quantityText);
    listItem.appendChild(plusButton);

    cartItemList.appendChild(listItem);
  });

  updateTotal();
}

function updateCartItemQuantity(itemId, change) {
  const cartItem = state.cart.find(item => item.id === itemId);
  
  if (cartItem) {
    cartItem.quantity += change;

    if (cartItem.quantity <= 0) {
      state.cart = state.cart.filter(item => item.id !== itemId);
    }
  }

  renderCartItems();
}

function updateTotal() {
  const total = state.cart.reduce((acc, cartItem) => {
    const item = state.items.find(item => item.id === cartItem.id);
    return acc + (item.price * cartItem.quantity);
  }, 0);
  
  totalNumber.textContent = `£${total.toFixed(2)}`;
}

renderStoreItems(state.items);


