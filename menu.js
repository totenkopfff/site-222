
document.addEventListener('DOMContentLoaded', function() {
    const modalBg = document.getElementById('modal-bg');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const qtyInput = document.getElementById('qty');
    const addCartBtn = document.getElementById('add-cart');
    const closeBtn = document.getElementById('close');
    
   
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.menu-card');
            const item = card.getAttribute('data-item');
            const price = card.getAttribute('data-price');
            
            modalTitle.textContent = item;
            modalPrice.textContent = price;
            qtyInput.value = 1;
            
            modalBg.style.display = 'flex';
        });
    });
    
    
    addCartBtn.addEventListener('click', function() {
        const item = modalTitle.textContent;
        const price = parseInt(modalPrice.textContent);
        const quantity = parseInt(qtyInput.value);
        const total = price * quantity;
        
        alert(`Добавлено в корзину: ${item} - ${quantity} шт. (${total} ₽)`);
        modalBg.style.display = 'none';
    });
    
  
    closeBtn.addEventListener('click', function() {
        modalBg.style.display = 'none';
    });
    
    
    modalBg.addEventListener('click', function(e) {
        if (e.target === modalBg) {
            modalBg.style.display = 'none';
        }
    });
});