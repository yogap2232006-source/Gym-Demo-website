const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'gym.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

function initialize() {
  // Create tables
  db.exec(`
    -- Members table
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      membership_plan TEXT DEFAULT 'basic',
      start_date TEXT,
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Trainers table
    CREATE TABLE IF NOT EXISTS trainers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      specialization TEXT,
      experience_years INTEGER,
      bio TEXT,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Classes table
    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      class_name TEXT NOT NULL,
      trainer_id INTEGER NOT NULL,
      schedule_day TEXT,
      schedule_time TEXT,
      capacity INTEGER DEFAULT 20,
      current_enrollment INTEGER DEFAULT 0,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (trainer_id) REFERENCES trainers(id)
    );

    -- Class Bookings table
    CREATE TABLE IF NOT EXISTS class_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL,
      class_id INTEGER NOT NULL,
      booking_date TEXT,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (member_id) REFERENCES members(id),
      FOREIGN KEY (class_id) REFERENCES classes(id),
      UNIQUE(member_id, class_id)
    );

    -- Membership Plans table
    CREATE TABLE IF NOT EXISTS membership_plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plan_name TEXT NOT NULL UNIQUE,
      price REAL NOT NULL,
      duration_months INTEGER NOT NULL,
      classes_per_week INTEGER,
      personal_training_sessions INTEGER DEFAULT 0,
      locker_access BOOLEAN DEFAULT 1,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Contact Submissions table
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      submitted_date TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Create indexes for better query performance
    CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
    CREATE INDEX IF NOT EXISTS idx_classes_trainer_id ON classes(trainer_id);
    CREATE INDEX IF NOT EXISTS idx_class_bookings_member_id ON class_bookings(member_id);
    CREATE INDEX IF NOT EXISTS idx_class_bookings_class_id ON class_bookings(class_id);
  `);

  // Insert sample data
  insertSampleData();
}

function insertSampleData() {
  // Check if data already exists
  const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get().count;
  if (memberCount > 0) return;

  // Insert membership plans
  const insertPlan = db.prepare(`
    INSERT INTO membership_plans (plan_name, price, duration_months, classes_per_week, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertPlan.run('Basic', 999, 1, 12, 'Unlimited gym access, 3 classes per week');
  insertPlan.run('Premium', 1999, 1, 24, 'Unlimited gym access, 5 classes per week, 2 personal training sessions');
  insertPlan.run('Elite', 2999, 1, 48, 'Unlimited gym access, all classes, 4 personal training sessions, nutrition plan');

  // Insert sample trainers
  const insertTrainer = db.prepare(`
    INSERT INTO trainers (name, email, phone, specialization, experience_years, bio)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertTrainer.run('Rahul Kumar', 'rahul@fitzone.com', '9876543210', 'Strength Training', 8, 'Expert in powerlifting and muscle building');
  insertTrainer.run('Priya Sharma', 'priya@fitzone.com', '9876543211', 'Yoga & Flexibility', 6, 'Certified yoga instructor with 6 years experience');
  insertTrainer.run('Amit Patel', 'amit@fitzone.com', '9876543212', 'Cardio & HIIT', 7, 'Specializes in high-intensity interval training');
  insertTrainer.run('Sneha Singh', 'sneha@fitzone.com', '9876543213', 'CrossFit', 5, 'CrossFit level 2 coach');

  // Insert sample classes
  const insertClass = db.prepare(`
    INSERT INTO classes (class_name, trainer_id, schedule_day, schedule_time, capacity, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertClass.run('Morning Yoga', 2, 'Monday', '06:00 AM', 25, 'Energizing morning yoga session');
  insertClass.run('CrossFit WOD', 4, 'Tuesday', '06:30 PM', 20, 'High-intensity workout of the day');
  insertClass.run('Strength Training', 1, 'Wednesday', '07:00 PM', 15, 'Advanced strength training for muscle gain');
  insertClass.run('Cardio Blast', 3, 'Thursday', '06:00 PM', 30, 'Fast-paced cardio and conditioning');
  insertClass.run('Evening Yoga', 2, 'Friday', '07:00 PM', 25, 'Relaxing evening yoga and stretching');

  // Insert sample members
  const insertMember = db.prepare(`
    INSERT INTO members (name, email, phone, membership_plan, start_date, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertMember.run('John Doe', 'john@example.com', '9123456789', 'Premium', new Date().toISOString(), 'active');
  insertMember.run('Jane Smith', 'jane@example.com', '9123456790', 'Basic', new Date().toISOString(), 'active');
  insertMember.run('Mike Johnson', 'mike@example.com', '9123456791', 'Elite', new Date().toISOString(), 'active');

  console.log('✅ Sample data inserted successfully');
}

module.exports = {
  db,
  initialize
};
