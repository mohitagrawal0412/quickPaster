chrome.storage.local.get("copiedNote", (data) => {
  if (data.copiedNote) {
    let activeElement = document.activeElement;

    if (
      activeElement &&
      (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)
    ) {
      activeElement.value += data.copiedNote;
    } else {
      navigator.clipboard
        .writeText(data.copiedNote)
        .then(() => console.log("Copied to clipboard:", data.copiedNote))
        .catch((err) => console.error("Clipboard write failed", err));
    }
  }
});
