chrome.commands.onCommand.addListener(async (command) => {
  const note
  if (command === "paste_note_1") {
    const note = "vector<int> vec(n,0);";

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
