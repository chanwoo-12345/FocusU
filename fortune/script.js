const fortunes = [
  "지금 하고 있는 일에 집중해보세요.",
  "핸드폰의 유혹을 뿌리치세요.",
  "오늘은 새로운 아이디어가 떠오르는 날입니다.",
  "누군가의 도움이 필요한 날이에요.",
  "기회는 준비된 자에게 옵니다.",
  "오늘은 무리하지 말고 쉬어가세요.",
  "감정에 휘둘리지 마세요.",
  "작은 성취가 큰 자신감이 됩니다.",
  "결단력 있는 행동이 필요한 순간입니다.",
  "오늘 하루 나 자신을 믿어보세요."
];

// 카드 이미지 배열 (index 0~9과 fortunes 배열의 메시지 1:1 매칭)
const cardImages = [
  "./assets/card1.png",
  "./assets/card2.png",
  "./assets/card3.png",
  "./assets/card4.png",
  "./assets/card5.png",
  "./assets/card6.png",
  "./assets/card7.png",
  "./assets/card8.png",
  "./assets/card9.png",
  "./assets/card10.png"
];

// 5개만 무작위로 고르고, 각각 메시지 index 포함
const shuffledCards = [];
const usedIndexes = new Set();
while (shuffledCards.length < 5) {
  const idx = Math.floor(Math.random() * fortunes.length);
  if (!usedIndexes.has(idx)) {
    usedIndexes.add(idx);
    shuffledCards.push({ index: idx, image: cardImages[idx], message: fortunes[idx] });
  }
}

// 페이지 로드 후 카드 요소에 뒷면 이미지와 데이터 속성 추가
window.onload = () => {
  const cardElements = document.querySelectorAll('.card');
  cardElements.forEach((card, i) => {
    if (shuffledCards[i]) {
      card.dataset.index = shuffledCards[i].index;
      card.dataset.image = shuffledCards[i].image;
      card.dataset.message = shuffledCards[i].message;
    }
  });
};

let cardDrawn = false;

function drawCard(cardElement) {
  if (cardDrawn) return; // 이미 뽑았으면 리턴
  cardDrawn = true;

  const img = cardElement.dataset.image;
  const message = cardElement.dataset.message;

  // 앞면 이미지로 변경
  cardElement.classList.add('flipped');
  cardElement.style.backgroundImage = `url('${img}')`;

  // 메시지 출력
  const messageEl = document.getElementById("fortuneMessage");
  messageEl.textContent = "💬 " + message;
}

