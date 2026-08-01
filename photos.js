document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".photo-card");
  const downloadZone = document.getElementById("downloadZone");
  const downloadBtn = document.getElementById("downloadBtn");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  cards.forEach((card) => observer.observe(card));

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

  downloadBtn.addEventListener("click", async () => {
    downloadBtn.disabled = true;
    downloadBtn.textContent = "Creando collage...";
    try {
      await generateCollage();
    } catch (err) {
      downloadBtn.textContent = "Error. Inténtalo de nuevo";
      console.error(err);
    } finally {
      downloadBtn.disabled = false;
      downloadBtn.textContent =
        'Descargar collage "Feliz Día de la Novia"';
    }
  });

  async function generateCollage() {
    const images = Array.from(document.querySelectorAll(".photo-card img"));
    const loaded = await Promise.all(
      images.map((img) => loadImage(img.src))
    );

    const cols = 3;
    const rows = Math.ceil(loaded.length / cols);
    const thumbW = 320;
    const thumbH = 420;
    const padding = 16;
    const titleHeight = 120;

    const canvas = document.getElementById("collageCanvas");
    canvas.width = cols * thumbW + (cols + 1) * padding;
    canvas.height = rows * thumbH + (rows + 1) * padding + titleHeight;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0d0d12";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff6b9d";
    ctx.font = "bold 52px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      "Feliz Día de la Novia",
      canvas.width / 2,
      titleHeight / 2
    );

    loaded.forEach((img, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = padding + col * (thumbW + padding);
      const y = titleHeight + padding + row * (thumbH + padding);
      drawCover(ctx, img, x, y, thumbW, thumbH);
    });

    const link = document.createElement("a");
    link.download = "feliz-dia-de-la-novia.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  function drawCover(ctx, img, x, y, w, h) {
    const imgRatio = img.width / img.height;
    const boxRatio = w / h;
    let sx, sy, sw, sh;
    if (imgRatio > boxRatio) {
      sh = img.height;
      sw = sh * boxRatio;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / boxRatio;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, w, h, 12);
    } else {
      const r = 12;
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
    ctx.clip();
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  }
});
