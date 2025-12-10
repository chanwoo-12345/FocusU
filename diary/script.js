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
  today.setHours(0, 0, 0, 0);  // 시간 제거
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
    const emoji = diaryText ? '📘' : '';

    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `
      ${day}
      <span class="emoji">${emoji}</span>
    `;

    // 과거 날짜 비활성화
    if (dateObj < today) {
      dayDiv.classList.add('past-day');
      dayDiv.classList.add('disabled');
      dayDiv.onclick = null;
    } else {
      dayDiv.onclick = () => openModal(dateStr);
    }

    calendar.appendChild(dayDiv);
  }
}

function openModal(dateStr) {
  selectedDate = dateStr;
  modalDate.innerText = `${dateStr}`;
  diaryInput.value = localStorage.getItem(dateStr) || '';
  diaryModal.style.display = 'flex';
}

function closeModal() {
  diaryModal.style.display = 'none';
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
