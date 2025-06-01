document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("trackingItem"));
  if (!data) {
    document.body.innerHTML = "<h2>Data tidak ditemukan.</h2>";
    return;
  }

  document.getElementById("orderCode").innerText =
    "Order MKL-" + data.booking.tanggal.replace(/-/g, "");
  document.getElementById("orderDate").innerText = data.booking.tanggal;
  document.getElementById("orderInfo").innerText =
    `${formatLayanan(data.order.service)} - ${data.order.weight} Kg - Rp${data.order.total.toLocaleString("id-ID")}`;

  document.getElementById("detailTanggal").innerText = data.booking.tanggal;
  document.getElementById("detailAlamat").innerText = data.booking.alamat;
  document.getElementById("detailCatatan").innerText = data.catatan || "-";

  const statusMap = {
    "Dijadwalkan": 0,
    "Dicuci": 1,
    "Disetrika": 2,
    "Selesai": 3
  };
  const activeStep = statusMap[data.status] || 0;

  for (let i = 0; i <= activeStep; i++) {
    const step = document.getElementById(`step-${i}`);
    if (step) step.classList.add("active");
  }
});

function formatLayanan(code) {
  switch (code) {
    case "wash": return "Cuci Kering";
    case "iron": return "Cuci Setrika";
    case "dry": return "Cuci Kering + Lipat";
    default: return code;
  }
}
