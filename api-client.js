/**
 * FitZone Gym API Client
 * JavaScript library for interacting with the FitZone Gym backend API
 */

class FitZoneAPI {
  constructor(baseURL = 'http://localhost:5000') {
    this.baseURL = baseURL;
  }

  /**
   * Generic fetch method
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error(`API Error: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  // ============ MEMBERS ============
  async getMembers() {
    return this.request('/api/members', { method: 'GET' });
  }

  async getMember(id) {
    return this.request(`/api/members/${id}`, { method: 'GET' });
  }

  async createMember(memberData) {
    return this.request('/api/members', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  }

  async updateMember(id, memberData) {
    return this.request(`/api/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(memberData),
    });
  }

  async deleteMember(id) {
    return this.request(`/api/members/${id}`, { method: 'DELETE' });
  }

  // ============ TRAINERS ============
  async getTrainers() {
    return this.request('/api/trainers', { method: 'GET' });
  }

  async getTrainer(id) {
    return this.request(`/api/trainers/${id}`, { method: 'GET' });
  }

  async createTrainer(trainerData) {
    return this.request('/api/trainers', {
      method: 'POST',
      body: JSON.stringify(trainerData),
    });
  }

  // ============ CLASSES ============
  async getClasses() {
    return this.request('/api/classes', { method: 'GET' });
  }

  async getClass(id) {
    return this.request(`/api/classes/${id}`, { method: 'GET' });
  }

  async createClass(classData) {
    return this.request('/api/classes', {
      method: 'POST',
      body: JSON.stringify(classData),
    });
  }

  async updateClass(id, classData) {
    return this.request(`/api/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classData),
    });
  }

  // ============ CLASS BOOKINGS ============
  async getMemberBookings(memberId) {
    return this.request(`/api/members/${memberId}/bookings`, { method: 'GET' });
  }

  async bookClass(bookingData) {
    return this.request('/api/class-bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  // ============ CONTACT ============
  async submitContact(contactData) {
    return this.request('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async getContactSubmissions() {
    return this.request('/api/contact', { method: 'GET' });
  }

  // ============ MEMBERSHIP PLANS ============
  async getMembershipPlans() {
    return this.request('/api/membership-plans', { method: 'GET' });
  }

  // ============ HEALTH CHECK ============
  async health() {
    return this.request('/api/health', { method: 'GET' });
  }
}

// Create a global instance
const fitZoneAPI = new FitZoneAPI();
