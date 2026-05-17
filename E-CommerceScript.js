const images = [
    'image-product-1.jpg',
    'image-product-2.jpg',
    'image-product-3.jpg',
    'image-product-4.jpg'
  ];

  const mainImage = document.querySelector('.main-image');
  const lightboxImage = document.querySelector('.lightbox-main');
  const thumbs = document.querySelectorAll('.thumb');
  const lightboxThumbs = document.querySelectorAll('.lightbox-thumb');
  const lightbox = document.querySelector('.lightbox');

  let currentImage = 0;
  let quantity = 0;
  let cartQuantity = 0;

  function updateGallery(index) {
    currentImage = index;

    mainImage.src = images[index];
    lightboxImage.src = images[index];

    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });

    lightboxThumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      updateGallery(Number(thumb.dataset.index));
    });
  });

  lightboxThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      updateGallery(Number(thumb.dataset.index));
    });
  });

  mainImage.addEventListener('click', () => {
    if(window.innerWidth > 768) {
      lightbox.classList.add('active');
    }
  });

  document.querySelector('.close-lightbox').addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    currentImage = (currentImage + 1) % images.length;
    updateGallery(currentImage);
  });

  document.querySelector('.prev-btn').addEventListener('click', () => {
    currentImage = (currentImage - 1 + images.length) % images.length;
    updateGallery(currentImage);
  });

  const quantityValue = document.querySelector('.quantity-value');

  document.querySelector('.plus-btn').addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
  });

  document.querySelector('.minus-btn').addEventListener('click', () => {
    if(quantity > 0) {
      quantity--;
      quantityValue.textContent = quantity;
    }
  });

  const cartBody = document.querySelector('.cart-body');
  const cartCount = document.querySelector('.cart-count');

  document.querySelector('.add-btn').addEventListener('click', () => {
    if(quantity === 0) return;

    cartQuantity += quantity;

    cartCount.style.display = 'block';
    cartCount.textContent = cartQuantity;

    renderCart();
  });

  function renderCart() {
    if(cartQuantity === 0) {
      cartBody.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
      cartCount.style.display = 'none';
      return;
    }

    const total = (125 * cartQuantity).toFixed(2);

    cartBody.innerHTML = `
      <div class="cart-item">
        <div class="cart-product">
          <img src="image-product-1-thumbnail.jpg" alt="product">

          <div class="cart-info">
            <p>Fall Limited Edition Sneakers</p>
            <p>$125.00 x ${cartQuantity} <span class="cart-total">$${total}</span></p>
          </div>

          <button class="delete-btn">
            <img src="icon-delete.svg" alt="delete">
          </button>
        </div>

        <button class="checkout-btn">Checkout</button>
      </div>
    `;

    document.querySelector('.delete-btn').addEventListener('click', () => {
      cartQuantity = 0;
      renderCart();
    });
  }

  document.querySelector('.cart-btn').addEventListener('click', () => {
    document.querySelector('.cart-dropdown').classList.toggle('active');
  });

  const nav = document.querySelector('nav');
  const overlay = document.querySelector('.mobile-overlay');

  document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
    nav.classList.add('active');
    overlay.classList.add('active');
  });

  overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    overlay.classList.remove('active');
  });

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
      lightbox.classList.remove('active');
    }

    if(lightbox.classList.contains('active')) {
      if(e.key === 'ArrowRight') {
        currentImage = (currentImage + 1) % images.length;
        updateGallery(currentImage);
      }

      if(e.key === 'ArrowLeft') {
        currentImage = (currentImage - 1 + images.length) % images.length;
        updateGallery(currentImage);
      }
    }
  });