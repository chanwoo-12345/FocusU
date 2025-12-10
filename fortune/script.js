
const fortunes = [
  "오늘은 새로운 도전을 해보기에 좋은 날이에요!",
  "지금 하고 있는 일에 집중해보세요.",
  "예상치 못한 행운이 찾아올지도 몰라요!"
];

function getFortune() {
  const random = Math.floor(Math.random() * fortunes.length);
  document.getElementById('app').innerText = fortunes[random];
}

window.onload = getFortune;
