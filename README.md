# React Dynamic List of Posts

[Live Demo](https://mateuszcieplak.github.io/react_dynamic-list-of-posts/)

This project is a dynamic blog-style application built with **React** and **TypeScript**, where users can select a user from a dropdown and view their posts, comments, and interact with the post data. It demonstrates advanced state management, form validation, async API handling, and component-based architecture.

---

## 🚀 Features

### 🔍 User & Post Management
- Loads all users on page load and displays a **user selector** dropdown.
- Fetches and displays posts for the selected user in a responsive table format.
- Handles loading and error states with appropriate UI feedback.

### 📝 Sidebar & Comments
- Clicking a post opens a **sidebar** with post details and comments.
- Lazy-loads comments with loader and error handling.
- Displays a form for adding comments with validation, input persistence, and submission feedback.
- Enables comment deletion with **optimistic UI updates** for better UX.

### 💡 UX & Architecture
- Componentized structure for better scalability and reuse.
- Form validation with real-time feedback and error handling.
- Uses a `fetchClient` utility with artificial 300ms API delay simulation.
- Clean and responsive UI with Prettier formatting and consistent style guide.

---

## 🛠️ Technologies Used

- React
- TypeScript
- CSS Modules
- Custom Form Validation
- REST API
- Prettier + ESLint
- GitHub Pages for deployment

---

## 🧑‍💻 Getting Started

```bash
git clone https://github.com/MateuszCieplak/react_dynamic-list-of-posts
cd react_dynamic-list-of-posts
npm install
npm start
