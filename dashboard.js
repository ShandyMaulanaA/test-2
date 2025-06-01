// === Untuk dashboard.html ===

document.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem("userName") || "Tamu";
  document.getElementById("welcome").innerText = `Selamat datang, ${name}`;
});