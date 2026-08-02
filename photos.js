document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".photo-card");
  const downloadZone = document.getElementById("downloadZone");
  const downloadBtn = document.getElementById("downloadBtn");

  // Small random rotation for scrapbook feel, applied after entrance animation
  cards.forEach((card) => {
    const baseRot = parseFloat(card.dataset.rot || "0");
    card.style.setProperty("--rest-rot", `${baseRot}deg`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  cards.forEach((card, i) => {
    // Stagger via transition-delay so each card animates one at a time
    card.style.transitionDelay = `${(i % 3) * 0.12}s`;
    observer.observe(card);
  });

  // Classify images by orientation (landscape / portrait) so CSS can adapt
  const imgs = document.querySelectorAll('.photo-card img');
  function classifyImage(img) {
    const card = img.closest('.photo-card');
    if (!card) return;
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (w >= h) {
      card.classList.add('landscape');
      card.classList.remove('portrait');
    } else {
      card.classList.add('portrait');
      card.classList.remove('landscape');
    }
  }

  imgs.forEach((img) => {
    if (img.complete && img.naturalWidth) {
      classifyImage(img);
    } else {
      img.addEventListener('load', () => classifyImage(img));
      setTimeout(() => { if (img.naturalWidth) classifyImage(img); }, 300);
    }
  });

  const downloadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          downloadZone.classList.add("visible");
          downloadObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  downloadObserver.observe(downloadZone);

  downloadBtn.addEventListener("click", () => {
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Descargando...";

    try {
      const link = document.createElement("a");
      link.download = "collage_fotos.png";
      link.href = "img/collage_fotos.png";
      link.click();
    } catch (err) {
      downloadBtn.textContent = "Error. Inténtalo de nuevo";
      console.error(err);
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Sorpresita 🎁';
    }
  });
});
