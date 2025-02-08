chrome.commands.onCommand.addListener(async (command) => {
  const note="";

  if (command === "paste_note_1") 
     note = "vector<int> vec(n,0);";
  else  if (command === "paste_note_2") 
       note = "vector<int> nums(n,0);";
  else    if (command === "paste_note_3") 
         note = "vector<int> arr(n,0);";
   else     if (command === "paste_note_4") 
           note = "vector<int> um(n,0);";

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
