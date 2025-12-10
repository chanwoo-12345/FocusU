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


const cardImages = [
  './assets/card1.png',
  './assets/card2.png',
  './assets/card3.png',
  './assets/card4.png',
  './assets/card5.png'
];

let cardDrawn = false;

function drawCard(cardElement) {
  if (cardDrawn) return; // 한 장만 뽑을 수 있음
  cardDrawn = true;

  // 카드 앞면 이미지 (샘플 이미지로 대체)
  cardElement.classList.add('flipped');
  cardElement.style.backgroundImage = "url('https://i.imgur.com/ME1r7jz.png')"; // 앞면 임시 이미지

  // 운세 텍스트 표시
  const message = document.getElementById("fortuneMessage");
  const randomIndex = Math.floor(Math.random() * fortunes.length);
  message.textContent = "💬 " + fortunes[randomIndex];
}
