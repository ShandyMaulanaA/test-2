// === Menampilkan daftar riwayat pesanan dari localStorage ===

let currentPage = 0;
const itemsPerPage = 3;

document.addEventListener("DOMContentLoaded", () => {
  const riwayat = JSON.parse(localStorage.getItem("riwayatPesanan")) || [];
  const container = document.getElementById("listRiwayat");

  function displayPage(page) {
    container.innerHTML = "";
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const dataToShow = riwayat.slice(start, end);

    if (dataToShow.length === 0) {
      container.innerHTML = "<p>Tidak ada pesanan ditemukan.</p>";
      return;
    }

    dataToShow.forEach((item, i) => {
      const index = start + i;
      const id = `MKL-${item.booking.tanggal.replace(/-/g, "")}-${String(index + 1).padStart(3, "0")}`;

      const card = document.createElement("div");
      card.className = "riwayat-card";

      card.innerHTML = `
        <h4>Order #${id}</h4>
        <p><strong>Nama:</strong> ${item.booking.nama}</p>
        <p><strong>Tanggal:</strong> ${item.booking.tanggal}</p>
        <p><strong>Jam:</strong> ${item.booking.jam}</p>
        <p><strong>Alamat:</strong> ${item.booking.alamat}</p>
        <p><strong>Layanan:</strong> ${formatLayanan(item.order.service)} - ${item.order.weight} kg</p>
        <p><strong>Total:</strong> Rp${item.order.total.toLocaleString("id-ID")}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <p><strong>Pembayaran:</strong> ${item.metode}</p>
        <div class="btn-wrap">
          <button class="btn-track" data-index="${index}">Lacak Status</button>
          <button onclick="alert('Kurir dihubungi. Harap tunggu...')">Hubungi Kurir</button>
        </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".btn-track").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        localStorage.setItem("trackingItem", JSON.stringify(riwayat[index]));
        window.location.href = "tracking.html";
      });
    });
  }

  function formatLayanan(code) {
    switch (code) {
      case "wash": return "Cuci Kering";
      case "iron": return "Cuci Setrika";
      case "dry": return "Cuci Kering + Lipat";
      default: return code;
    }
  }

  document.getElementById("prevBtn").onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      displayPage(currentPage);
    }
  };

  document.getElementById("nextBtn").onclick = () => {
    if ((currentPage + 1) * itemsPerPage < riwayat.length) {
      currentPage++;
      displayPage(currentPage);
    }
  };

  document.getElementById("urutkanBtn").onclick = () => {
    riwayat.reverse();
    currentPage = 0;
    displayPage(currentPage);
  };

  displayPage(currentPage);
});
