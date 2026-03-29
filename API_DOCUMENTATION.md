# FitZone Gym - Backend API Documentation

## Base URL
```
http://localhost:5000
```

## Database Schema

### Tables Structure

#### Members
```sql
- id (INTEGER, PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, UNIQUE, NOT NULL)
- phone (TEXT, NOT NULL)
- membership_plan (TEXT, DEFAULT: 'basic')
- start_date (TEXT)
- status (TEXT, DEFAULT: 'active')
- created_at (DATETIME)
- updated_at (DATETIME)
```

#### Trainers
```sql
- id (INTEGER, PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, UNIQUE, NOT NULL)
- phone (TEXT)
- specialization (TEXT)
- experience_years (INTEGER)
- bio (TEXT)
- image_url (TEXT)
- created_at (DATETIME)
```

#### Classes
```sql
- id (INTEGER, PRIMARY KEY)
- class_name (TEXT, NOT NULL)
- trainer_id (INTEGER, FOREIGN KEY)
- schedule_day (TEXT)
- schedule_time (TEXT)
- capacity (INTEGER, DEFAULT: 20)
- current_enrollment (INTEGER, DEFAULT: 0)
- description (TEXT)
- created_at (DATETIME)
```

#### Class_Bookings
```sql
- id (INTEGER, PRIMARY KEY)
- member_id (INTEGER, FOREIGN KEY)
- class_id (INTEGER, FOREIGN KEY)
- booking_date (TEXT)
- status (TEXT, DEFAULT: 'confirmed')
- created_at (DATETIME)
```

#### Membership_Plans
```sql
- id (INTEGER, PRIMARY KEY)
- plan_name (TEXT, UNIQUE, NOT NULL)
- price (REAL, NOT NULL)
- duration_months (INTEGER, NOT NULL)
- classes_per_week (INTEGER)
- personal_training_sessions (INTEGER, DEFAULT: 0)
- locker_access (BOOLEAN, DEFAULT: 1)
- description (TEXT)
- created_at (DATETIME)
```

#### Contact_Submissions
```sql
- id (INTEGER, PRIMARY KEY)
- name (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- phone (TEXT)
- subject (TEXT)
- message (TEXT, NOT NULL)
- submitted_date (TEXT)
- status (TEXT, DEFAULT: 'new')
- created_at (DATETIME)
```

---

## API Endpoints

### Health Check
#### GET `/api/health`
Check if backend is running
```json
Response: {
  "status": "Backend is running",
  "timestamp": "2026-03-29T10:30:00Z"
}
```

---

## MEMBERS ENDPOINTS

### 1. Create Member
**POST** `/api/members`
```json
Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "membership_plan": "premium",
  "start_date": "2026-03-29"
}

Response (201):
{
  "id": 1,
  "message": "Member created successfully",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

### 2. Get All Members
**GET** `/api/members`
```json
Response (200):
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "membership_plan": "premium",
    "start_date": "2026-03-29",
    "status": "active",
    "created_at": "2026-03-29T10:00:00Z"
  }
]
```

### 3. Get Single Member
**GET** `/api/members/:id`
```json
Response (200):
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "membership_plan": "premium",
  "status": "active"
}
```

### 4. Update Member
**PUT** `/api/members/:id`
```json
Request Body:
{
  "name": "John Doe Updated",
  "email": "john.new@example.com",
  "phone": "9876543210",
  "membership_plan": "elite",
  "status": "active"
}

Response (200):
{
  "message": "Member updated successfully"
}
```

### 5. Delete Member
**DELETE** `/api/members/:id`
```json
Response (200):
{
  "message": "Member deleted successfully"
}
```

---

## TRAINERS ENDPOINTS

### 1. Create Trainer
**POST** `/api/trainers`
```json
Request Body:
{
  "name": "Rahul Kumar",
  "email": "rahul@fitzone.com",
  "phone": "9876543210",
  "specialization": "Strength Training",
  "experience_years": 8,
  "bio": "Expert in powerlifting and muscle building"
}

Response (201):
{
  "id": 1,
  "message": "Trainer created successfully",
  "name": "Rahul Kumar"
}
```

### 2. Get All Trainers
**GET** `/api/trainers`
```json
Response (200):
[
  {
    "id": 1,
    "name": "Rahul Kumar",
    "email": "rahul@fitzone.com",
    "phone": "9876543210",
    "specialization": "Strength Training",
    "experience_years": 8,
    "bio": "Expert in powerlifting and muscle building"
  }
]
```

### 3. Get Single Trainer
**GET** `/api/trainers/:id`
```json
Response (200):
{
  "id": 1,
  "name": "Rahul Kumar",
  "email": "rahul@fitzone.com",
  "specialization": "Strength Training"
}
```

---

## CLASSES ENDPOINTS

### 1. Create Class
**POST** `/api/classes`
```json
Request Body:
{
  "class_name": "Morning Yoga",
  "trainer_id": 2,
  "schedule_day": "Monday",
  "schedule_time": "06:00 AM",
  "capacity": 25,
  "description": "Energizing morning yoga session"
}

Response (201):
{
  "id": 1,
  "message": "Class created successfully",
  "class_name": "Morning Yoga"
}
```

### 2. Get All Classes
**GET** `/api/classes`
```json
Response (200):
[
  {
    "id": 1,
    "class_name": "Morning Yoga",
    "trainer_id": 2,
    "trainer_name": "Priya Sharma",
    "schedule_day": "Monday",
    "schedule_time": "06:00 AM",
    "capacity": 25
  }
]
```

### 3. Get Single Class
**GET** `/api/classes/:id`
```json
Response (200):
{
  "id": 1,
  "class_name": "Morning Yoga",
  "trainer_name": "Priya Sharma",
  "schedule_day": "Monday",
  "schedule_time": "06:00 AM"
}
```

### 4. Update Class
**PUT** `/api/classes/:id`
```json
Request Body:
{
  "class_name": "Advanced Yoga",
  "trainer_id": 2,
  "capacity": 30
}

Response (200):
{
  "message": "Class updated successfully"
}
```

---

## CLASS BOOKINGS ENDPOINTS

### 1. Book a Class
**POST** `/api/class-bookings`
```json
Request Body:
{
  "member_id": 1,
  "class_id": 2
}

Response (201):
{
  "id": 1,
  "message": "Class booked successfully"
}
```

### 2. Get Member's Bookings
**GET** `/api/members/:id/bookings`
```json
Response (200):
[
  {
    "id": 1,
    "member_id": 1,
    "class_id": 2,
    "class_name": "CrossFit WOD",
    "schedule_day": "Tuesday",
    "schedule_time": "06:30 PM",
    "trainer_name": "Sneha Singh",
    "booking_date": "2026-03-29"
  }
]
```

---

## CONTACT FORM ENDPOINTS

### 1. Submit Contact Form
**POST** `/api/contact`
```json
Request Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "subject": "Membership Inquiry",
  "message": "I would like to know more about your premium membership"
}

Response (201):
{
  "id": 1,
  "message": "Thank you! Your message has been received."
}
```

### 2. Get All Contact Submissions
**GET** `/api/contact`
```json
Response (200):
[
  {
    "id": 1,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543210",
    "subject": "Membership Inquiry",
    "message": "I would like to know more...",
    "submitted_date": "2026-03-29T10:30:00Z",
    "status": "new"
  }
]
```

---

## MEMBERSHIP PLANS ENDPOINTS

### Get All Membership Plans
**GET** `/api/membership-plans`
```json
Response (200):
[
  {
    "id": 1,
    "plan_name": "Basic",
    "price": 999,
    "duration_months": 1,
    "classes_per_week": 12,
    "personal_training_sessions": 0,
    "description": "Unlimited gym access, 3 classes per week"
  },
  {
    "id": 2,
    "plan_name": "Premium",
    "price": 1999,
    "duration_months": 1,
    "classes_per_week": 24,
    "personal_training_sessions": 2,
    "description": "Unlimited gym access, 5 classes per week"
  }
]
```

---

## Sample API Requests (cURL)

### Create a Member
```bash
curl -X POST http://localhost:5000/api/members \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "membership_plan": "premium"
  }'
```

### Get All Members
```bash
curl http://localhost:5000/api/members
```

### Book a Class
```bash
curl -X POST http://localhost:5000/api/class-bookings \
  -H "Content-Type: application/json" \
  -d '{
    "member_id": 1,
    "class_id": 2
  }'
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane",
    "email": "jane@example.com",
    "message": "I am interested in membership"
  }'
```

---

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message describing what went wrong"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found
- `500` - Server Error

---

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the backend:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. The backend will run on `http://localhost:5000`
4. Database will be created automatically at `./gym.db`

---

## Sample Data Included

The database is automatically populated with sample data:
- 3 Membership Plans (Basic, Premium, Elite)
- 4 Sample Trainers
- 5 Sample Classes
- 3 Sample Members
