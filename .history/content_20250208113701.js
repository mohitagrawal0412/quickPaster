chrome.storage.local.get("copiedNote", (data) => {
  if (data.copiedNote) {
    let activeElement = document.activeElement;

    if (
      (activeElement && activeElement.tagName === "TEXTAREA") ||
      activeElement.isContentEditable
    ) {
      // Paste directly in text editor
      activeElement.value += data.copiedNote;
    } else {
      // Use Clipboard API as fallback
      navigator.clipboard
        .writeText(data.copiedNote)
        .then(() => {
          document.execCommand("paste"); // Simulate paste action
        })
        .catch((err) => console.error("Clipboard write failed", err));
    }
  }
});
