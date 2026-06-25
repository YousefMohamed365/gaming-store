let allGames = [];
let cart = [];
const loginform = document.getElementById('login-form');
loginform.addEventListener('submit',function(e){
    e.preventDefault();
    const userName = document.getElementById('user-name').value;
    document.getElementById('user-welcome-msg').innerHTML = `HELLO ${userName}`;
    document.getElementById('welcome-model').classList.add('hidden')
    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('main-content').classList.remove('hidden');
})
fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        allGames = data;
        displayGames(data);
    });
function displayGames(games){
    const container = document.getElementById('products-container')
    games.forEach(game => {
        container.innerHTML += `
        <div class="product-card">
                <img src="${game.image}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p class="price">${game.price} $</p>
                <button class="buy-btn" onclick='showGameDetails(${game.id})'>Purchase details</button>
            </div>
        `
    });
}
function showGameDetails(gameId) {
    const clickedGame = allGames.find(game => game.id === gameId);
    
    const modalDetails = document.getElementById('modal-details');
    
    modalDetails.innerHTML = `
        <img src="${clickedGame.image}" alt="${clickedGame.title}" style="width:100%; max-height:250px; object-fit:cover; border-radius:8px;">
        <h2 style="margin-top: 15px; color: #00ffcc;">${clickedGame.title}</h2>
        <p style="margin: 10px 0; color: #aaa; line-height: 1.5;">${clickedGame.description || 'لا يوجد وصف متاح.'}</p>
        <h3 style="color: #fff;">Price: <span style="color: #00ffcc;">${clickedGame.price} $</span></h3>
        <button onclick="addToCart(${clickedGame.id})" style="background: #00ffcc; color: #1a1f29; border: none; padding: 12px 20px; font-weight: bold; font-size: 16px; border-radius: 5px; cursor: pointer; width: 100%; margin-top: 15px; transition: 0.3s;">Add To Cart 🛒</button>
    `;
    
    document.getElementById('game-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('game-modal').classList.add('hidden');
}
function addToCart(gameId){
    const selectedGame = allGames.find(game=>game.id===gameId);
    cart.push(selectedGame);
    updateCartCount();
    closeModal();
}
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cart.length;
    }
}