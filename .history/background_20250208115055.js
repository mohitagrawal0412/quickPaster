const notes = {
  1: "console.log('Hello World!');",
  2: "function greet() { return 'Hello, Developer!'; }"
};

chrome.commands.onCommand.addListener((command) => {
  let noteNumber = command === "paste_note_1" ? 1 : command === "paste_note_2" ? 2 : null;
  
  if (noteNumber && notes[noteNumber]) {
    chrome.storage.local.set({ copiedNote: notes[noteNumber] }, () => {
      console.log("Note saved to storage:", notes[noteNumber]);

      // Inject content script into active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
          });
        }
      });
    });
  }
});
