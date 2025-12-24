// ===============================
// Background config
// ===============================
if (typeof config !== "undefined") {
  config.BACK_COLOR = { r: 10, g: 0, b: 26 };
  config.COLORFUL = true;
  config.SHADING = true;
  config.CURL = 30;
  config.PRESSURE = 0.8;
  config.DENSITY_DISSIPATION = 0.97;
  config.VELOCITY_DISSIPATION = 0.99;
  config.SPLAT_RADIUS = 0.25;
}

// ===============================
// Node click handling
// ===============================
document.querySelectorAll('.node').forEach(node => {
  node.addEventListener('click', () => {
    const target = node.dataset.target;
    if (target) {
      window.location.href = `sections/${target}`;
    }
  });
});

// ===============================
// Chatbot logic
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatBox = document.getElementById("chat-box");

  // If we're not on the chatbot page, safely exit
  if (!input || !sendBtn || !chatBox) return;

  async function sendMessage() {
    const userInput = input.value.trim();
    if (!userInput) return;

    // Show user message
    chatBox.innerHTML += `<div class="user-msg">${userInput}</div>`;
    input.value = "";

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
      });

      const data = await res.json();

      if (data.response) {
        chatBox.innerHTML += `<div class="bot-msg">${data.response}</div>`;
      } else {
        chatBox.innerHTML += `<div class="bot-msg error">No response</div>`;
      }

    } catch (err) {
      console.error(err);
      chatBox.innerHTML += `<div class="bot-msg error">Server error</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
