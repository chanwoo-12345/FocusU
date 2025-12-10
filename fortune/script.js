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


function createCards() {
app.innerHTML = "";
for (let i = 0; i < 5; i++) {
const card = document.createElement("div");
card.className = "tarot-card";
card.innerHTML = `<div class="back"></div><div class="front">🌟</div>`;


card.addEventListener("click", () => {
if (document.querySelector(".tarot-card.flipped")) return; // 다른 카드 달성시 도출
card.classList.add("flipped");
showFortune();
});
app.appendChild(card);
}
}


function showFortune() {
const bubble = document.createElement("div");
bubble.className = "fortune-message";
const random = fortunes[Math.floor(Math.random() * fortunes.length)];
bubble.innerText = random;
app.appendChild(bubble);
}


createCards();
