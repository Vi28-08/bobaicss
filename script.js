const deck = document.getElementById('deck');
const shuffleBtn = document.getElementById('shuffleBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const playerNameInput = document.getElementById('playerName'); // Lấy tên người chơi

const cardTexts = [
  '3 cách thiết lập', 'Định dạng nội dung', 'Tái sử dụng', 
  'Độc lập với HTML', 'Cascading Style Sheets', 
  'Bộ chọn {thuộc tính: giá trị;}', 'Style="thuộc tính: giá trị;"', 
  'Ngôn ngữ lập trình', 'Phải viết trong thẻ HTML', 
  'HyperText Markup Language', 'Giúp trang web có tương tác', '!DOCTYPE html'
];

const correctAnswers = [1, 3, 5, 7, 2, 4, 6];

const cards = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  id: i
}));

let flippedCards = [];

// Hàm tạo HTML cho các lá bài
function createCardHTML(card) {
  return `
    <div class="card" data-number="${card.number}">
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${cardTexts[card.number - 1]}</div>
      </div>
    </div>
  `;
}

// Hàm tạo thứ tự mặc định dưới các lá bài
function createCardOrder() {
  const orderContainer = document.getElementById('orderContainer');
  orderContainer.innerHTML = '';

  cards.forEach(card => {
    const orderItem = document.createElement('div');
    orderItem.classList.add('order-item');
    orderItem.innerText = `#${card.number}`;
    orderContainer.appendChild(orderItem);
  });
}

// Hàm trộn bài ngẫu nhiên
function shuffleCards() {
  return cards.sort(() => Math.random() - 0.5);
}

// Hàm hiển thị bài lên giao diện
function displayCards() {
  deck.innerHTML = shuffleCards()
    .map(card => createCardHTML(card))
    .join('');

  flippedCards = [];

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
      const cardNumber = parseInt(card.getAttribute('data-number'));

      card.classList.toggle('is-flipped');
      
      if (card.classList.contains('is-flipped')) {
        flippedCards.push(cardNumber);
      } else {
        flippedCards = flippedCards.filter(num => num !== cardNumber);
      }
    });
  });

  createCardOrder();
}

// Hàm hiển thị đáp án đúng và tính điểm
function showCorrectAnswers() {
  document.querySelectorAll('.card').forEach(card => {
    const cardNumber = parseInt(card.getAttribute('data-number'));

    if (correctAnswers.includes(cardNumber)) {
      card
