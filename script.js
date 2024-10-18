const deck = document.getElementById('deck');
const shuffleBtn = document.getElementById('shuffleBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const scoreDisplay = document.getElementById('scoreDisplay');
const playerNameInput = document.getElementById('playerName');

// Mảng chứa văn bản tương ứng với các số từ 1 đến 12
const cardTexts = [
  'Cascading Style Sheets', 'HyperText Markup Language', 'Tái sử dụng', 
  'Độc lập với HTML', '3 cách thiết lập', 
  'Bộ chọn {thuộc tính: giá trị;}', 'Style="thuộc tính: giá trị;"', 
  'Ngôn ngữ lập trình', 'Phải viết trong thẻ HTML', 
  'Định dạng giao diện', 'Giúp trang web có tương tác', '!DOCTYPE html'
];

// Mảng chứa số của các lá bài có đáp án đúng
const correctAnswers = [1, 3, 5, 7, 2, 4, 6];

// Tạo bộ bài 12 lá với số từ 1 đến 12
const cards = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,  // số từ 1 đến 12
  id: i           // id từ 0 đến 11
}));

let flippedCards = []; // Để theo dõi các lá bài đã lật

// Hàm tạo HTML cho các lá bài
function createCardHTML(card, index) {
  return `
    <div class="card" data-number="${card.number}">
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${cardTexts[card.number - 1]}</div>
      </div>
      <div class="card-number">Số: ${index + 1}</div>
    </div>
  `;
}

// Hàm hiển thị bài lên giao diện
function displayCards() {
  deck.innerHTML = cards
    .map((card, index) => createCardHTML(card, index))
    .join('');

  // Reset mảng flippedCards
  flippedCards = [];

  // Thêm sự kiện lật bài cho mỗi lá bài
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function () {
      const cardNumber = parseInt(card.getAttribute('data-number'));

      card.classList.toggle('is-flipped');
      
      // Nếu lá bài đã được lật thì thêm vào flippedCards
      if (card.classList.contains('is-flipped')) {
        flippedCards.push(cardNumber);
      } else {
        // Xóa lá bài nếu bị lật lại
        flippedCards = flippedCards.filter(num => num !== cardNumber);
      }
    });
  });
}

// Hàm hiển thị đáp án đúng và tính điểm
function showCorrectAnswers() {
  document.querySelectorAll('.card').forEach(card => {
    const cardNumber = parseInt(card.getAttribute('data-number'));

    // Nếu là đáp án đúng, thêm class 'correct'
    if (correctAnswers.includes(cardNumber)) {
      card.classList.add('correct');
      card.querySelector('.card-back').innerText += ' (Đúng)';
    } else {
      card.classList.add('incorrect');
      card.querySelector('.card-back').innerText += ' (Sai)';
    }
  });

  // Tính điểm
  calculateScore();
}

// Hàm tính điểm
function calculateScore() {
  let score = 0;
  const playerName = playerNameInput.value || 'Người chơi';

  // So sánh các lá bài đã lật với đáp án đúng
  flippedCards.forEach(cardNumber => {
    if (correctAnswers.includes(cardNumber)) {
      score++;  // Cộng 1 điểm nếu đúng
    } else {
      score--;  // Trừ 1 điểm nếu sai
    }
  });

  // Hiển thị điểm
  scoreDisplay.innerText = `${playerName}, điểm của bạn: ${score} / ${correctAnswers.length}`;
}

// Sự kiện khi nhấn nút trộn bài
shuffleBtn.addEventListener('click', displayCards);

// Sự kiện khi nhấn nút hiển thị đáp án đúng
showAnswerBtn.addEventListener('click', showCorrectAnswers);

// Hiển thị bài lần đầu tiên
displayCards();

