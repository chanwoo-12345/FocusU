document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cardContainer");
  ...
});
const fortunes = [
  "지금 하고 있는 일에 집중해보세요.",
  "핸드폰의 유혹을 뿌리치세요.",
  "누군가의 도움이 필요한 날이에요.",
  "기회는 준비된 자에게 옵니다.",
  "오늘은 새로운 아이디어가 떠오르는 날입니다.",
  "오늘은 무리하지 말고 쉬어가세요.",
  "감정에 휘둘리지 마세요.",
  "작은 성취가 큰 자신감이 됩니다.",
  "결단력 있는 행동이 필요한 순간입니다.",
  "오늘 하루 나 자신을 믿어보세요."
];

// 카드 앞면 이미지 경로 (assets 폴더 안에 card1~card10.png로 저장)
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

let selectedCards = []; // { fortune, image }
let cardDrawn = false;

window.onload = () => {
  const container = document.getElementById("cardContainer");

  // 10개 중 무작위 5개 선택
  const indices = [...Array(10).keys()];
  shuffle(indices);
  const chosen = indices.slice(0, 5);

  selectedCards = chosen.map(i => ({
    fortune: fortunes[i],
    image: cardImages[i]
  }));

  // 카드 생성
  selectedCards.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.setAttribute("data-index", index);

    const innerDiv = document.createElement("div");
    innerDiv.className = "card-inner";

    const frontDiv = document.createElement("div");
    frontDiv.className = "card-front";
    frontDiv.style.backgroundImage = `url('${card.image}')`;

    const backDiv = document.createElement("div");
    backDiv.className = "card-back";

    innerDiv.appendChild(frontDiv);
    innerDiv.appendChild(backDiv);
    cardDiv.appendChild(innerDiv);

    cardDiv.onclick = () => drawCard(cardDiv, index);
    container.appendChild(cardDiv);
  });
};

function drawCard(cardElement, index) {
  if (cardDrawn) return;
  cardDrawn = true;

  cardElement.classList.add("flipped");

  const fortune = selectedCards[index].fortune;
  const message = document.getElementById("fortuneMessage");
  message.textContent = "💬 " + fortune;
}

// Fisher-Yates Shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

