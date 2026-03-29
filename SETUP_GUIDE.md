# FitZone Gym Backend - Setup Guide

## 📋 Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Terminal/Command Prompt**

## 🚀 Quick Start

### Step 1: Navigate to Project Directory
```bash
cd "c:\Users\Admin\Desktop\gym web"
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables
- **better-sqlite3** - SQLite database
- **nodemon** - Auto-reload for development

### Step 3: Start the Backend Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

You should see:
```
🏋️ FitZone Gym Backend running on http://localhost:5000
📊 Database initialized at ./gym.db
```

### Step 4: Access the API

Test the health endpoint:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "Backend is running",
  "timestamp": "2026-03-29T10:30:00Z"
}
```

## 📁 Project Structure

```
gym web/
├── server.js              # Main backend server
├── database.js            # Database initialization & schema
├── package.json           # Project dependencies
├── .env                   # Environment variables
├── gym.db                 # SQLite database (auto-created)
├── API_DOCUMENTATION.md   # Full API reference
└── SETUP_GUIDE.md         # This file
```

## 🗄️ Database

The database (`gym.db`) is automatically created on first run with:

- **members** - User/member information
- **trainers** - Trainer profiles
- **classes** - Fitness classes
- **class_bookings** - Member class registrations
- **membership_plans** - Pricing tiers
- **contact_submissions** - Contact form submissions

Sample data is pre-populated:
- 3 membership plans
- 4 sample trainers
- 5 sample classes
- 3 sample members

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check backend status |
| POST | `/api/members` | Create new member |
| GET | `/api/members` | Get all members |
| GET | `/api/members/:id` | Get specific member |
| PUT | `/api/members/:id` | Update member |
| DELETE | `/api/members/:id` | Delete member |
| POST | `/api/trainers` | Create trainer |
| GET | `/api/trainers` | Get all trainers |
| GET | `/api/trainers/:id` | Get specific trainer |
| POST | `/api/classes` | Create class |
| GET | `/api/classes` | Get all classes |
| GET | `/api/classes/:id` | Get specific class |
| PUT | `/api/classes/:id` | Update class |
| POST | `/api/class-bookings` | Book a class |
| GET | `/api/members/:id/bookings` | Get member bookings |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contact submissions |
| GET | `/api/membership-plans` | Get all membership plans |

## 💻 Testing API Endpoints

### Using PowerShell (Windows)

#### Get All Members:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/members" -Method Get
```

#### Create New Member:
```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    phone = "9876543210"
    membership_plan = "premium"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/members" -Method Post -Body $body -ContentType "application/json"
```

#### Get All Classes:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/classes" -Method Get
```

### Using cURL (Command Line)

#### Get All Members:
```bash
curl http://localhost:5000/api/members
```

#### Create New Member:
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"John\",\"email\":\"john@test.com\",\"phone\":\"9876543210\"}"
```

### Using Postman (GUI Tool)

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Set method to POST
4. URL: `http://localhost:5000/api/members`
5. Body (JSON):
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "membership_plan": "premium"
}
```
6. Click Send

## 🔧 Configuration

Edit `.env` file to change:
```
PORT=5000              # Change backend port
NODE_ENV=development   # Set to production for live
CORS_ORIGIN=...       # API access origins
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use:
1. Change PORT in `.env` to another port (e.g., 3001)
2. Restart the server

### Database Issues
Delete `gym.db` and restart - it will recreate with fresh sample data

### Dependencies Not Installing
```bash
npm cache clean --force
npm install
```

### Node Modules Issues
```bash
rm -r node_modules
rm package-lock.json
npm install
```

## 📝 Example Usage Flow

1. **Create a Member**
   ```bash
   POST /api/members
   Body: { "name": "John", "email": "john@example.com", "phone": "9876543210" }
   ```

2. **Get All Classes**
   ```bash
   GET /api/classes
   ```

3. **Book a Class**
   ```bash
   POST /api/class-bookings
   Body: { "member_id": 1, "class_id": 2 }
   ```

4. **Get Member Bookings**
   ```bash
   GET /api/members/1/bookings
   ```

5. **Submit Contact Form**
   ```bash
   POST /api/contact
   Body: { "name": "Jane", "email": "jane@example.com", "message": "..." }
   ```

## 🔒 Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "fitzone-gym"
   ```
3. Consider upgrading to PostgreSQL for better scalability
4. Add authentication/JWT tokens
5. Set up HTTPS/SSL certificate
6. Use a reverse proxy (nginx)

## 📚 Further Development

### Add Authentication
- Implement JWT tokens
- Add login/signup endpoints
- Secure endpoints with middleware

### Add Payment Integration
- Stripe or Razorpay integration
- Membership subscription management

### Add More Features
- Workout tracking
- Nutrition plans
- Member progress reports
- SMS/Email notifications

## ❓ Support

For API documentation, see `API_DOCUMENTATION.md`

Happy coding! 🎉
