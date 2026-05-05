// 1. 主题切换逻辑
export function toggleTheme() {
  const savedTheme = localStorage.getItem("theme") ?? "light";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
} else {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
} else {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }
});

// 2. 页面分页切换逻辑
export function switchPage(pageId: string) {
  const views = document.querySelectorAll(".page-view");
  const targetView = document.getElementById(pageId);

  if (targetView === null) return;

  if (targetView.classList.contains("page-active")) return;

  views.forEach((view) => {
    if (view.classList.contains("page-active")) {
      view.classList.remove("page-active");
      view.classList.add("page-hidden");
    }
  });

  setTimeout(() => {
    targetView.classList.remove("page-hidden");
    targetView.classList.add("page-active");
    triggerEntranceAnimations();
  }, 50);
}

// 3. 滚动与入场动画触发逻辑
function triggerEntranceAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-in-up").forEach((el) => {
    el.classList.remove("visible");
    observer.observe(el);
  });
}

triggerEntranceAnimations();

// 4. 二维码弹窗逻辑
const modal = document.getElementById("qr-modal")!;
const modalContent = document.getElementById("qr-modal-content")!;
const qrImage = document.getElementById("qr-image")! as HTMLImageElement;
const qrTitle = document.getElementById("qr-title")!;

const qrAssets = {
  qq: {
    title: "扫码添加 QQ 好友",
    src: "./assets/qq_qr.png",
  },
  qqgroup: {
    title: "扫码加入 QQ 群",
    src: "./assets/qqun.png",
  },
} as const;

type QrModalType = keyof typeof qrAssets;

export function openQRModal(type: QrModalType) {
  const data = qrAssets[type];
  if (!data) return;

  qrTitle.textContent = data.title;
  qrImage.src = data.src;

  modal.classList.add("flex");
  modal.classList.remove("hidden");
  requestAnimationFrame(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  });
}

export function closeQRModal() {
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }, 300);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 5. 自动循环打字机效果
async function initTypewriter() {
  const h1Container = document.getElementById("tw-h1")!;
  const pContainer = document.getElementById("tw-p")!;

  const text1 = "你好，我是 ";
  const text2 = "夜白";
  const text3 = "很高兴认识你。";

  async function typeText(element: Element, text: string, speed = 80) {
    for (let i = 0; i < text.length; i++) {
      element.textContent += text.charAt(i);
      await sleep(speed + Math.random() * 50);
    }
  }

  async function deleteText(element: Element, speed = 40) {
    while (element.textContent.length > 0) {
      element.textContent = element.textContent.slice(0, -1);
      await sleep(speed);
    }
  }

  while (true) {
    h1Container.innerHTML =
      '<span id="tw-t1"></span><span id="tw-t2" class="text-blue-500"></span><span id="cursor1" class="typing-cursor"></span>';
    pContainer.innerHTML =
      '<span id="tw-t3"></span><span id="cursor2" class="typing-cursor hidden"></span>';

    const t1 = document.getElementById("tw-t1")!;
    const t2 = document.getElementById("tw-t2")!;
    const t3 = document.getElementById("tw-t3")!;
    const c1 = document.getElementById("cursor1")!;
    const c2 = document.getElementById("cursor2")!;

    await sleep(800);

    await typeText(t1, text1, 100);
    await typeText(t2, text2, 120);

    c1.classList.add("hidden");
    c2.classList.remove("hidden");

    await sleep(400);

    await typeText(t3, text3, 100);

    await sleep(4000);

    await deleteText(t3, 40);

    c2.classList.add("hidden");
    c1.classList.remove("hidden");

    await deleteText(t2, 40);
    await deleteText(t1, 40);

    await sleep(600);
  }
}

initTypewriter();

// 将需要在 HTML onclick 中调用的函数挂载到全局 window
(window as any).switchPage = switchPage;
(window as any).toggleTheme = toggleTheme;
(window as any).openQRModal = openQRModal;
(window as any).closeQRModal = closeQRModal;