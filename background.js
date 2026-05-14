chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copy-section-link",
    title: "Copy link to this section",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== "copy-section-link") return;
  chrome.tabs.sendMessage(tab.id, {
    type: "copy-section-link",
    pageUrl: info.frameUrl || tab.url,
  });
});
