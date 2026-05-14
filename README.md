# Personal Expense Tracker

Personal Expense Tracker is a beginner-friendly full-stack CRUD web application built with HTML, CSS, Vanilla JavaScript, Node.js, Express.js, and MongoDB Atlas. It allows users to add, view, edit, and delete expense records, and it also shows the total expense amount.

## Features

- Add a new expense with description, amount, category, and date
- View all saved expenses in a clean dashboard table
- Edit any existing expense
- Delete an expense
- View total expense amount
- Store data in MongoDB Atlas
- Use Fetch API for frontend-backend communication
- Beginner-friendly code structure for college submission

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose

## Folder Structure

```text
project-folder/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── expenseController.js
│   ├── models/
│   │   └── Expense.js
│   ├── routes/
│   │   └── expenseRoutes.js
│   ├── .env
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
├── package.json
└── README.md
```

## Step-by-Step Setup

### 1. Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Create a free cluster.
3. Create a database user with username and password.
4. Open **Network Access** and allow your current IP address.
5. Open **Database** and click **Connect**.
6. Choose **Drivers** and copy your MongoDB connection string.
7. Replace the value inside `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/expenseTrackerDB?retryWrites=true&w=majority&appName=Cluster0
```

### 2. Install Packages

Run this command in the project root:

```bash
npm install
```

### 3. Run the Project

For normal start:

```bash
npm start
```

For development mode with auto-restart:

```bash
npm run dev
```

### 4. Open in Browser

Open:

```text
http://localhost:5000
```

## Railway Deployment

Deploying to Railway is simple because the frontend is already served by Express from the same app.

### 1. Push Project to GitHub

Make sure your project is uploaded to GitHub first.

### 2. Create a New Railway Project

1. Log in to Railway.
2. Click **New Project**.
3. Choose **Deploy from GitHub Repo**.
4. Select your `personal-expense-tracker` repository.

### 3. Add Environment Variables in Railway

Open your Railway project and add:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Notes:

- Railway will usually provide its own `PORT` automatically, so adding it manually is optional.
- Do not upload your local `backend/.env` file to GitHub.
- Railway works with either `mongodb+srv://` or `mongodb://` connection strings, as long as the URI is valid.

### 4. Allow MongoDB Atlas Access

If MongoDB Atlas blocks Railway, go to **Network Access** in Atlas and allow:

```text
0.0.0.0/0
```

This is often needed because Railway deploys from cloud infrastructure with changing IP addresses.

### 5. Deploy

Railway will automatically:

- install dependencies with `npm install`
- run the app using `npm start`

### 6. Open the Live App

After deployment finishes, Railway will give you a public URL. Open that URL in your browser to use the app online.

## How the Project Works

- The frontend form sends data to the backend using Fetch API.
- Express routes handle API requests.
- Controllers manage CRUD logic.
- Mongoose model defines the expense schema.
- MongoDB Atlas stores all expense records.
- The frontend fetches all expenses and displays them in a table.

## API Routes

- `GET /api/expenses` - Get all expenses and total amount
- `POST /api/expenses` - Add a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

## Backend Files

### `backend/server.js`

- Starts the Express server
- Connects to MongoDB Atlas
- Serves frontend files
- Registers expense routes

### `backend/config/db.js`

- Connects the application to MongoDB Atlas using Mongoose

### `backend/models/Expense.js`

- Contains the Mongoose schema for expense data

### `backend/controllers/expenseController.js`

- Contains Create, Read, Update, and Delete logic

### `backend/routes/expenseRoutes.js`

- Contains all expense API routes

## Frontend Files

### `frontend/index.html`

- Contains the form and expense table layout

### `frontend/style.css`

- Adds simple and clean styling

### `frontend/script.js`

- Handles Fetch API requests
- Loads all expenses
- Adds, edits, and deletes expenses
- Updates the total expense amount on screen

## GitHub Upload Commands

Use these commands after creating a GitHub repository:

```bash
git init
git add .
git commit -m "Initial commit - Personal Expense Tracker"
git branch -M main
git remote add origin https://github.com/your-username/personal-expense-tracker.git
git push -u origin main
```

## Important Notes

- Do not upload your real `backend/.env` file to GitHub.
- `backend/.env.example` is included to show the required variables.
- Make sure MongoDB Atlas network access allows your machine to connect.
- For Railway deployment, add `MONGODB_URI` in Railway Variables instead of relying on a local `.env` file.

## License

This project is free to use for learning and college submission.
