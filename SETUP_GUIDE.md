# NotesNova.ai - Premium Notes Platform 📚✨

Welcome to **NotesNova.ai**! A premium 4K animated notes platform designed for students from class 1-12.

Created by **Advik Cleadia** 👨‍💻

## 🚀 Project Structure

```
notesnova_ai/
├── models/                 # Database models
│   ├── User.js            # User schema
│   └── Note.js            # Note schema
├── routes/                # API routes
│   ├── auth.js           # Authentication (login/register)
│   ├── notes.js          # Notes CRUD operations
│   └── users.js          # User profile operations
├── client/               # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── pages/       # React pages
│       │   ├── Home.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── Dashboard.js
│       ├── styles/      # CSS files
│       │   ├── Home.css
│       │   ├── Auth.css
│       │   └── Dashboard.css
│       ├── App.js       # Main component with routing
│       └── index.js     # Entry point
├── server.js            # Express server
├── package.json         # Backend dependencies
└── .env.example         # Environment template
```

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18, Framer Motion, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT (JSON Web Tokens) |
| **Styling** | CSS3 with animations |

## ✨ Features

✅ **Beautiful UI** - 4K quality with glassmorphism effects  
✅ **Smooth Animations** - Powered by Framer Motion  
✅ **User Authentication** - Secure login/register with JWT  
✅ **Note Management** - Create, read, update, delete notes  
✅ **Smart Filtering** - Filter by class and subject  
✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Search Functionality** - Find notes quickly  
✅ **Premium Rating System** - Rate and download notes  

## 📋 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud - MongoDB Atlas)
- Git

### 1️⃣ Clone Repository
```bash
git clone https://github.com/advik2012710/notesnova_ai.git
cd notesnova_ai
```

### 2️⃣ Setup Backend

```bash
# Install backend dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
# Add MongoDB URI, JWT secret, etc.
nano .env

# Start backend server (development mode)
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3️⃣ Setup Frontend

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will open at: `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
```

### Notes
```
GET    /api/notes            - Get all notes (with filters)
GET    /api/notes/:id        - Get specific note
POST   /api/notes            - Create new note
PUT    /api/notes/:id        - Update note
DELETE /api/notes/:id        - Delete note
```

### Users
```
GET    /api/users/:id        - Get user profile
PUT    /api/users/:id        - Update user profile
```

## 🗄️ Database Models

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  class: Number (1-12),
  profilePicture: String,
  bio: String,
  createdAt: Date
}
```

### Note Schema
```javascript
{
  title: String (required),
  description: String,
  subject: String (Math, Science, English, Hindi, Social Studies, Computer, Other),
  class: Number (1-12),
  chapter: String,
  fileUrl: String (required),
  fileType: String (pdf, image, document),
  uploadedBy: ObjectId (User reference),
  rating: Number (0-5),
  downloads: Number,
  tags: Array,
  createdAt: Date,
  updatedAt: Date
}
```

## 🌍 Environment Variables (.env)

```env
MONGODB_URI=mongodb://localhost:27017/notesnova
PORT=5000
JWT_SECRET=your_secret_key_change_this_in_production
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 🚀 Future Enhancements

- 🤖 AI-powered note summarization
- 🔍 Advanced search with AI recommendations
- ⭐ User ratings and reviews
- 📌 Bookmarks and favorites
- 👨‍💼 Admin panel for content moderation
- 📱 Mobile app (React Native)
- 🤝 Social sharing features
- 🎥 Video tutorials
- 👥 Study groups and collaboration

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Check if MongoDB is running or update MONGODB_URI in .env
```

### CORS Error
```
Make sure backend is running on port 5000
Check proxy in client/package.json
```

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Find and kill process on port 3000
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

## 📖 Learning Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Official Docs](https://docs.mongodb.com)
- [Framer Motion](https://www.framer.com/motion)
- [JWT Auth Tutorial](https://jwt.io/introduction)

## 📝 License

MIT License - Feel free to use this project for learning and development!

## 👤 Author

**Advik Cleadia**  
GitHub: [@advik2012710](https://github.com/advik2012710)

---

**Happy Coding!** 🚀✨  
If you find this project helpful, please give it a ⭐ on GitHub!
