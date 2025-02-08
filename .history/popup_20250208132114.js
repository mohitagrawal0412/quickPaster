document.addEventListener("DOMContentLoaded", () => {
  const snippetList = document.getElementById("snippetList");
  const snippetInput = document.getElementById("snippetInput");
  const addSnippetButton = document.getElementById("addSnippet");

  function loadSnippets() {
    chrome.storage.local.get(["snippets"], function (data) {
      let snippets = data.snippets || [];
      snippetList.innerHTML = ""; // Clear list before reloading

      snippets.forEach((snippet, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
              <span class ">${snippet}</span>
              <button class="delete-btn" data-index="${index}"><strong>DEL</strong></button>
            `;
        snippetList.appendChild(li);
      });
    });
  }

  addSnippetButton.addEventListener("click", () => {
    let newSnippet = snippetInput.value.trim();
    if (!newSnippet) return;

    chrome.storage.local.get(["snippets"], function (data) {
      let snippets = data.snippets || [];
      snippets.push(newSnippet);

      chrome.storage.local.set({ snippets }, () => {
        snippetInput.value = "";
        loadSnippets();
      });
    });
  });

  snippetList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      let index = event.target.getAttribute("data-index");
      chrome.storage.local.get(["snippets"], function (data) {
        let snippets = data.snippets || [];
        snippets.splice(index, 1);
        chrome.storage.local.set({ snippets }, loadSnippets);
      });
    }
  });

  loadSnippets();
});
