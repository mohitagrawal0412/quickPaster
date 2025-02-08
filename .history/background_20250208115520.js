chrome.commands.onCommand.addListener(async (command) => {
  if (command === "paste_note_1") {
    const note = ";";

    // Save note to storage
    await chrome.storage.local.set({ copiedNote: note });

    // Inject content script into active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.id) {
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
        });
      } catch (error) {
        console.error("Content script injection failed:", error);
      }
    }
  }
});
