document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Pesan Anda telah dikirim. Kami akan segera menghubungi Anda.");
    form.reset();
  });
});
