chrome.storage.local.get("copiedNote", (data) => {
  if (data.copiedNote) {
    let activeElement = document.activeElement;

    if (activeElement && activeElement.tagName === "TEXTAREA") {
      let note = data.copiedNote;

      // Simulating keystrokes
      let event = new InputEvent("input", { bubbles: true });
      activeElement.value += note;
      activeElement.dispatchEvent(event);

      console.log("Note pasted via keystrokes.");
    } else {
      console.log("No valid text area found.");
    }
  }
});
