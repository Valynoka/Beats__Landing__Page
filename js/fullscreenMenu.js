const fullscreenButton = document.querySelector(".hamburger");
const fullscreenMenu = document.querySelector(".burger-menu");

fullscreenButton.addEventListener("click", function (e) {
  e.preventDefault();
  fullscreenButton.classList.toggle("hamburger--active");
  fullscreenMenu.classList.toggle("burger-menu--active");
  $("body").toggleClass("lock");
})


