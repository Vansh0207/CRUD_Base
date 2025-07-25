const input = document.getElementById("item-input");
const form = document.querySelector(".add_item");
const ul = document.querySelector("ul");

let items = JSON.parse(localStorage.getItem("items")) || [];
renderItems();

//add items in the list
form.addEventListener("submit", (x) => {
  x.preventDefault();

  const value = input.value.trim();

  if (value) {
    const newItem = {
      id: Date.now(), //UNIQUE ID based on current time
      text: value, //Text used typed
    };

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));
    renderItems();
    input.value = "";
  }
});

function renderItems() {
  const list = document.querySelector("ul"); // Select the <ul> element
  list.innerHTML = ""; // Clear the list before adding new items

  // Loop through each item in the array
  items.forEach((item) => {
    const li = document.createElement("li"); // Create a <li> for each item
    li.textContent = item.text; // Set the text content of <li> to the item's text

    // Create Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    // Create Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    // Append the buttons to the <li> element
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    //delete the entry
    deleteBtn.addEventListener("click", () => {
      items = items.filter((x) => x.id !== item.id);
      localStorage.setItem("items", JSON.stringify(items));
      renderItems();
    });

    //edit functionality
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit item:", item.text);
      if (newText && newText.trim()) {
        item.text = newText.trim();
        localStorage.setItem("items", JSON.stringify(items));
        renderItems();
      }
    });

    // Append the <li> to the <ul> in the DOM
    list.appendChild(li);
  });
}
