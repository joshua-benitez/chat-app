// Initialize socket.io
const socket = io("http://localhost:5500");

// Function to send a message
function sendMessage() {
  const input = document.querySelector("#message-input");
  const message = input.value.trim();

  if (message) {
    // Emit the message to the server
    socket.emit("chat message", message);
    input.value = "";
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
document.querySelector("#chat-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting normally
  sendMessage(); // Call the function to send the message
});
// Function to handle the 'connect' event
socket.on("connect", function () {
  console.log("Connected to server");
  displayMessage("You are connected to the server.");
});
// Function to handle the 'message' event
socket.on("message", function (message) {
  console.log("Received message:", message);
  displayMessage("Server: " + message);
});

// Function to handle the 'disconnect' event
socket.on("disconnect", function () {
  console.log("Disconnected from server");
  displayMessage("You have been disconnected from the server.");
});

