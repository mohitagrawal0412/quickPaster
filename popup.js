document.addEventListener("DOMContentLoaded", loadSnippets);
document.getElementById("addSnippet").addEventListener("click", addSnippet);

function addSnippet() {
  let snippetInput = document.getElementById("snippetInput");
  let snippetText = snippetInput.value.trim();

  if (snippetText === "") return;

  chrome.storage.local.get(["snippets"], function (data) {
    let snippets = data.snippets || [];
    snippets.unshift(snippetText);

    chrome.storage.local.set({ snippets: snippets.slice(0, 10) }, function () {
      snippetInput.value = "";
      loadSnippets();
    });
  });
}

function loadSnippets() {
  chrome.storage.local.get(["snippets"], function (data) {
    let snippets = data.snippets || [];
    let snippetList = document.getElementById("snippetList");
    snippetList.innerHTML = "";

    snippets.forEach((snippet, index) => {
      let li = document.createElement("li");
      li.innerHTML = `
                <span contenteditable="true" onblur="updateSnippet(${index}, this.innerText)">${snippet}</span>
                <button class="delete" data-index="${index}">❌</button>
            `;
      snippetList.appendChild(li);
    });

    document.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        deleteSnippet(this.dataset.index);
      });
    });
  });
}

function deleteSnippet(index) {
  chrome.storage.local.get(["snippets"], function (data) {
    let snippets = data.snippets || [];
    snippets.splice(index, 1);

    chrome.storage.local.set({ snippets: snippets }, function () {
      loadSnippets();
    });
  });
}

function updateSnippet(index, newText) {
  chrome.storage.local.get(["snippets"], function (data) {
    let snippets = data.snippets || [];
    snippets[index] = newText;

    chrome.storage.local.set({ snippets: snippets }, function () {
      loadSnippets();
    });
  });
}
