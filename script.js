const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const productPanels = Array.from(document.querySelectorAll(".product-panel"));
const productFilters = Array.from(document.querySelectorAll(".product-filter"));
const productResult = document.querySelector(".product-result");
const contactReturn = document.querySelector(".contact-return");
const topLinks = Array.from(document.querySelectorAll('a[href="#top"]'));
let productDialog = null;
let productCarouselTimer = null;
let imageViewer = null;
let viewerImages = [];
let viewerIndex = 0;
let viewerTitle = "产品图片";
let viewerReturnFocus = null;
let consultationOrigin = null;

const productDetails = {
  "product-electric-gate": {
    scope: "企业、园区、学校、单位大门、厂区主入口",
    service: "可按入口宽度、门体样式和现场使用频率配置，支持与遥控、车牌识别、门禁等系统配套。",
    images: [
      "assets/products/details/product-electric-gate/product-electric-gate-01.jpg",
      "assets/products/details/product-electric-gate/product-electric-gate-02.jpg",
      "assets/products/details/product-electric-gate/product-electric-gate-03.jpg",
      "assets/products/details/product-electric-gate/product-electric-gate-04.jpg",
    ],
  },
  "product-sectional-gate": {
    scope: "园区入口、厂区大门、空间受限的车行通道",
    service: "适合对开合稳定性、占地空间和入口形象有要求的项目，可结合现场尺寸定制配置。",
    images: [
      "assets/products/details/product-sectional-gate/product-sectional-gate-01.jpg",
      "assets/products/details/product-sectional-gate/product-sectional-gate-02.jpg",
      "assets/products/details/product-sectional-gate/product-sectional-gate-03.jpg",
      "assets/products/details/product-sectional-gate/product-sectional-gate-04.jpg",
    ],
  },
  "product-cantilever-gate": {
    scope: "工厂、物流园、单位入口、地面不便铺设轨道的场地",
    service: "无地轨结构便于车辆通行和后期维护，适合高频出入口和对地面排水有要求的现场。",
    images: [
      "assets/products/details/product-cantilever-gate/product-cantilever-gate-01.jpg",
      "assets/products/details/product-cantilever-gate/product-cantilever-gate-02.jpg",
      "assets/products/details/product-cantilever-gate/product-cantilever-gate-03.jpg",
      "assets/products/details/product-cantilever-gate/product-cantilever-gate-04.jpg",
    ],
  },
  "product-airborne-gate": {
    scope: "停车场、园区、工厂、车辆临时拦截入口",
    service: "用于车辆拦截和有序放行，可与岗亭、车牌识别、道闸系统组合使用。",
    images: [
      "assets/products/details/product-airborne-gate/product-airborne-gate-01.jpg",
      "assets/products/details/product-airborne-gate/product-airborne-gate-02.jpg",
      "assets/products/details/product-airborne-gate/product-airborne-gate-03.jpg",
      "assets/products/details/product-airborne-gate/product-airborne-gate-04.jpg",
    ],
  },
  "product-barrier-gate": {
    scope: "小区、停车场、园区、物流通道、企事业单位入口",
    service: "可根据车道宽度和通行频率选择杆型，并对接车牌识别、收费和后台管理系统。",
    images: [
      "assets/products/details/product-barrier-gate/product-barrier-gate-01.jpg",
      "assets/products/details/product-barrier-gate/product-barrier-gate-02.jpg",
      "assets/products/details/product-barrier-gate/product-barrier-gate-03.jpg",
      "assets/products/details/product-barrier-gate/product-barrier-gate-04.jpg",
    ],
  },
  "product-ad-barrier": {
    scope: "社区、商场、物业、停车场、商业入口",
    service: "兼顾车辆管理和广告展示，适合需要入口运营展示位的物业及商业场景。",
    images: [
      "assets/products/details/product-ad-barrier/product-ad-barrier-01.jpg",
      "assets/products/details/product-ad-barrier/product-ad-barrier-02.jpg",
      "assets/products/details/product-ad-barrier/product-ad-barrier-03.jpg",
      "assets/products/details/product-ad-barrier/product-ad-barrier-04.jpg",
    ],
  },
  "product-lpr": {
    scope: "停车场、园区、单位车辆管理、访客车辆管理",
    service: "可实现车辆识别、权限判断、自动抬杆和通行记录查询，提升入口管理效率。",
    images: [
      "assets/products/details/product-lpr/product-lpr-01.jpg",
      "assets/products/details/product-lpr/product-lpr-02.jpg",
      "assets/products/details/product-lpr/product-lpr-03.jpg",
      "assets/products/details/product-lpr/product-lpr-04.jpg",
    ],
  },
  "product-turnstile": {
    scope: "办公楼、学校、工厂、场馆、社区人行入口",
    service: "可按客流、权限规则和入口宽度选择摆闸、翼闸、三辊闸、全高转闸等形式。",
    images: [
      "assets/products/details/product-turnstile/product-turnstile-01.jpg",
      "assets/products/details/product-turnstile/product-turnstile-02.jpg",
      "assets/products/details/product-turnstile/product-turnstile-03.jpg",
      "assets/products/details/product-turnstile/product-turnstile-04.jpg",
    ],
  },
  "product-face-terminal": {
    scope: "办公、学校、园区、工厂、考勤和入口核验场景",
    service: "可与通道闸、门禁、考勤系统配套，实现人员识别和通行控制。",
    images: [
      "assets/products/details/product-face-terminal/product-face-terminal-01.jpg",
      "assets/products/details/product-face-terminal/product-face-terminal-02.jpg",
      "assets/products/details/product-face-terminal/product-face-terminal-03.jpg",
      "assets/products/details/product-face-terminal/product-face-terminal-04.jpg",
    ],
  },
  "product-auto-door": {
    scope: "商业门厅、办公楼、医院、酒店、公共空间入口",
    service: "可结合玻璃门、门禁和感应系统配置，提升入口通行体验和空间形象。",
    images: [
      "assets/products/details/product-auto-door/product-auto-door-01.jpg",
      "assets/products/details/product-auto-door/product-auto-door-02.jpg",
      "assets/products/details/product-auto-door/product-auto-door-03.jpg",
      "assets/products/details/product-auto-door/product-auto-door-04.jpg",
    ],
  },
  "product-bollard": {
    scope: "机关单位、学校、广场、重点区域、园区入口",
    service: "用于车辆防护和区域管控，可按安全等级、控制方式和现场铺装条件配置。",
    images: [
      "assets/products/details/product-bollard/product-bollard-01.jpg",
      "assets/products/details/product-bollard/product-bollard-02.jpg",
    ],
  },
  "product-booth": {
    scope: "小区、园区、停车场、工厂门卫、收费值守点",
    service: "可与道闸、车牌识别和出入口系统整体规划，满足值守、收费和管理需求。",
    images: [
      "assets/products/details/product-booth/product-booth-01.jpg",
      "assets/products/details/product-booth/product-booth-02.jpg",
      "assets/products/details/product-booth/product-booth-03.jpg",
      "assets/products/details/product-booth/product-booth-04.jpg",
    ],
  },
  "product-fast-door": {
    scope: "车间、仓库、物流通道、洁净或防尘区域",
    service: "适合频繁启闭的工业通道，可根据洞口尺寸、运行频率和现场环境配置。",
    images: [
      "assets/products/details/product-fast-door/product-fast-door-01.jpg",
      "assets/products/details/product-fast-door/product-fast-door-02.jpg",
    ],
  },
  "product-fence": {
    scope: "道路分隔、厂区围护、园区边界、公共区域隔离",
    service: "可与门体、岗亭、道闸和景观入口整体搭配，形成统一的现场管理边界。",
    images: [
      "assets/products/details/product-fence/product-fence-01.jpg",
    ],
  },
  "product-flagpole": {
    scope: "企业、学校、机关单位、园区广场和主入口形象区",
    service: "可结合现场高度、数量、安装位置和入口景观进行配置。",
    images: [
      "assets/products/details/product-flagpole/product-flagpole-01.jpg",
    ],
  },
};

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    mainNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "#top");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!active) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${active.target.id}`);
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.1, 0.25, 0.5],
  }
);

sections.forEach((section) => observer.observe(section));

function closeProductDetail() {
  closeImageViewer(false);
  if (productCarouselTimer) {
    clearInterval(productCarouselTimer);
    productCarouselTimer = null;
  }
  productDialog?.remove();
  productDialog = null;
  document.body.classList.remove("detail-open");
}

function updateImageViewer() {
  if (!imageViewer || viewerImages.length === 0) return;

  const image = imageViewer.querySelector(".image-viewer-image");
  const counter = imageViewer.querySelector(".image-viewer-counter");
  const previousButton = imageViewer.querySelector(".image-viewer-prev");
  const nextButton = imageViewer.querySelector(".image-viewer-next");

  if (image) {
    image.src = viewerImages[viewerIndex];
    image.alt = `${viewerTitle}大图 ${viewerIndex + 1}`;
  }
  if (counter) {
    counter.textContent = `${viewerIndex + 1} / ${viewerImages.length}`;
  }

  const hasMultipleImages = viewerImages.length > 1;
  previousButton?.toggleAttribute("hidden", !hasMultipleImages);
  nextButton?.toggleAttribute("hidden", !hasMultipleImages);
}

function changeViewerImage(direction) {
  if (viewerImages.length < 2) return;
  viewerIndex = (viewerIndex + direction + viewerImages.length) % viewerImages.length;
  updateImageViewer();
}

function closeImageViewer(restoreFocus = true) {
  imageViewer?.remove();
  imageViewer = null;
  viewerImages = [];

  if (!productDialog) {
    document.body.classList.remove("detail-open");
  }

  if (restoreFocus) {
    viewerReturnFocus?.focus();
  }
  viewerReturnFocus = null;
}

function openImageViewer(images, startIndex, title, trigger) {
  if (!images?.length) return;

  closeImageViewer(false);
  viewerImages = images;
  viewerIndex = Math.max(0, Math.min(startIndex, images.length - 1));
  viewerTitle = title;
  viewerReturnFocus = trigger ?? document.activeElement;

  const overlay = document.createElement("div");
  overlay.className = "image-viewer";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `${title}大图查看`);
  overlay.innerHTML = `
    <div class="image-viewer-backdrop" data-close-viewer></div>
    <div class="image-viewer-stage">
      <div class="image-viewer-head">
        <strong>${title}</strong>
        <span class="image-viewer-counter"></span>
      </div>
      <img class="image-viewer-image" src="" alt="">
      <button class="image-viewer-control image-viewer-prev" type="button" aria-label="上一张">‹</button>
      <button class="image-viewer-control image-viewer-next" type="button" aria-label="下一张">›</button>
      <button class="image-viewer-close" type="button" aria-label="关闭大图" data-close-viewer>×</button>
    </div>
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-viewer]")) closeImageViewer();
    if (event.target.closest(".image-viewer-prev")) changeViewerImage(-1);
    if (event.target.closest(".image-viewer-next")) changeViewerImage(1);
  });
  overlay.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(overlay.querySelectorAll("button:not([hidden])"));
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });

  document.body.append(overlay);
  document.body.classList.add("detail-open");
  imageViewer = overlay;
  updateImageViewer();
  overlay.querySelector(".image-viewer-close")?.focus();
}

function openProductDetail(panel) {
  const detail = productDetails[panel.id];
  if (!detail) return;
  const shouldCarousel = panel.id === "product-fast-door" && detail.images.length > 1;

  const title = panel.querySelector("h3")?.textContent ?? "产品详情";
  const label = panel.querySelector(".product-label")?.textContent ?? "Product";
  const summary = panel.querySelector(".product-copy p")?.textContent ?? "";
  const features = Array.from(panel.querySelectorAll(".product-copy li")).map((item) => item.textContent);

  closeProductDetail();

  const overlay = document.createElement("div");
  overlay.className = "product-detail";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", `${title}详情`);

  overlay.innerHTML = `
    <div class="product-detail-backdrop" data-close-detail></div>
    <div class="product-detail-panel image-count-${detail.images.length} detail-${panel.id}">
      <button class="detail-close" type="button" aria-label="关闭产品详情" data-close-detail>×</button>
      <div class="detail-gallery image-count-${detail.images.length} detail-${panel.id}${shouldCarousel ? " is-carousel" : ""}">
        ${detail.images.map((src, index) => `
          <figure class="${index === 0 ? "active" : ""}" role="button" tabindex="0" aria-label="放大查看${title}详情图${index + 1}" data-image-index="${index}">
            <img src="${src}" alt="${title}详情图${index + 1}" loading="eager">
            <span>放大查看</span>
          </figure>
        `).join("")}
      </div>
      <div class="detail-copy">
        <span class="product-label">${label}</span>
        <h3>${title}</h3>
        <p>${summary}</p>
        <dl class="detail-list">
          <div>
            <dt>适用场景</dt>
            <dd>${detail.scope}</dd>
          </div>
          <div>
            <dt>业务支持</dt>
            <dd>${detail.service}</dd>
          </div>
        </dl>
        <ul>
          ${features.map((feature) => `<li>${feature}</li>`).join("")}
        </ul>
        <a class="button primary detail-contact" href="#contact">咨询该产品</a>
      </div>
    </div>
  `;

  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-detail]")) {
      closeProductDetail();
    }
  });

  overlay.querySelector(".detail-contact")?.addEventListener("click", () => {
    consultationOrigin = {
      panel,
      scrollTop: window.scrollY,
      title,
      activeFilter: productFilters.find((button) => button.classList.contains("active"))?.dataset.filter ?? "all",
    };

    if (contactReturn) {
      contactReturn.hidden = false;
      contactReturn.querySelector("strong").textContent = `返回「${title}」`;
      contactReturn.querySelector("small").textContent = "回到刚才浏览的位置";
    }

    closeProductDetail();
  });
  overlay.querySelectorAll(".detail-gallery figure").forEach((figure) => {
    const openFigure = () => openImageViewer(detail.images, Number(figure.dataset.imageIndex), title, figure);
    figure.addEventListener("click", openFigure);
    figure.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openFigure();
      }
    });
  });
  document.body.append(overlay);
  document.body.classList.add("detail-open");
  productDialog = overlay;

  const carouselItems = Array.from(overlay.querySelectorAll(".detail-gallery.is-carousel figure"));
  if (carouselItems.length > 1) {
    let activeIndex = 0;
    productCarouselTimer = setInterval(() => {
      carouselItems[activeIndex].classList.remove("active");
      activeIndex = (activeIndex + 1) % carouselItems.length;
      carouselItems[activeIndex].classList.add("active");
    }, 2800);
  }

  overlay.querySelector(".detail-close")?.focus();
}

productPanels.forEach((panel) => {
  const title = panel.querySelector("h3")?.textContent ?? "产品";
  const copy = panel.querySelector(".product-copy");
  const more = document.createElement("button");
  more.className = "product-more";
  more.type = "button";
  more.textContent = "查看产品详情";
  copy?.append(more);

  const media = panel.querySelector(".product-media");
  media?.setAttribute("data-category-label", panel.dataset.categoryLabel ?? "产品");
  media?.setAttribute("role", "button");
  media?.setAttribute("tabindex", "0");
  media?.setAttribute("aria-label", `放大查看${title}图片`);

  const openCardImage = () => {
    const detail = productDetails[panel.id];
    const fallbackImage = panel.querySelector(".product-media img")?.getAttribute("src");
    const images = detail?.images?.length ? detail.images : fallbackImage ? [fallbackImage] : [];
    openImageViewer(images, 0, title, media);
  };

  media?.addEventListener("click", (event) => {
    event.stopPropagation();
    openCardImage();
  });
  media?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCardImage();
    }
  });
  more.addEventListener("click", () => openProductDetail(panel));
});

productFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const selectedCategory = filterButton.dataset.filter ?? "all";
    let visibleCount = 0;

    productFilters.forEach((button) => {
      const isActive = button === filterButton;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    productPanels.forEach((panel) => {
      const isVisible = selectedCategory === "all" || panel.dataset.category === selectedCategory;
      panel.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (productResult) {
      productResult.textContent = `当前展示 ${visibleCount} 项产品`;
    }
  });
});

contactReturn?.addEventListener("click", () => {
  if (!consultationOrigin) return;

  const { panel, scrollTop, activeFilter } = consultationOrigin;
  const currentFilter = productFilters.find((button) => button.classList.contains("active"))?.dataset.filter;
  if (currentFilter !== activeFilter) {
    const originalFilter = productFilters.find((button) => button.dataset.filter === activeFilter);
    originalFilter?.click();
  }

  contactReturn.hidden = true;
  history.replaceState(null, "", `#${panel.id}`);
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
  panel.classList.add("return-highlight");

  window.setTimeout(() => {
    panel.classList.remove("return-highlight");
    panel.querySelector(".product-more")?.focus({ preventScroll: true });
  }, 650);
});

document.addEventListener("keydown", (event) => {
  if (imageViewer && event.key === "ArrowLeft") {
    changeViewerImage(-1);
  }
  if (imageViewer && event.key === "ArrowRight") {
    changeViewerImage(1);
  }
  if (event.key === "Escape") {
    if (imageViewer) {
      closeImageViewer();
    } else {
      closeProductDetail();
    }
  }
});
