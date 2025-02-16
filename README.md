
# YouTube Clone

This is a YouTube clone built using ReactJS, Node.js, MongoDB, and JWT authentication. The application allows users to:
- Register, Login, and Logout securely using JWT.
- Search videos by title.
- Filter videos by category.
- Create and manage channels.
- Upload videos.
- Add, edit, and delete comments.
- Like and dislike videos.
- Subscribe and unsubscribe to channels.
- Ad integration for monetization.

---

## 🚀 Features

- **User Authentication:** Register, login, and logout using JWT.
- **Video Search:** Search videos by title.
- **Video Filtering:** Filter videos by category.
- **Channel Management:** Create, update, and delete channels.
- **Video Uploading:** Upload videos with proper validations.
- **Commenting System:** Add, edit, and delete comments.
- **Likes and Dislikes:** Like and dislike videos.
- **Subscriptions:** Subscribe and unsubscribe to channels.


---

## 🛠 Tech Stack

- **Frontend:** ReactJS, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)


---

## 📂 Folder Structure

```
Youtube/
├──YoutubeFrontend/                   # ReactJS Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── utils/
│       └── App.js
│
└── YoutubeBackend/                   # Node.js Backend
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

---

## ⚙️ Installation and Setup

### Prerequisites

- Node.js (v18.x or higher)
- MongoDB (locally or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/tusharcrypto/youtube
cd youtube
```

### 2. Install Dependencies

#### For Backend
```bash
cd YotubeFrontend
npm install
```

#### For Frontend
```bash
cd YoutubeBackend
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the `server` directory and add the following:

```
MONGO_URI=your_mongodb_connection_string
SIGNATURE=your_jwt_secret_key
PORT=4000
```

---

### 4. Running the Application

#### Backend

```bash
cd app
npm start
```

#### Frontend

```bash
cd YotubeFrontend
npm start
```

The application should now be running on:
- Frontend: `http://localhost:1573`
- Backend: `http://localhost:4000`

---

## 🔗 API Routes

### Auth Routes
- **POST** `/api/registeruser`: Register a new user
- **POST** `/api/loginuser`: Login and get JWT token

### User Routes
- **GET** `/api/user/:id`: Get user details
- **PUT** `/api/user/:id`: Update user details

### Video Routes
- **POST** `/api/video`: Upload a new video
- **GET** `/api/video`: Get all videos
- **GET** `/api/video/:id`: Get video by ID
- **PUT** `/api/video/:id`: Update video details
- **DELETE** `/api/video/:id`: Delete video

### Comment Routes
- **POST** `/api/comment`: Add a new comment
- **GET** `/api/comment/:videoId`: Get all comments for a video
- **DELETE** `/api/comment/:id`: Delete a comment

### Subscription Routes
- **POST** `/api/subscribe`: Subscribe to a channel


---

## 📜 Available Scripts

### In the `YotubeFrontend` directory:

- `npm start`: Runs the React app in development mode.
- `npm run build`: Builds the app for production.

### In the `YotubeBackend` directory:

- `npm start`: Runs the server using Node.js.
- `npm run dev`: Runs the server using nodemon for hot-reloading.

---


## 🧑‍💻 Author

Developed by **Tushar Wankhede**  
Feel free to reach out for any queries or contributions!

---

## 🙏 Acknowledgements

- [ReactJS](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)

---

## 🔥 Show Your Support

Give a ⭐️ if you like this project!
