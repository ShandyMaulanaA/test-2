function masukSebagaiTamu() {
  // Simulasi login tamu
  localStorage.setItem("userName", "Tamu");
  localStorage.setItem("userPhone", "0000000000");
  window.location.href = "dashboard.html";
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const alamat = document.getElementById("alamat").value;

  localStorage.setItem("userName", username);
  localStorage.setItem("userAddress", alamat);
  window.location.href = "dashboard.html";
});

