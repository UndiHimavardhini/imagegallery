const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const counter = document.getElementById("counter");
const caption = document.getElementById("caption");

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  updateModal();
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

function updateModal() {
  modalImg.src = images[currentIndex].src;
  caption.textContent = images[currentIndex].alt;
  counter.textContent = `${currentIndex + 1} / ${images.length}`;
}

images.forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));
});

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModal();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateModal();
};

closeBtn.onclick = closeModal;

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

/* Swipe support (mobile) */
let startX = 0;
modal.addEventListener("touchstart", e => startX = e.touches[0].clientX);
modal.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextBtn.click();
  if (endX - startX > 50) prevBtn.click();
});
