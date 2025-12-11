const calendar = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const diaryModal = document.getElementById('diaryModal');
const modalDate = document.getElementById('modalDate');
const diaryInput = document.getElementById('diaryInput');

let currentDate = new Date();
let selectedDate = null;

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendar.innerHTML = '';
  monthYear.innerText = `${year}년 ${month + 1}월`;

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 요일 헤더
  for (let i = 0; i < 7; i++) {
    const weekdayDiv = document.createElement('div');
    weekdayDiv.className = 'weekday';
    weekdayDiv.innerText = weekdays[i];
    calendar.appendChild(weekdayDiv);
  }

  // 빈 칸
  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += '<div></div>';
  }

  // 날짜 렌더링
  for (let day = 1; day <= lastDate; day++) {
    const dateObj = new Date(year, month, day);
    const dateStr = `${year}-${month + 1}-${day}`;
    const diaryText = localStorage.getItem(dateStr);
    const hasDiary = diaryText && diaryText.trim() !== "";
    const emoji = hasDiary ? '📘' : '';

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `
      ${day}
      <span class="emoji">${emoji}</span>
    `;

    const emojiEl = dayDiv.querySelector(".emoji");

    // ------------------------------
    // 과거 날짜 처리
    // ------------------------------
    if (dateObj < today) {
      dayDiv.classList.add('past-day');
      dayDiv.classList.add('disabled');
      dayDiv.onclick = null;

      // ⭐ 과거라도 다이어리 작성된 경우 → 이모티콘 클릭하면 보기 가능
      if (hasDiary) {
        emojiEl.style.cursor = "pointer";
        emojiEl.onclick = (e) => {
          e.stopPropagation();
          openReadOnlyModal(dateStr);
        };
      }

    } else {
      // 미래 & 오늘 → 기존처럼 작성 가능
      dayDiv.onclick = () => openWriteModal(dateStr);
    }

    calendar.appendChild(dayDiv);
  }
}

// ------------------------------
// 작성 가능한 모달 열기
// ------------------------------
function openWriteModal(dateStr) {
  selectedDate = dateStr;
  modalDate.innerText = `${dateStr}`;

  diaryInput.value = localStorage.getItem(dateStr) || "";
  diaryInput.readOnly = false;

  document.querySelector(".modal-buttons").style.display = "flex";
  diaryModal.style.display = "flex";
}

// ------------------------------
// 읽기 전용 모달 (과거 작성된 일기 용)
// ------------------------------
function openReadOnlyModal(dateStr) {
  selectedDate = dateStr;
  modalDate.innerText = `${dateStr}`;

  diaryInput.value = localStorage.getItem(dateStr) || "";
  diaryInput.readOnly = true;

  // 저장·삭제 버튼 숨김
  document.querySelector(".modal-buttons").style.display = "none";

  diaryModal.style.display = "flex";
}

// 닫을 때 복구
function closeModal() {
  diaryModal.style.display = 'none';

  diaryInput.readOnly = false;
  document.querySelector(".modal-buttons").style.display = "flex";
}

function saveDiary() {
  if (selectedDate) {
    localStorage.setItem(selectedDate, diaryInput.value);
    renderCalendar();
    closeModal();
  }
}

function deleteDiary() {
  if (selectedDate) {
    localStorage.removeItem(selectedDate);
    renderCalendar();
    closeModal();
  }
}

function prevMonth() {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
}

function nextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

renderCalendar();
