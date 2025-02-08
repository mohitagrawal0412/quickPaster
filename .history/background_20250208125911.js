chrome.commands.onCommand.addListener(async (command) => {
  chrome.storage.local.get(["snippets"], async function (data) {
    let snippets = data.snippets || [];

    let note = "";
    if (command === "paste_note_1" && snippets.length > 0) note = snippets[0];
    else if (command === "paste_note_2" && snippets.length > 1)
      note = snippets[1];
    else if (command === "paste_note_3" && snippets.length > 2)
      note = snippets[2];

    if (note) {
      await chrome.storage.local.set({ copiedNote: note });

      let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

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
});
