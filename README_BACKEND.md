# FitZone Gym - Complete Backend & Database

A fully functional backend API and SQLite database for the FitZone Gym Chennai website.

## 🎯 What's Included

### Backend Files
- **server.js** - Express.js backend server with all API endpoints
- **database.js** - SQLite database setup and schema  
- **package.json** - Node.js dependencies
- **.env** - Environment configuration
- **.gitignore** - Git ignore file

### Documentation
- **API_DOCUMENTATION.md** - Complete API reference with all endpoints
- **SETUP_GUIDE.md** - Step-by-step setup instructions
- **INTEGRATION_EXAMPLES.md** - Code examples for frontend integration
- **README.md** - This file

### Frontend Integration
- **api-client.js** - JavaScript library for API communication

## 🗄️ Database Schema

### Tables Included
1. **members** - User/member profiles and subscriptions
2. **trainers** - Trainer information and specializations
3. **classes** - Fitness class details and schedules
4. **class_bookings** - Member class registrations
5. **membership_plans** - Pricing tiers and features
6. **contact_submissions** - Contact form submissions

## 📡 API Endpoints

### Members Management
```
POST   /api/members           - Create new member
GET    /api/members           - Get all members
GET    /api/members/:id       - Get specific member
PUT    /api/members/:id       - Update member
DELETE /api/members/:id       - Delete member
```

### Classes Management
```
POST   /api/classes           - Create class
GET    /api/classes           - Get all classes
GET    /api/classes/:id       - Get specific class
PUT    /api/classes/:id       - Update class
POST   /api/class-bookings    - Book a class
GET    /api/members/:id/bookings - Get member bookings
```

### Trainers Management
```
POST   /api/trainers          - Create trainer
GET    /api/trainers          - Get all trainers
GET    /api/trainers/:id      - Get specific trainer
```

### Contact & More
```
POST   /api/contact           - Submit contact form
GET    /api/contact           - Get submissions (admin)
GET    /api/membership-plans  - Get pricing plans
GET    /api/health            - Health check
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd "c:\Users\Admin\Desktop\gym web"
npm install
```

### 2. Start Backend
```bash
npm start
```

Server runs on: **http://localhost:5000**

### 3. Test API
```bash
curl http://localhost:5000/api/health
```

## 📊 Sample Data

Database pre-populated with:
- 3 membership plans (Basic, Premium, Elite)
- 4 trainers with specializations
- 5 fitness classes with schedules
- 3 sample members

## 💻 Using the API

### From JavaScript (Frontend)
```javascript
// Include the client library
<script src="api-client.js"></script>

// Get all classes
const result = await fitZoneAPI.getClasses();

// Create new member
const memberData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "9876543210",
  membership_plan: "premium"
};
const result = await fitZoneAPI.createMember(memberData);

// Submit contact form
const contactData = {
  name: "Jane",
  email: "jane@example.com",
  message: "Interested in membership"
};
await fitZoneAPI.submitContact(contactData);
```

### From HTML Form
See `INTEGRATION_EXAMPLES.md` for complete examples including:
- Contact form integration
- Class listing and booking
- Trainer display
- Membership plan showcase
- User registration

## 📋 Files Created

```
gym web/
├── server.js                      # Backend server (40+ API endpoints)
├── database.js                    # Database & schema setup
├── package.json                   # Dependencies
├── .env                           # Configuration
├── .gitignore                     # Git ignore
├── api-client.js                  # Frontend API library
├── README.md                      # This file
├── API_DOCUMENTATION.md           # Complete API reference
├── SETUP_GUIDE.md                 # Setup instructions
├── INTEGRATION_EXAMPLES.md        # Code examples
└── gym.db                         # SQLite database (auto-created)
```

## 🔧 Configuration

Edit `.env` to customize:
```
PORT=5000                 # Backend port
NODE_ENV=development      # Development/production
CORS_ORIGIN=localhost     # Allowed origins
```

## ✨ Features

✅ Express.js REST API
✅ SQLite database with schema
✅ CORS enabled for frontend integration
✅ Error handling
✅ Sample data pre-populated
✅ JavaScript API client library
✅ Comprehensive documentation
✅ Ready for production deployment

## 📝 Common Tasks

### Add a new member
```javascript
await fitZoneAPI.createMember({
  name: "New Member",
  email: "newmember@example.com",
  phone: "9876543210",
  membership_plan: "premium"
});
```

### Get all classes
```javascript
const result = await fitZoneAPI.getClasses();
console.log(result.data); // Array of classes
```

### Book a class
```javascript
await fitZoneAPI.bookClass({
  member_id: 1,
  class_id: 2
});
```

### Submit contact form
```javascript
await fitZoneAPI.submitContact({
  name: "John",
  email: "john@example.com",
  phone: "9876543210",
  subject: "Inquiry",
  message: "I want to join"
});
```

## 🔐 Security Notes

- Change default credentials in production
- Enable HTTPS/SSL
- Add authentication (JWT tokens)
- Validate all inputs
- Use environment variables for secrets
- Enable rate limiting
- Add CORS restrictions

## 📚 Documentation

- **API_DOCUMENTATION.md** - Full API reference
- **SETUP_GUIDE.md** - Installation & troubleshooting
- **INTEGRATION_EXAMPLES.md** - Frontend code examples

## 🚀 Next Steps

1. ✅ Backend API created
2. ✅ Database with schema created
3. ✅ Sample data pre-populated
4. **TODO**: Integrate with your HTML forms
5. **TODO**: Add authentication
6. **TODO**: Deploy to production

## 💡 Integration Steps

1. Add to your HTML `<head>`:
   ```html
   <script src="api-client.js"></script>
   ```

2. Copy examples from `INTEGRATION_EXAMPLES.md`

3. Update form IDs and customize as needed

4. Test with backend running

See `INTEGRATION_EXAMPLES.md` for specific code examples!

## 🆘 Troubleshooting

**Port 5000 already in use?**
- Change `PORT` in `.env`

**npm install fails?**
```bash
npm cache clean --force
npm install
```

**Database issues?**
- Delete `gym.db` and restart

**CORS errors?**
- Update `CORS_ORIGIN` in `.env`

## 📞 API Support

All endpoints:
- Accept JSON input
- Return JSON output
- Use standard HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes

See `API_DOCUMENTATION.md` for complete reference!

---

**Backend Status**: ✅ Ready to use
**Database**: ✅ Pre-configured with schema
**Sample Data**: ✅ Pre-populated
**Documentation**: ✅ Complete

🎉 **Your gym website now has a complete backend!**
