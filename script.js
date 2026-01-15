// =========================
// STATE
// =========================
let items = JSON.parse(localStorage.getItem("wishlist")) || [];
let showArchived = false;
let currentPriority = 3;

// =========================
// ELEMENTS
// =========================
const form = document.getElementById("wishlist-form");
const list = document.getElementById("wishlist");

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const linkInput = document.getElementById("link");
const tagsInput = document.getElementById("tags");
const categoryInput = document.getElementById("category");
const budgetInput = document.getElementById("budget");

const priorityHearts = document.getElementById("priority-hearts");

// =========================
// PRIORITY HEARTS
// =========================
function updatePriorityHearts(value) {
  currentPriority = value;

  [...priorityHearts.children].forEach((heart) => {
    const heartValue = Number(heart.dataset.value);
    heart.classList.toggle("active", heartValue <= value);
  });
}

priorityHearts.addEventListener("click", (e) => {
  const value = Number(e.target.dataset.value);
  if (!value) return;
  updatePriorityHearts(value);
});

// =========================
// FORM SUBMIT
// =========================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = {
    id: Date.now(),
    name: nameInput.value,
    price: Number(priceInput.value) || 0,
    link: linkInput.value,
    priority: currentPriority,
    addedAt: new Date().toISOString(),
    archived: false,
    tags: tagsInput.value
      ? tagsInput.value.split(",").map(t => t.trim()).filter(Boolean)
      : [],
    category: categoryInput.value
  };

  items.push(item);
  saveAndRender();

  form.reset();
  updatePriorityHearts(3);
});

// =========================
// STORAGE
// =========================
function saveAndRender() {
  localStorage.setItem("wishlist", JSON.stringify(items));
  render();
}

// =========================
// RENDER
// =========================
function render(customItems = items) {
  list.innerHTML = "";

  customItems
    .filter(item => showArchived || !item.archived)
    .forEach(item => {
      const card = document.createElement("div");
      card.className = `card priority-${item.priority}`;

      if (item.archived) {
        card.classList.add("archived");
      }

      card.innerHTML = `
        <div class="card-row top">
          <div class="card-field">
            <span class="label">ITEM:</span>
            <span class="value">${item.name}</span>
          </div>

          <div class="card-field right">
            <span class="label">PRIORITY:</span>
            <span class="hearts">${"💗".repeat(item.priority)}</span>
            ${item.link ? `<a href="${item.link}" target="_blank">view</a>` : ""}
          </div>
        </div>

        <div class="card-row">
          <span class="label">PRICE:</span>
          <span class="value">₱${item.price}</span>
        </div>

        <div class="card-row">
          <span class="label">GET IT OR DITCH IT?:</span>
          <span class="decision">${decision(item)}</span>
        </div>

        ${
          item.tags.length
            ? `<div class="tags">
                ${item.tags.map(tag => `<span>#${tag}</span>`).join("")}
              </div>`
            : ""
        }

        <div class="actions">
          <button onclick="archiveItem(${item.id})">📦</button>
          <button onclick="deleteItem(${item.id})">🗑️</button>
        </div>
      `;

      list.appendChild(card);
    });
}

// =========================
// SORTING
// =========================
function sortBy(type) {
  if (type === "priority") {
    items.sort((a, b) => b.priority - a.priority);
  }

  if (type === "price") {
    items.sort((a, b) => a.price - b.price);
  }

  if (type === "date") {
    items.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  }

  saveAndRender();
}

// =========================
// ACTIONS
// =========================
function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  saveAndRender();
}

function archiveItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  item.archived = true;
  saveAndRender();
}

function toggleArchived() {
  showArchived = !showArchived;

  document.getElementById("archive-toggle").textContent =
    showArchived ? "hide archived 📦" : "show archived 📦";

  render();
}

// =========================
// DECISION LOGIC
// =========================
function decision(item) {
  if (item.priority >= 4 && item.price <= 2000) return "buy 💖";
  if (item.priority >= 4 && item.price > 2000) return "wait 🕒";
  if (item.priority <= 2) return "skip 🫠";
  return "think about it 🤔";
}

// =========================
// BUDGET FILTER
// =========================
function applyBudget() {
  const max = Number(budgetInput.value);
  if (!max) return render();

  render(items.filter(item => item.price <= max));
}

// =========================
// THEME
// =========================
function toggleTheme() {
  document.body.classList.toggle("dark");
  updateThemeToggle();
}

function updateThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  btn.textContent = document.body.classList.contains("dark")
    ? "Day mode"
    : "Night mode";
}

// =========================
// INIT
// =========================
updatePriorityHearts(3);
updateThemeToggle();
render();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
