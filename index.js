window.addEventListener("load", function () {
  /* ============================================ */
  // 767px以下はSPレイアウト固定(width=375)、768px以上はPC/タブレット用に通常のviewport
  /* ============================================ */
  !(function () {
    const viewport = document.querySelector('meta[name="viewport"]');

    if (!viewport) {
      return;
    }

    function switchViewport() {
      const value =
        window.outerWidth > 767
          ? "width=device-width,initial-scale=1"
          : "width=375";

      if (viewport.getAttribute("content") !== value) {
        viewport.setAttribute("content", value);
      }
    }

    window.addEventListener("resize", switchViewport, false);
    switchViewport();
  })();
});

document.addEventListener("DOMContentLoaded", () => {
  /* ============================================ */
  // FVを過ぎたらCTAボタンをフローティング表示し、ACCESSの最下部到達で非表示
  /* ============================================ */
  const fv = document.querySelector(".fv");
  const access = document.querySelector(".access");
  const fixedBtn = document.querySelector(".js-fixed-btn");

  if (!fv || !access || !fixedBtn) return;

  function toggleFixedBtn() {
    const isPastFv = fv.getBoundingClientRect().bottom <= 0;
    const isBeforeAccessEnd =
      access.getBoundingClientRect().bottom > window.innerHeight;

    fixedBtn.classList.toggle("is-show", isPastFv && isBeforeAccessEnd);
  }

  window.addEventListener("scroll", toggleFixedBtn, { passive: true });
  window.addEventListener("resize", toggleFixedBtn);
  toggleFixedBtn();
});
