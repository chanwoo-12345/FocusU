
document.getElementById('app').innerHTML = `
  <input id="taskInput" placeholder="할 일을 입력하세요" />
  <button onclick="addTask()">추가</button>
  <ul id="taskList"></ul>
`;

function addTask() {
  const input = document.getElementById('taskInput');
  const list = document.getElementById('taskList');
  const item = document.createElement('li');
  item.textContent = input.value;
  list.appendChild(item);
  input.value = '';
}
