const fortunes = [
  "지금 하고 있는 일에 집중해보세요.",
  "핸드폰의 유혹을 뿌리치세요.",
  "누군가의 도움이 필요한 날이에요.",
  "오늘은 새로운 아이디어가 떠오르는 날입니다.",
  "기회는 준비된 자에게 옵니다.",
  "오늘은 무리하지 말고 쉬어가세요.",
  "감정에 휘둘리지 마세요.",
  "작은 성취가 큰 자신감이 됩니다.",
  "결단력 있는 행동이 필요한 순간입니다.",
  "오늘 하루 나 자신을 믿어보세요."
];

// 1:1 대응되는 앞면 이미지 경로 (이미지 파일명은 card1.png ~ card10.png 로 가정)
const cardImages = [
  './assets/card1.png',
  './assets/card2.png',
  './assets/card3.png',
  './assets/card4.png',
  './assets/card5.png',
  './assets/card6.png',
  './assets/card7.png',
  './assets/card8.png',
  './assets/card9.png',
  './assets/card10.png'
];

// 무작위로 fortunes와 images를 섞은 뒤 5개 선택
let selectedCards = []; // [{ fortune: "...", image: "..." }]
let cardDrawn = false;

window.onload = function () {
  const container = document.querySelector(".card-container");

  // 섞기
  const indices = [...Array(10).keys()]; // [0,1,...,9]
  shuffle(indices);
  const chosen = indices.slice(0, 5);

  // 카드 5장 선택
  selectedCards = chosen.map(i => ({
    fortune: fortunes[i],
    image: cardImages[i]
  }));

  // 카드 DOM 생성
  container.innerHTML = "";
  selectedCards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = "card";
    div.style.backgroundImage = "url('background.png.png')"; // 뒷면
    div.setAttribute("data-index", index);
    div.onclick = () => drawCard(div, index);
    container.appendChild(div);
  });
};

// 카드 클릭 시 처리
function drawCard(cardElement, index) {
  if (cardDrawn) return;
  cardDrawn = true;

  const selected = selectedCards[index];

  // 카드 앞면 이미지로 변경 + 뒤집기 효과
  cardElement.classList.add('flipped');
  cardElement.style.backgroundImage = `url('${selected.image}')`;

  // 운세 텍스트 표시
  const message = document.getElementById("fortuneMessage");
  message.textContent = "💬 " + selected.fortune;
}

// 배열 섞기 함수 (Fisher–Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
