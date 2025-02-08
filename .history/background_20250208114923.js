chrome.commands.onCommand.addListener(async (command) => {
    const note="";
  if (command === "paste_note_1") {
     note = "vector<int> vec(n,0)";
  } else if (command === "paste_note_2") {
     note = "vector<int> vec(n,0)";
  } else if (command === "paste_note_3") {
    const note = "vector<int> vec(n,0)";
  }

  // Save note to storage
  await chrome.storage.local.set({ copiedNote: note });

  // Find active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab && tab.id) {
    try {
      // Inject content script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"],
      });
      console.log("Content script injected successfully.");
    } catch (error) {
      console.error("Content script injection failed:", error);
    }
  }
});
