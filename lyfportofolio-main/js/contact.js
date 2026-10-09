document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    alert("Harap isi nama dan pesan terlebih dahulu!");
    return;
  }

  const ownerNumber = "6283830714313";
  const text = `Halo, saya *${name}* ingin menghubungi Anda.%0A%0A${message}`;
  const url = `https://wa.me/${ownerNumber}?text=${text}`;
  window.open(url, "_blank");
});