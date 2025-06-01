// === Menampilkan banyak pesanan dengan pagination ===
let currentPage = 0;
const itemsPerPage = 2;

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
      const card = document.createElement("div");
      card.className = "riwayat-card";

      card.innerHTML = `
        <h4>Order #MKL-${generateKode(item, start + i)}</h4>
        <p><strong>Tanggal:</strong> ${item.booking.tanggal}</p>
        <p><strong>Jam:</strong> ${item.booking.jam}</p>
        <p><strong>Alamat:</strong> ${item.booking.alamat}</p>
        <p><strong>Layanan:</strong> ${item.order.service} - ${item.order.weight} kg</p>
        <p><strong>Total:</strong> Rp${item.order.total.toLocaleString("id-ID")}</p>
        <p><strong>Status:</strong> ${item.status}</p>
        <div class="btn-wrap">
          <button>Lacak Status</button>
          <button>Hubungi Kurir</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function generateKode(data, index) {
    const tanggal = data.booking.tanggal.replace(/-/g, "");
    return `${tanggal}-${String(index + 1).padStart(3, "0")}`;
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
    displayPage(currentPage);
  };

  displayPage(currentPage);
});