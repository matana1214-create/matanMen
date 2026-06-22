// ===================================
// קוד לסליידר ההמלצות (Reviews)
// ===================================
let currentIdx = 0;
const slides = document.querySelectorAll(".slide");
const slider = document.getElementById("slider");
const dotsContainer = document.getElementById("dotsContainer");

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    resetAutoPlay();
    goToSlide(i);
  });
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider() {
  slider.style.transform = `translateX(${currentIdx * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIdx);
  });
}

function moveSlide(direction) {
  currentIdx += direction;
  if (currentIdx < 0) currentIdx = slides.length - 1;
  if (currentIdx >= slides.length) currentIdx = 0;
  updateSlider();
}

function goToSlide(index) {
  currentIdx = index;
  updateSlider();
}

function handleBtnClick(direction) {
  resetAutoPlay();
  moveSlide(direction);
}

let autoPlayInterval = setInterval(() => {
  moveSlide(1);
}, 5000);

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
}

let touchStartX = 0;
let touchEndX = 0;

const wrapper = document.querySelector(".slider-wrapper");
wrapper.addEventListener(
  "touchstart",
  (e) => {
    resetAutoPlay();
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true },
);

wrapper.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true },
);

function handleSwipe() {
  if (touchStartX - touchEndX > 50) moveSlide(1);
  if (touchEndX - touchStartX > 50) moveSlide(-1);
}

// ===================================
// קוד לגלריות בקטלוג (תמונות שירות)
// ===================================
function scrollGallery(btn, direction) {
  // מציאת הגלריה הספציפית בתוך הכרטיס שנלחץ
  const container = btn.closest(".gallery-container");
  const gallery = container.querySelector(".catalog-gallery");

  // גלילה ברוחב המלא של הגלריה (תמונה אחת)
  const scrollAmount = gallery.clientWidth;

  // התאמת כיוון גלילה לאתר מימין לשמאל (RTL)
  if (direction === "left") {
    gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  } else {
    gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
}
