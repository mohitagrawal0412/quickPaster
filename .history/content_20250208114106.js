console.log("Content script loaded!");

chrome.storage.local.get("copiedNote", (data) => {
  console.log("Retrieved Note:", data.copiedNote);

  if (data.copiedNote) {
    let activeElement = document.activeElement;
    console.log("Active Element:", activeElement);

    if (
      activeElement &&
      (activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)
    ) {
      activeElement.value += data.copiedNote;
      console.log("Note pasted in text editor.");
    } else {
      navigator.clipboard
        .writeText(data.copiedNote)
        .then(() => console.log("Copied to clipboard:", data.copiedNote))
        .catch((err) => console.error("Clipboard write failed", err));
    }
  }
});
