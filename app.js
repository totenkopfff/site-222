// ================================
//        ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
// ================================
const modalBg = document.getElementById("modal-bg");
const modalTitle = document.getElementById("modal-title");
const modalPrice = document.getElementById("modal-price");
const qtyInput = document.getElementById("qty");
const addCartBtn = document.getElementById("add-cart");
const closeBtn = document.getElementById("close");
const cartCount = document.createElement("div");

let currentItem = null;
let currentPrice = 0;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartUI();


// ================================
//           КОРЗИНА UI
// ================================
function updateCartUI() {
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  cartCount.textContent = count;
  cartCount.className = "cart-count";

  // прикрепляем в шапку только один раз
  if (!document.querySelector(".cart-count")) {
    document.querySelector("header").appendChild(cartCount);
  }
}


// ================================
//        АНМАЦИЯ "ВЗЛЁТА"
// ================================
function flyToCart(button) {
  const rect = button.getBoundingClientRect();
  const cartRect = cartCount.getBoundingClientRect();

  const clone = button.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";
  clone.style.opacity = "0.8";
  clone.style.zIndex = 9999;
  clone.style.transition = "all .6s cubic-bezier(.3,.7,.4,1.4)";
  clone.style.pointerEvents = "none";

  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = cartRect.left + "px";
    clone.style.top = cartRect.top + "px";
    clone.style.transform = "scale(.3)";
    clone.style.opacity = "0";
  }, 10);

  setTimeout(() => clone.remove(), 650);
}


// ================================
//   ОТКРЫТИЕ МОДАЛКИ ПРИ ПОКУПКЕ
// ================================
document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    currentItem = card.dataset.item;
    currentPrice = Number(card.dataset.price);

    modalTitle.textContent = currentItem;
    modalPrice.textContent = currentPrice;

    qtyInput.value = 1;

    modalBg.style.display = "flex";
  });
});


// ================================
//         ЗАКРЫТИЕ МОДАЛКИ
// ================================
closeBtn.onclick = () => {
  modalBg.style.display = "none";
};

modalBg.onclick = (e) => {
  if (e.target === modalBg) modalBg.style.display = "none";
};


// ================================
//         ДОБАВИТЬ В КОРЗИНУ
// ================================
addCartBtn.onclick = () => {
  const qty = Number(qtyInput.value);

  // ищем, есть ли уже такая позиция
  const existing = cart.find((item) => item.name === currentItem);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      name: currentItem,
      price: currentPrice,
      qty: qty,
    });
  }

  // сохранить
  localStorage.setItem("cart", JSON.stringify(cart));

  // обновить UI
  updateCartUI();

  // анимация
  flyToCart(addCartBtn);

  modalBg.style.display = "none";
};


// ================================
//     КОНСОЛЬНАЯ ПРОВЕРКА
// ================================
console.log("%cКорзина успешно подключена!", "color:#4cff4c");
