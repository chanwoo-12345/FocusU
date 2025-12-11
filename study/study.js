const siteNameInput = document.getElementById('siteName');
const siteURLInput = document.getElementById('siteURL');
const addSiteBtn = document.getElementById('addSiteBtn');
const mySitesList = document.getElementById('mySitesList');

// Study 페이지 전용 스토리지 키
const STORAGE_KEY = "study-sites";

// 저장된 사이트 불러오기
function loadSites() {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  saved.forEach((site, index) => {
    addSiteToList(site.name, site.url, index);
  });
}

// 리스트에 사이트 추가
function addSiteToList(name, url, index) {
  const li = document.createElement('li');

  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.textContent = name;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = "✕";
  deleteBtn.className = "delete-btn";

  deleteBtn.addEventListener('click', () => deleteSite(index));

  li.appendChild(a);
  li.appendChild(deleteBtn);
  mySitesList.appendChild(li);
}

// 사이트 추가 버튼
addSiteBtn.addEventListener('click', () => {
  const name = siteNameInput.value.trim();
  const url = siteURLInput.value.trim();

  if (!name || !url) {
    alert('사이트 이름과 주소를 모두 입력해주세요.');
    return;
  }

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    alert('주소는 http:// 또는 https:// 로 시작해야 합니다.');
    return;
  }

  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  saved.push({ name, url });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  addSiteToList(name, url, saved.length - 1);

  siteNameInput.value = '';
  siteURLInput.value = '';
});

// 삭제 기능
function deleteSite(index) {
  let saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

  saved.splice(index, 1); // 배열에서 제거

  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));

  mySitesList.innerHTML = '';
  loadSites(); // 새로 렌더링
}

// 초기 로드
loadSites();

