/* ============================================================
   KarsaTech Solution — Percetakan ID Card PVC Custom
   script.js
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
   * 1. WhatsApp helpers
   * -------------------------------------------------------- */
  function getPhone() {
    return (CONFIG.whatsapp || "").replace(/\D/g, "");
  }

  function createWhatsAppLink(message) {
    var phone = getPhone();
    if (!phone) return "#";
    return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message || "");
  }

  function goWhatsApp(message) {
    var phone = getPhone();
    if (!phone) {
      showToast("Nomor WhatsApp belum diatur. Silakan isi CONFIG.whatsapp di file config.js.");
      return;
    }
    window.open(createWhatsAppLink(message), "_blank", "noopener");
  }

  /* Tiny toast */
  var toastEl = null;
  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 3800);
  }

  /* Delegate all [data-wa] clicks to WhatsApp */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-wa]");
    if (!el) return;
    e.preventDefault();
    goWhatsApp(el.getAttribute("data-wa") || "");
  });

  /* ----------------------------------------------------------
   * 2. Navbar: scroll state + mobile menu
   * -------------------------------------------------------- */
  var navbar = document.querySelector(".navbar");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  var navOverlay = document.getElementById("navOverlay");

  function onScroll() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    if (navOverlay) navOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  function toggleNav() {
    var open = navLinks.classList.toggle("open");
    if (navToggle) navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (navOverlay) navOverlay.classList.toggle("show", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }
  if (navOverlay) {
    navOverlay.addEventListener("click", closeNav);
  }
  if (navLinks) {
    navLinks.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeNav();
      closeLightbox();
    }
  });

  /* ----------------------------------------------------------
   * 3. Dynamic bits from CONFIG
   * -------------------------------------------------------- */
  function applyConfig() {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var businessEls = document.querySelectorAll(".js-business-name");
    businessEls.forEach(function (el) {
      var attr = el.getAttribute("data-name");
      el.textContent = attr === "full" ? CONFIG.businessName : CONFIG.businessName;
    });

    var locationEls = document.querySelectorAll(".js-location");
    locationEls.forEach(function (el) {
      el.textContent = CONFIG.location;
    });

    // TikTok links
    document.querySelectorAll(".js-tiktok").forEach(function (el) {
      el.setAttribute("href", CONFIG.tiktok);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    });

    // TikTok handle
    document.querySelectorAll(".js-tiktok-handle").forEach(function (el) {
      el.textContent = CONFIG.tiktokUser;
    });

    // Google Business button — hide when empty
    var gb = document.querySelector(".js-google-business-wrap");
    if (gb) {
      if (CONFIG.googleBusiness) {
        var gbLink = document.querySelector(".js-google-business");
        if (gbLink) gbLink.setAttribute("href", CONFIG.googleBusiness);
      } else {
        gb.hidden = true;
      }
    }

    // Floating WhatsApp
    var waFloat = document.getElementById("waFloat");
    if (waFloat) {
      waFloat.setAttribute("href", createWhatsAppLink("Halo KarsaTech Solution, saya ingin bertanya tentang cetak ID Card PVC."));
    }
    if (!getPhone()) {
      document.querySelectorAll("[data-wa]").forEach(function (btn) {
        btn.classList.add("btn");
      });
    }
  }

  /* ----------------------------------------------------------
   * 4. Products
   * -------------------------------------------------------- */
  var PRODUCTS = [
    { id: "id-card-sekolah", name: "ID Card Sekolah", cat: "sekolah", catLabel: "Sekolah", desc: "Untuk siswa, guru dan staf sekolah.", img: "./images/products/id-card-sekolah.jpg", badge: "Paling Laris" },
    { id: "kartu-pelajar", name: "Kartu Pelajar", cat: "sekolah", catLabel: "Sekolah", desc: "Kartu identitas siswa custom.", img: "./images/products/kartu-pelajar.jpg", badge: "" },
    { id: "id-card-karyawan", name: "ID Card Karyawan", cat: "kantor", catLabel: "Kantor", desc: "Untuk perusahaan, toko dan organisasi.", img: "./images/products/id-card-karyawan.jpg", badge: "" },
    { id: "id-card-panitia", name: "ID Card Panitia", cat: "panitia", catLabel: "Panitia", desc: "Untuk kegiatan, event dan kepanitiaan.", img: "./images/products/id-card-panitia.jpg", badge: "" },
    { id: "kartu-anggota", name: "Kartu Anggota", cat: "komunitas", catLabel: "Komunitas", desc: "Untuk komunitas, organisasi dan perkumpulan.", img: "./images/products/kartu-anggota.jpg", badge: "" },
    { id: "kartu-bimbel", name: "Kartu Bimbel", cat: "komunitas", catLabel: "Komunitas", desc: "Untuk identitas siswa bimbingan belajar.", img: "./images/products/kartu-bimbel.jpg", badge: "" },
    { id: "id-card-event", name: "ID Card Event", cat: "event", catLabel: "Event", desc: "Untuk peserta, crew dan panitia event.", img: "./images/products/id-card-event.jpg", badge: "" },
    { id: "id-card-custom", name: "ID Card Custom", cat: "custom", catLabel: "Custom", desc: "Desain dapat disesuaikan dengan kebutuhan.", img: "./images/products/id-card-custom.jpg", badge: "" },
    { id: "cetak-ulang", name: "Cetak Ulang", cat: "custom", catLabel: "Custom", desc: "Untuk kartu rusak, hilang atau perubahan data.", img: "./images/products/cetak-ulang.jpg", badge: "" }
  ];

  var CATEGORIES = [
    { key: "all", label: "Semua" },
    { key: "sekolah", label: "Sekolah" },
    { key: "kantor", label: "Kantor" },
    { key: "panitia", label: "Panitia" },
    { key: "komunitas", label: "Komunitas" },
    { key: "event", label: "Event" },
    { key: "custom", label: "Custom" }
  ];

  function productCard(p) {
    var badge = p.badge ? '<span class="card__badge">' + p.badge + "</span>" : "";
    var card = document.createElement("article");
    card.className = "card product-card";
    card.setAttribute("data-cat", p.cat);
    card.innerHTML =
      '<div class="card__media">' +
      badge +
      '<img src="' + p.img + '" alt="' + p.name + " - KarsaTech Solution\" loading=\"lazy\">" +
      "</div>" +
      '<div class="product-card__body">' +
      '<span class="card__category">' + p.catLabel + "</span>" +
      "<h3>" + p.name + "</h3>" +
      "<p>" + p.desc + "</p>" +
      '<div class="card__footer">' +
      '<a class="btn btn-sm btn-whatsapp" data-wa="Halo KarsaTech Solution, saya ingin pesan ' + p.name + '. Mohon info harganya ya.">' +
      waIcon() + " Pesan</a>" +
      '<a class="btn btn-sm btn-outline" href="#harga">Harga</a>' +
      "</div>" +
      "</div>";
    return card;
  }

  function renderProducts(filter) {
    var grid = document.getElementById("productGrid");
    if (!grid) return;
    grid.innerHTML = "";
    PRODUCTS.forEach(function (p) {
      if (filter && filter !== "all" && p.cat !== filter) return;
      grid.appendChild(productCard(p));
    });
  }

  function renderProductFilters() {
    var wrap = document.getElementById("productFilters");
    if (!wrap) return;
    CATEGORIES.forEach(function (c, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (i === 0 ? " active" : "");
      btn.setAttribute("data-filter", c.key);
      btn.textContent = c.label;
      if (i === 0) btn.setAttribute("aria-pressed", "true");
      wrap.appendChild(btn);
    });
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      wrap.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.removeAttribute("aria-pressed");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      renderProducts(btn.getAttribute("data-filter"));
    });
  }

  /* ----------------------------------------------------------
   * 5. Pricing table + examples (from CONFIG.priceTiers)
   * -------------------------------------------------------- */
  function formatIDR(n) {
    return "Rp" + n.toLocaleString("id-ID");
  }

  function renderPriceTable() {
    var tbody = document.getElementById("priceTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";
    CONFIG.priceTiers.forEach(function (t) {
      var tr = document.createElement("tr");
      var range = t.max === null ? t.min + "+" : t.min + "\u2013" + t.max;
      var cell;
      cell = document.createElement("td");
      cell.textContent = range;
      tr.appendChild(cell);

      cell = document.createElement("td");
      if (t.price === 0) {
        cell.className = "price-contact";
        cell.textContent = "Hubungi Kami";
      } else {
        cell.className = "price-strong";
        cell.textContent = formatIDR(t.price) + "/kartu";
      }
      tr.appendChild(cell);
      tbody.appendChild(tr);
    });
  }

  var EXAMPLES = [
    { qty: 50, total: 425000 },
    { qty: 100, total: 800000 },
    { qty: 200, total: 1500000 },
    { qty: 500, total: 3750000 }
  ];

  function renderExamples() {
    var wrap = document.getElementById("priceExamples");
    if (!wrap) return;
    wrap.innerHTML = "";
    EXAMPLES.forEach(function (ex) {
      var d = document.createElement("div");
      d.className = "example-card";
      d.innerHTML =
        "<strong>" + ex.qty + " kartu</strong>" +
        "<span>&plusmn; " + formatIDR(ex.total) + "</span>";
      wrap.appendChild(d);
    });
  }

  /* ----------------------------------------------------------
   * 6. Price calculator
   * -------------------------------------------------------- */
  function calcTier(qty) {
    var tier = null;
    CONFIG.priceTiers.forEach(function (t) {
      if (qty >= t.min && (t.max === null || qty <= t.max)) tier = t;
    });
    return tier;
  }

  function initCalculator() {
    var input = document.getElementById("calcQty");
    var result = document.getElementById("calcResult");
    if (!input || !result) return;

    function update() {
      var qty = parseInt(input.value, 10);
      if (isNaN(qty) || qty <= 0) {
        result.classList.remove("show");
        return;
      }
      var tier = calcTier(qty);
      var qtyEl = document.getElementById("calcQtyOut");
      var priceEl = document.getElementById("calcPriceOut");
      var totalEl = document.getElementById("calcTotalOut");
      var slugEl = document.getElementById("calcSlug");
      var orderBtn = document.getElementById("calcOrderBtn");

      qtyEl.textContent = qty + " kartu";

      if (tier && tier.price === 0) {
        priceEl.textContent = "Hubungi Kami";
        totalEl.textContent = "Hubungi Kami";
        slugEl.textContent = "Anda berencana pesan " + qty + " kartu. Hubungi kami untuk penawaran terbaik.";
        if (orderBtn) {
          orderBtn.textContent = "Tanya Harga " + qty + " Kartu";
          orderBtn.setAttribute("data-wa", "Halo KarsaTech Solution, saya ingin memesan " + qty + " ID Card PVC. Mohon informasi penawaran harganya.");
        }
      } else if (tier) {
        var total = qty * tier.price;
        priceEl.textContent = formatIDR(tier.price) + "/kartu";
        totalEl.textContent = formatIDR(total);
        slugEl.textContent = "Anda mendapatkan harga grosir.";
        if (orderBtn) {
          orderBtn.textContent = "Pesan Jumlah Ini";
          orderBtn.setAttribute("data-wa", "Halo KarsaTech Solution, saya ingin memesan " + qty + " ID Card PVC. Mohon informasi lebih lanjut.");
        }
      }
      result.classList.add("show");
    }

    input.addEventListener("input", update);
    input.addEventListener("change", update);
    update();
  }

  /* ----------------------------------------------------------
   * 7. Gallery + lightbox
   * -------------------------------------------------------- */
  var GALLERY = [
    { id: 1, title: "Kartu Pelajar", cat: "sekolah", catLabel: "Sekolah", desc: "Kartu Pelajar PVC full color dengan desain khas sekolah.", img: "./images/gallery/id-card-01.jpg" },
    { id: 2, title: "ID Card Siswa", cat: "sekolah", catLabel: "Sekolah", desc: "ID card siswa dengan ujung bulat dan finishing rapi.", img: "./images/gallery/id-card-02.jpg" },
    { id: 3, title: "ID Card Karyawan", cat: "karyawan", catLabel: "Karyawan", desc: "ID card karyawan untuk perusahaan dan toko.", img: "./images/gallery/id-card-03.jpg" },
    { id: 4, title: "ID Card Panitia", cat: "panitia", catLabel: "Panitia", desc: "Badge panitia untuk kegiatan dan kepanitiaan.", img: "./images/gallery/id-card-04.jpg" },
    { id: 5, title: "Kartu Komunitas", cat: "komunitas", catLabel: "Komunitas", desc: "Kartu anggota dengan barcode dan QR code.", img: "./images/gallery/id-card-05.jpg" },
    { id: 6, title: "Kartu Event", cat: "event", catLabel: "Event", desc: "Kartu event dengan desain signature yang menarik.", img: "./images/gallery/id-card-06.jpg" },
    { id: 7, title: "Kartu Bimbel", cat: "komunitas", catLabel: "Komunitas", desc: "Kartu bimbel dengan warna pastel yang ramah.", img: "./images/gallery/id-card-07.jpg" },
    { id: 8, title: "ID Card Sekolah", cat: "sekolah", catLabel: "Sekolah", desc: "ID card sekolah siap pakai dengan lanyard.", img: "./images/gallery/id-card-08.jpg" },
    { id: 9, title: "ID Card Custom", cat: "custom", catLabel: "Custom", desc: "Didesain sesuai kebutuhan instansi Anda.", img: "./images/gallery/id-card-09.jpg" },
    { id: 10, title: "Kartu Anggota", cat: "karyawan", catLabel: "Karyawan", desc: "Kartu anggota organisasi dengan finishing hologram.", img: "./images/gallery/id-card-10.jpg" },
    { id: 11, title: "ID Card Crew", cat: "panitia", catLabel: "Panitia", desc: "ID card crew event dengan neck strap.", img: "./images/gallery/id-card-11.jpg" },
    { id: 12, title: "ID Card Event", cat: "event", catLabel: "Event", desc: "ID card peserta event dengan finishing matte.", img: "./images/gallery/id-card-12.jpg" }
  ];

  var GALLERY_CATS = [
    { key: "all", label: "Semua" },
    { key: "sekolah", label: "Sekolah" },
    { key: "karyawan", label: "Karyawan" },
    { key: "panitia", label: "Panitia" },
    { key: "komunitas", label: "Komunitas" },
    { key: "event", label: "Event" },
    { key: "custom", label: "Custom" }
  ];

  var currentGallery = [];

  function galleryCard(g) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-card";
    btn.setAttribute("data-id", g.id);
    btn.setAttribute("data-cat", g.cat);
    btn.setAttribute("aria-label", "Lihat " + g.title);
    btn.innerHTML =
      '<span class="gallery-card__cover">' +
      '<img src="' + g.img + '" alt="' + g.title + " - Cetak ID Card KarsaTech Solution\" loading=\"lazy\">" +
      '<span class="gallery-card__name">' + g.title + '</span>' +
      '<span class="gallery-card__zoom">' + zoomIcon() + "</span>" +
      "</span>";
    return btn;
  }

  function renderGallery(filter) {
    var grid = document.getElementById("galleryGrid");
    if (!grid) return;
    grid.innerHTML = "";
    currentGallery = GALLERY.filter(function (g) {
      return !filter || filter === "all" || g.cat === filter;
    });
    currentGallery.forEach(function (g) {
      grid.appendChild(galleryCard(g));
    });
  }

  function renderGalleryFilters() {
    var wrap = document.getElementById("galleryFilters");
    if (!wrap) return;
    GALLERY_CATS.forEach(function (c, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-btn" + (i === 0 ? " active" : "");
      btn.setAttribute("data-filter", c.key);
      btn.textContent = c.label;
      if (i === 0) btn.setAttribute("aria-pressed", "true");
      wrap.appendChild(btn);
    });
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      wrap.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
        b.removeAttribute("aria-pressed");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      var items = document.querySelectorAll("#galleryGrid .gallery-card");
      items.forEach(function (it) {
        var show = !btn.getAttribute("data-filter") || btn.getAttribute("data-filter") === "all" || it.getAttribute("data-cat") === btn.getAttribute("data-filter");
        it.style.display = show ? "" : "none";
      });
    });
  }

  /* Lightbox */
  var lightbox = document.getElementById("lightbox");
  var lightboxIndex = 0;

  function openLightbox(id) {
    var idx = -1;
    currentGallery.forEach(function (g, i) {
      if (g.id === id) idx = i;
    });
    if (idx < 0) return;
    lightboxIndex = idx;
    paintLightbox();
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    var closeBtn = lightbox.querySelector(".lightbox__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function stepLightbox(dir) {
    if (!currentGallery.length) return;
    lightboxIndex = (lightboxIndex + dir + currentGallery.length) % currentGallery.length;
    paintLightbox();
  }

  function paintLightbox() {
    var g = currentGallery[lightboxIndex];
    var media = document.getElementById("lbImg");
    var cat = document.getElementById("lbCat");
    var title = document.getElementById("lbTitle");
    var desc = document.getElementById("lbDesc");
    var waBtn = document.getElementById("lbWa");
    if (media) {
      media.src = g.img;
      media.alt = g.title + " - KarsaTech Solution";
    }
    if (cat) cat.textContent = g.catLabel;
    if (title) title.textContent = g.title;
    if (desc) desc.textContent = g.desc;
    if (waBtn) waBtn.setAttribute("data-wa", "Halo KarsaTech Solution, saya tertarik dengan " + g.title + ". Mohon info harganya.");
  }

  function initLightbox() {
    if (!lightbox) return;
    var grid = document.getElementById("galleryGrid");
    if (grid) {
      grid.addEventListener("click", function (e) {
        var card = e.target.closest(".gallery-card");
        if (card) openLightbox(parseInt(card.getAttribute("data-id"), 10));
      });
    }
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.closest(".lightbox__close")) closeLightbox();
      if (e.target.closest(".lightbox__next")) stepLightbox(1);
      if (e.target.closest(".lightbox__prev")) stepLightbox(-1);
    });
    lightbox.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ----------------------------------------------------------
   * 8. Testimonials slider
   * -------------------------------------------------------- */
  function initTestimonials() {
    var section = document.getElementById("testimoni");
    if (!section) return;
    if (!CONFIG.testimonialsEnabled || !CONFIG.testimonials || !CONFIG.testimonials.length) {
      section.remove();
      return;
    }
    var track = section.querySelector(".testi-track");
    var dotsWrap = section.querySelector(".testi-dots");
    var cards = CONFIG.testimonials.map(function (t) {
      var slide = document.createElement("div");
      slide.className = "testi-slide";
      var stars = "";
      for (var i = 1; i <= 5; i++) {
        stars += '<svg viewBox="0 0 24 24" fill="' + (i <= t.rating ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>';
      }
      var demoBadge = t.demo ? '<span class="testi-card__demo">Contoh</span>' : "";
      slide.innerHTML =
        '<div class="testi-card">' +
        '<div class="testi-card__stars" aria-label="Rating ' + t.rating + " dari 5\">" + stars + "</div>" +
        demoBadge +
        '<p class="testi-card__text">"' + t.text + '"</p>' +
        '<div class="testi-card__person">' +
        '<div class="testi-card__avatar">' + initials(t.name) + "</div>" +
        "<div><strong>" + t.name + "</strong><span>" + t.category + "</span></div>" +
        "</div>" +
        "</div>";
      return slide;
    });

    cards.forEach(function (c) {
      track.appendChild(c);
    });

    var index = 0;
    var count = cards.length;
    var timer = null;

    function paint() {
      if (track) track.style.transform = "translateX(-" + index * 100 + "%)";
      var dots = dotsWrap ? dotsWrap.querySelectorAll(".testi-dot") : [];
      dots.forEach(function (d, i) {
        d.classList.toggle("active", i === index);
      });
    }

    function go(i) {
      index = (i + count) % count;
      paint();
    }

    (function buildDots() {
      if (!dotsWrap) return;
      for (var i = 0; i < count; i++) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "testi-dot" + (i === 0 ? " active" : "");
        d.setAttribute("aria-label", "Tampilkan testimoni " + (i + 1));
        d.addEventListener("click", function () {
          go(parseInt(this.getAttribute("data-i"), 10));
          restartTimer();
        });
        d.setAttribute("data-i", i);
        dotsWrap.appendChild(d);
      }
    })();

    var prev = section.querySelector(".testi-arrow--prev");
    var next = section.querySelector(".testi-arrow--next");
    if (prev) prev.addEventListener("click", function () { go(index - 1); restartTimer(); });
    if (next) next.addEventListener("click", function () { go(index + 1); restartTimer(); });

    function restartTimer() {
      clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 6000);
    }
    restartTimer();

    section.addEventListener("mouseenter", function () { clearInterval(timer); });
    section.addEventListener("mouseleave", restartTimer);
  }

  function initials(name) {
    var parts = name.trim().split(/\s+/);
    var first = parts[0] ? parts[0][0] : "?";
    var last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }

  /* ----------------------------------------------------------
   * 9. FAQ accordion
   * -------------------------------------------------------- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      if (!q) return;
      q.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");
        items.forEach(function (it) {
          it.classList.remove("open");
          var btn = it.querySelector(".faq-q");
          if (btn) btn.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ----------------------------------------------------------
   * 10. Image fallback placeholder
   * -------------------------------------------------------- */
  function placeholderDataURI(title) {
    var t = (title || "ID Card").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#e6f4f1"/><stop offset="1" stop-color="#c7e8e0"/>' +
      "</linearGradient></defs>" +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<rect x="250" y="170" width="300" height="190" rx="20" fill="#ffffff" stroke="#0b7a68" stroke-width="3"/>' +
      '<rect x="262" y="182" width="276" height="44" rx="10" fill="#0b7a68"/>' +
      '<rect x="262" y="246" width="70" height="92" rx="8" fill="#dfe9e6"/>' +
      '<rect x="348" y="246" width="180" height="14" rx="7" fill="#9dbab3"/>' +
      '<rect x="348" y="270" width="130" height="10" rx="5" fill="#c3d3cf"/>' +
      '<rect x="348" y="290" width="150" height="10" rx="5" fill="#c3d3cf"/>' +
      '<rect x="270" y="318" width="260" height="26" rx="6" fill="#0b7a68"/>' +
      '<text x="400" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#075e50">KarsaTech Solution</text>' +
      '<text x="400" y="462" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#0b7a68">' + t + "</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  function handleImageError(img) {
    if (!img || img.getAttribute("data-fallback") === "1") return;
    img.setAttribute("data-fallback", "1");
    img.src = placeholderDataURI(img.getAttribute("alt") || img.getAttribute("data-title") || "ID Card");
    if (img.closest(".card__media")) {
      // image still visible, no extra action needed
    }
  }

  /* Capture phase catches img errors reliably */
  document.addEventListener(
    "error",
    function (e) {
      var t = e.target;
      if (t && t.tagName && t.tagName.toLowerCase() === "img") {
        handleImageError(t);
      }
    },
    true
  );

  /* ----------------------------------------------------------
   * Icons
   * -------------------------------------------------------- */
  function waIcon() {
    return (
      '<svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.83 14.12c-.25.7-1.45 1.34-2 1.38-.51.04-1.17.1-3.35-.7-2.63-1-4.32-3.5-4.45-3.66-.13-.16-1.06-1.41-1.06-2.68s.67-1.9.91-2.16c.24-.26.52-.32.7-.32h.5c.16 0 .38-.06.59.45.25.6.76 2.08.83 2.23.07.15.11.33.02.53-.09.2-.13.32-.26.5-.13.18-.27.4-.39.54-.13.13-.27.27-.12.53.15.26.65 1.08 1.4 1.75.96.86 1.78 1.13 2.03 1.26.25.13.4.11.55-.06.15-.18.63-.73.8-.98.17-.26.34-.21.57-.13.24.08 1.5.71 1.76.84.26.13.43.19.49.3.07.1.07.6-.18 1.2z"/></svg>'
    );
  }

  function zoomIcon() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35M8 11h6M11 8v6"/></svg>'
    );
  }

  /* ----------------------------------------------------------
   * Init
   * -------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    renderProductFilters();
    renderProducts("all");
    renderPriceTable();
    renderExamples();
    initCalculator();
    renderGalleryFilters();
    renderGallery("all");
    initLightbox();
    initTestimonials();
    initFaq();
  });
})();