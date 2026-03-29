<!-- Quick Integration Example for Contact Form -->
<!-- Add this script tag to your HTML file's <head> section: -->
<!-- <script src="api-client.js"></script> -->

<!-- EXAMPLE 1: Contact Form Integration -->
<!-- 
Add this to your contact.html form:

<form id="contactForm">
  <input type="text" id="name" placeholder="Your Name" required>
  <input type="email" id="email" placeholder="Your Email" required>
  <input type="tel" id="phone" placeholder="Your Phone">
  <input type="text" id="subject" placeholder="Subject">
  <textarea id="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>

<script src="api-client.js"></script>
<script>
  document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const contactData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    const result = await fitZoneAPI.submitContact(contactData);
    
    if (result.success) {
      alert('Thank you! Your message has been sent.');
      document.getElementById('contactForm').reset();
    } else {
      alert('Error sending message: ' + result.error);
    }
  });
</script>
-->

<!-- EXAMPLE 2: Display Classes -->
<!--
<div id="classesList"></div>

<script src="api-client.js"></script>
<script>
  async function loadClasses() {
    const result = await fitZoneAPI.getClasses();
    
    if (result.success) {
      const html = result.data.map(cls => `
        <div class="class-card">
          <h3>${cls.class_name}</h3>
          <p>Trainer: ${cls.trainer_name}</p>
          <p>Day: ${cls.schedule_day} at ${cls.schedule_time}</p>
          <p>Capacity: ${cls.capacity}</p>
          <button onclick="bookClass(${cls.id})">Book Now</button>
        </div>
      `).join('');
      
      document.getElementById('classesList').innerHTML = html;
    }
  }

  async function bookClass(classId) {
    const memberId = prompt('Enter your Member ID:');
    if (memberId) {
      const result = await fitZoneAPI.bookClass({
        member_id: memberId,
        class_id: classId
      });
      
      if (result.success) {
        alert('Class booked successfully!');
      } else {
        alert('Error booking class: ' + result.error);
      }
    }
  }

  loadClasses();
</script>
-->

<!-- EXAMPLE 3: Display Trainers -->
<!--
<div id="trainersList"></div>

<script src="api-client.js"></script>
<script>
  async function loadTrainers() {
    const result = await fitZoneAPI.getTrainers();
    
    if (result.success) {
      const html = result.data.map(trainer => `
        <div class="trainer-card">
          <h3>${trainer.name}</h3>
          <p>Specialization: ${trainer.specialization}</p>
          <p>Experience: ${trainer.experience_years} years</p>
          <p>${trainer.bio}</p>
          <p>Email: ${trainer.email}</p>
        </div>
      `).join('');
      
      document.getElementById('trainersList').innerHTML = html;
    }
  }

  loadTrainers();
</script>
-->

<!-- EXAMPLE 4: Display Membership Plans -->
<!--
<div id="plansList"></div>

<script src="api-client.js"></script>
<script>
  async function loadPlans() {
    const result = await fitZoneAPI.getMembershipPlans();
    
    if (result.success) {
      const html = result.data.map(plan => `
        <div class="plan-card">
          <h3>${plan.plan_name}</h3>
          <p class="price">₹${plan.price}/month</p>
          <ul>
            <li>${plan.classes_per_week} classes per week</li>
            <li>${plan.personal_training_sessions} personal training sessions</li>
            <li>${plan.description}</li>
          </ul>
          <button onclick="selectPlan(${plan.id})">Select Plan</button>
        </div>
      `).join('');
      
      document.getElementById('plansList').innerHTML = html;
    }
  }

  loadPlans();
</script>
-->

<!-- EXAMPLE 5: User Registration -->
<!--
<form id="signupForm">
  <input type="text" id="signupName" placeholder="Full Name" required>
  <input type="email" id="signupEmail" placeholder="Email Address" required>
  <input type="tel" id="signupPhone" placeholder="Phone Number" required>
  <select id="signupPlan">
    <option value="basic">Basic (₹999)</option>
    <option value="premium">Premium (₹1999)</option>
    <option value="elite">Elite (₹2999)</option>
  </select>
  <button type="submit">Register Now</button>
</form>

<script src="api-client.js"></script>
<script>
  document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const memberData = {
      name: document.getElementById('signupName').value,
      email: document.getElementById('signupEmail').value,
      phone: document.getElementById('signupPhone').value,
      membership_plan: document.getElementById('signupPlan').value,
      start_date: new Date().toISOString().split('T')[0]
    };

    const result = await fitZoneAPI.createMember(memberData);
    
    if (result.success) {
      alert('Registration successful! Your Member ID: ' + result.data.id);
      document.getElementById('signupForm').reset();
    } else {
      alert('Error during registration: ' + result.error);
    }
  });
</script>
-->

<!-- USAGE GUIDE -->
<!--

This file contains integration examples for connecting your HTML forms and pages to the FitZone backend API.

To use these examples:

1. Add this line to your HTML file's <head>:
   <script src="api-client.js"></script>

2. Copy one of the examples above
3. Customize as needed
4. Test with the backend running (npm start)

Common Tasks:

a) Contact Form:
   - Use EXAMPLE 1
   - Captures name, email, phone, subject, message
   - Saves to database

b) Show Classes:
   - Use EXAMPLE 2
   - Displays all available classes
   - Allows member booking

c) Show Trainers:
   - Use EXAMPLE 3
   - Displays all trainers
   - Shows specialization and experience

d) Show Membership Plans:
   - Use EXAMPLE 4
   - Displays pricing tiers
   - Includes features and duration

e) User Registration:
   - Use EXAMPLE 5
   - Creates new member account
   - Assigns membership plan

All functions handle errors gracefully and provide user feedback.

API Methods Available:

Members:
- fitZoneAPI.getMembers()
- fitZoneAPI.getMember(id)
- fitZoneAPI.createMember(data)
- fitZoneAPI.updateMember(id, data)
- fitZoneAPI.deleteMember(id)

Trainers:
- fitZoneAPI.getTrainers()
- fitZoneAPI.getTrainer(id)
- fitZoneAPI.createTrainer(data)

Classes:
- fitZoneAPI.getClasses()
- fitZoneAPI.getClass(id)
- fitZoneAPI.createClass(data)
- fitZoneAPI.updateClass(id, data)

Bookings:
- fitZoneAPI.getMemberBookings(memberId)
- fitZoneAPI.bookClass(data)

Contact:
- fitZoneAPI.submitContact(data)
- fitZoneAPI.getContactSubmissions()

Plans:
- fitZoneAPI.getMembershipPlans()

Health:
- fitZoneAPI.health()

-->
