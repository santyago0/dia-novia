onload = () => {
  document.body.classList.remove("container");
  setTimeout(() => {
    var btn = document.getElementById("nextBtn");
    if (btn) btn.classList.add("show");
  }, 6000);
};
