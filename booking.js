// === Untuk booking.html ===

let selectedJam = "";

document.addEventListener("DOMContentLoaded", () => {
  const timeButtons = document.querySelectorAll(".time-slot");
  timeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      timeButtons.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedJam = btn.innerText;
    });
  });

  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const tanggal = document.getElementById("tanggal").value;
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const hp1 = document.getElementById("hp1").value;
    const hp2 = document.getElementById("hp2").value;

    if (!selectedJam) {
      alert("Silakan pilih jam pengambilan atau antar.");
      return;
    }

    if (!tanggal) {
      alert("Silakan pilih tanggal booking.");
      return;
    }

    const bookingData = {
      nama,
      alamat,
      hp1,
      hp2,
      tanggal,
      jam: selectedJam
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    window.location.href = "order.html";
  });
});
