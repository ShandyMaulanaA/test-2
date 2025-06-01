// === Untuk order.html ===

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const service = document.getElementById("service");
  const weight = document.getElementById("weight");
  const pickup = document.getElementById("pickup");

  const sumService = document.getElementById("sumService");
  const sumSubtotal = document.getElementById("sumSubtotal");
  const sumTax = document.getElementById("sumTax");
  const sumTotal = document.getElementById("sumTotal");

  function calculatePrice() {
    const hargaPerKg = {
      wash: 5000,
      iron: 7000,
      dry: 8000
    };

    const selectedService = service.value;
    const jumlah = parseFloat(weight.value);

    if (!selectedService || isNaN(jumlah)) return;

    const subtotal = hargaPerKg[selectedService] * jumlah;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    // Tampilkan
    sumService.textContent = service.options[service.selectedIndex].text;
    sumSubtotal.textContent = "Rp. " + subtotal.toLocaleString("id-ID");
    sumTax.textContent = "Rp. " + tax.toLocaleString("id-ID");
    sumTotal.textContent = "Rp. " + total.toLocaleString("id-ID");

    return {
      service: selectedService,
      weight: jumlah,
      pickup: pickup.value,
      subtotal,
      tax,
      total
    };
  }

  // Update otomatis saat user isi form
  [service, weight, pickup].forEach(input => {
    input.addEventListener("change", calculatePrice);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const order = calculatePrice();

    if (!order) {
      alert("Isi semua data terlebih dahulu.");
      return;
    }

    // Simpan ke localStorage
    localStorage.setItem("orderData", JSON.stringify(order));

    // Pindah ke halaman payment
    window.location.href = "payment.html";
  });
});
