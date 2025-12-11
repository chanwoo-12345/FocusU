async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatLog = document.getElementById("chatLog");
  const userText = input.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  input.value = "";

  appendMessage("ai", "생각 중...");

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: userText })
    });

    const data = await response.json();
    const answers = document.querySelectorAll(".ai");
    if (answers.length > 0) {
      answers[answers.length - 1].textContent = data.answer;
    }
  } catch (err) {
    console.error(err);
    const answers = document.querySelectorAll(".ai");
    if (answers.length > 0) {
      answers[answers.length - 1].textContent = "오류가 발생했습니다.";
    }
  }
}

function appendMessage(role, text) {
  const chatLog = document.getElementById("chatLog");
  const msg = document.createElement("div");
  msg.className = role;
  msg.textContent = text;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}
