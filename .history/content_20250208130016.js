// chrome.storage.local.get("copiedNote", (data) => {
//   if (data.copiedNote) {
//     let activeElement = document.activeElement;

//     if (activeElement && activeElement.tagName === "TEXTAREA") {
//       let note = data.copiedNote.trim(); // Remove extra spaces

//       let start = activeElement.selectionStart;
//       let end = activeElement.selectionEnd;
//       let value = activeElement.value;

//       // Insert at cursor position
//       activeElement.value = value.slice(0, start) + note + value.slice(end);
//       activeElement.selectionStart = activeElement.selectionEnd =
//         start + note.length;

//       let event = new InputEvent("input", { bubbles: true });
//       activeElement.dispatchEvent(event);

//       console.log("Note pasted without extra spaces.");
//     } else {
//       console.log("No valid text area found.");
//     }
//   }
// });
