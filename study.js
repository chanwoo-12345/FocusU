// -------------------------
// 접기/펼치기 기능
// -------------------------
document.querySelectorAll(".toggle-title").forEach(title => {
  title.addEventListener("click", () => {
    const list = title.nextElementSibling;
    list.style.display = list.style.display === "none" ? "block" : "none";
  });
});


// -------------------------
// 내가 저장한 사이트 로드
// -------------------------
const mySitesList = document.getElementById("mySitesList");

function loadMySites() {
  const saved = JSON.parse(localStorage.getItem("mySites") || "[]");
  mySitesList.innerHTML = "";

  saved.forEach((site, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="${site.url}" target="_blank">${site.name}</a>
      <button class="delete-btn" onclick="deleteSite(${index})">❌</button>
    `;

    mySitesList.appendChild(li);
  });
}

loadMySites();


// -------------------------
// 사이트 추가 기능
// -------------------------
document.getElementById("addSiteBtn").addEventListener("click", () => {
  const name = document.getElementById("siteName").value.trim();
  const url = document.getElementById("siteURL").value.trim();

  if (!name || !url) {
    alert("사이트 이름과 주소를 입력해주세요!");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("mySites") || "[]");
  saved.push({ name, url });

  localStorage.setItem("mySites", JSON.stringify(saved));

  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";

  loadMySites();
});


// -------------------------
// 사이트 삭제 기능
// -------------------------
function deleteSite(index) {
  const saved = JSON.parse(localStorage.getItem("mySites") || "[]");
  saved.splice(index, 1);
  localStorage.setItem("mySites", JSON.stringify(saved));
  loadMySites();
}
