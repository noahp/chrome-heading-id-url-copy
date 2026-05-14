let lastRightClickedEl = null;

document.addEventListener(
  "contextmenu",
  (e) => {
    lastRightClickedEl = e.target;
  },
  true
);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type !== "copy-section-link") return;

  const el = lastRightClickedEl;
  if (!el) {
    showToast("No element tracked");
    return;
  }

  // Walk up the DOM to find the nearest ancestor-or-self with an id.
  // At each level also check previousElementSibling, since some sites place
  // an empty <span id="..."> before the heading rather than on it.
  let node = el;
  while (node && node !== document.documentElement) {
    if (node.id) {
      copyUrl(msg.pageUrl, node.id);
      return;
    }
    const prev = node.previousElementSibling;
    if (prev && prev.id) {
      copyUrl(msg.pageUrl, prev.id);
      return;
    }
    node = node.parentElement;
  }

  showToast("No id found on this element or its ancestors");
});

function copyUrl(pageUrl, id) {
  const url = `${pageUrl.split("#")[0]}#${encodeURIComponent(id)}`;
  navigator.clipboard.writeText(url).then(() => showToast(`Copied: #${id}`));
}

function showToast(message) {
  const existing = document.getElementById("__copy-section-link-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "__copy-section-link-toast";
  toast.textContent = message;
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: "#1a1a1a",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "system-ui, sans-serif",
    zIndex: "2147483647",
    opacity: "1",
    transition: "opacity 0.4s ease",
    pointerEvents: "none",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  });
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}
