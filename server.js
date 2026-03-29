const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize database
db.initialize();

// ============ MEMBERS ROUTES ============
// Create new member
app.post('/api/members', (req, res) => {
  const { name, email, phone, membership_plan, start_date } = req.body;
  
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  const stmt = db.db.prepare(`
    INSERT INTO members (name, email, phone, membership_plan, start_date, status)
    VALUES (?, ?, ?, ?, ?, 'active')
  `);
  
  try {
    const result = stmt.run(name, email, phone, membership_plan || 'basic', start_date || new Date().toISOString());
    res.status(201).json({ 
      id: result.lastID, 
      message: 'Member created successfully',
      name, email, phone 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all members
app.get('/api/members', (req, res) => {
  try {
    const members = db.db.prepare('SELECT * FROM members').all();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single member
app.get('/api/members/:id', (req, res) => {
  try {
    const member = db.db.prepare('SELECT * FROM members WHERE id = ?').get(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update member
app.put('/api/members/:id', (req, res) => {
  const { name, email, phone, membership_plan, status } = req.body;
  
  try {
    const stmt = db.db.prepare(`
      UPDATE members 
      SET name = ?, email = ?, phone = ?, membership_plan = ?, status = ?
      WHERE id = ?
    `);
    stmt.run(name, email, phone, membership_plan, status, req.params.id);
    res.json({ message: 'Member updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete member
app.delete('/api/members/:id', (req, res) => {
  try {
    db.db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ CLASSES ROUTES ============
// Create class
app.post('/api/classes', (req, res) => {
  const { class_name, trainer_id, schedule_day, schedule_time, capacity, description } = req.body;
  
  if (!class_name || !trainer_id) {
    return res.status(400).json({ error: 'Class name and trainer ID are required' });
  }

  const stmt = db.db.prepare(`
    INSERT INTO classes (class_name, trainer_id, schedule_day, schedule_time, capacity, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  try {
    const result = stmt.run(class_name, trainer_id, schedule_day, schedule_time, capacity || 20, description);
    res.status(201).json({ 
      id: result.lastID, 
      message: 'Class created successfully',
      class_name 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all classes
app.get('/api/classes', (req, res) => {
  try {
    const classes = db.db.prepare(`
      SELECT c.*, t.name as trainer_name 
      FROM classes c
      LEFT JOIN trainers t ON c.trainer_id = t.id
    `).all();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single class
app.get('/api/classes/:id', (req, res) => {
  try {
    const cls = db.db.prepare(`
      SELECT c.*, t.name as trainer_name 
      FROM classes c
      LEFT JOIN trainers t ON c.trainer_id = t.id
      WHERE c.id = ?
    `).get(req.params.id);
    if (!cls) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(cls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update class
app.put('/api/classes/:id', (req, res) => {
  const { class_name, trainer_id, schedule_day, schedule_time, capacity, description } = req.body;
  
  try {
    const stmt = db.db.prepare(`
      UPDATE classes 
      SET class_name = ?, trainer_id = ?, schedule_day = ?, schedule_time = ?, capacity = ?, description = ?
      WHERE id = ?
    `);
    stmt.run(class_name, trainer_id, schedule_day, schedule_time, capacity, description, req.params.id);
    res.json({ message: 'Class updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ TRAINERS ROUTES ============
// Create trainer
app.post('/api/trainers', (req, res) => {
  const { name, email, phone, specialization, experience_years, bio } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const stmt = db.db.prepare(`
    INSERT INTO trainers (name, email, phone, specialization, experience_years, bio)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  try {
    const result = stmt.run(name, email, phone, specialization, experience_years, bio);
    res.status(201).json({ 
      id: result.lastID, 
      message: 'Trainer created successfully',
      name 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all trainers
app.get('/api/trainers', (req, res) => {
  try {
    const trainers = db.db.prepare('SELECT * FROM trainers').all();
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single trainer
app.get('/api/trainers/:id', (req, res) => {
  try {
    const trainer = db.db.prepare('SELECT * FROM trainers WHERE id = ?').get(req.params.id);
    if (!trainer) {
      return res.status(404).json({ error: 'Trainer not found' });
    }
    res.json(trainer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ CONTACT FORM ROUTES ============
// Submit contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message, subject } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const stmt = db.db.prepare(`
    INSERT INTO contact_submissions (name, email, phone, subject, message, submitted_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  try {
    const result = stmt.run(name, email, phone, subject, message, new Date().toISOString());
    res.status(201).json({ 
      id: result.lastID, 
      message: 'Thank you! Your message has been received.' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contact submissions
app.get('/api/contact', (req, res) => {
  try {
    const submissions = db.db.prepare('SELECT * FROM contact_submissions ORDER BY submitted_date DESC').all();
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ MEMBERSHIP PLANS ROUTES ============
// Get all membership plans
app.get('/api/membership-plans', (req, res) => {
  try {
    const plans = db.db.prepare('SELECT * FROM membership_plans').all();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get member bookings
app.get('/api/members/:id/bookings', (req, res) => {
  try {
    const bookings = db.db.prepare(`
      SELECT cb.*, c.class_name, c.schedule_day, c.schedule_time, t.name as trainer_name
      FROM class_bookings cb
      JOIN classes c ON cb.class_id = c.id
      LEFT JOIN trainers t ON c.trainer_id = t.id
      WHERE cb.member_id = ?
      ORDER BY c.schedule_day, c.schedule_time
    `).all(req.params.id);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Book a class
app.post('/api/class-bookings', (req, res) => {
  const { member_id, class_id } = req.body;
  
  if (!member_id || !class_id) {
    return res.status(400).json({ error: 'Member ID and Class ID are required' });
  }

  const stmt = db.db.prepare(`
    INSERT INTO class_bookings (member_id, class_id, booking_date)
    VALUES (?, ?, ?)
  `);
  
  try {
    const result = stmt.run(member_id, class_id, new Date().toISOString());
    res.status(201).json({ 
      id: result.lastID, 
      message: 'Class booked successfully' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏋️ FitZone Gym Backend running on http://localhost:${PORT}`);
  console.log(`📊 Database initialized at ./gym.db`);
});
