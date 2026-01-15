Here’s a clean, copy-paste-ready **`README.md`** you can use for the repo, written to match the vibe and features of your app exactly.

---

```md
# shoplist 🌸

A cute, minimalist **wishlist / shoplist web app** built with vanilla HTML, CSS, and JavaScript.  
Designed for tracking items you want to buy, comparing priorities, prices, and making quick “buy or skip” decisions — all stored locally in your browser.

---

## ✨ Features

- **Add wishlist items** with:
  - Name
  - Price (₱)
  - Optional product link
  - Tags
  - Category
  - Priority (1–5 hearts 💗)

- **Smart decision helper**
  - Automatically suggests: *buy*, *wait*, *think about it*, or *skip* based on priority and price

- **Sorting controls**
  - Sort by priority
  - Sort by price
  - Sort by most recent

- **Budget filter**
  - Show only items under a specified maximum price

- **Archive system**
  - Archive items instead of deleting
  - Toggle visibility of archived entries

- **Dark / light mode**
  - Persistent and easy to switch

- **LocalStorage powered**
  - No backend
  - Your data stays in your browser

---

## 🛠️ Built With

- **HTML** – structure
- **CSS** – soft pastel UI + dark mode
- **JavaScript (Vanilla)** – logic, state, and localStorage

No frameworks. No dependencies.

---

## 📁 Project Structure

```

.
├── index.html   # App structure
├── style.css    # Theme, layout, animations
└── script.js    # Logic, state management, localStorage

````

---

## 🚀 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/shoplist.git
````

2. **Open `index.html`**

   * Double-click it, or
   * Serve it with a local dev server

That’s it — no setup required.

---

## 💡 How It Works

* Items are stored in `localStorage` under the key `wishlist`
* Priority hearts control both:

  * Visual glow intensity
  * Decision logic
* Archived items are hidden by default but never deleted unless you choose to

---

## 🎨 Customization Ideas

* Add more categories
* Change the decision logic thresholds
* Add currency switching
* Export / import wishlist as JSON
* Add search or tag filtering

---

## 📜 License

This project is open-source and free to use for personal projects.

---

## 🌱 Author

Mini-app developed by
**[@ravionry](https://github.com/ravionry)**

---

Made for people who overthink purchases — gently 💗

```
