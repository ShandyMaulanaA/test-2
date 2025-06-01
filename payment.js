// === Untuk payment.html ===

document.getElementById("paymentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const selected = document.querySelector('input[name="metode"]:checked');
  if (!selected) {
    alert("Silakan pilih salah satu metode pembayaran.");
    return;
  }

  const metode = selected.value;
  localStorage.setItem("paymentMethod", metode);

  // Redirect sesuai metode
  switch (metode) {
    case "Tunai":
      window.location.href = "instruksi-tunai.html"; break;
    case "Transfer Bank":
      window.location.href = "instruksi-transfer.html"; break;
    case "Virtual Account":
      window.location.href = "instruksi-va.html"; break;
    case "QRIS":
      window.location.href = "instruksi-qris.html"; break;
    case "Kartu Kredit":
      window.location.href = "instruksi-kartu.html"; break;
  }
});
