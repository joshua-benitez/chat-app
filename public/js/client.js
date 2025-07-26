// Initialize socket.io
const socket = io("http://localhost:5500");
const username = prompt("Enter your name:");
// Function to send a message
function sendMessage() {
  const input = document.querySelector("#message-input");
  const message = input.value.trim();

  if (message) {
    socket.emit("chat message", data, () => {
      input.value = "";
    });
  }
}

// Function to display a message in the chat
function displayMessage(message) {
  const messages = document.querySelector("#messages");
  const msg = document.createElement("div");
  msg.textContent = message;
  messages.appendChild(msg);
}

// Function to handle form submission
document
  .querySelector("#chat-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage();
  });

// Function to handle the 'connect' event
socket.on("connect", function () {
  console.log("Connected to server");
});
// Function to handle the 'message' event
socket.on("chat message", function (data) {});

// Function to handle the 'disconnect' event
socket.on("disconnect", function () {
  console.log("Disconnected from server");
});

// Function to get time stamp
function getTimeStamp() {
  const now = new Date();
  return now.toLocaleTimeString();
}

// Add time stamp to messages
socket.on("chat message", function (data) {
  const timeStamp = getTimeStamp();
  displayMessage(`${data.username} [${timeStamp}]: ${data.message}`);
});
