// Mock user database
const mockUsers = [
  { nationalId: 'user1', password: 'password123', role: 'User', name: 'John Doe', email: 'john@example.com' },
  { nationalId: 'officer1', password: 'officerpass', role: 'Officer', name: 'Jane Smith', email: 'jane@example.com' },
  { nationalId: 'admin1', password: 'adminpass', role: 'Admin', name: 'Bob Johnson', email: 'bob@example.com' },
];

// Fraud detection state
let failedAttempts = {};
let suspiciousPatterns = ['hack', 'admin', 'root', 'test'];

// AI Fraud Check Logic
function performFraudCheck(nationalId, password) {
  // Check password strength
  if (password.length < 6) {
    return { passed: false, reason: 'Password too weak' };
  }

  // Check for suspicious patterns
  const lowerPassword = password.toLowerCase();
  for (const pattern of suspiciousPatterns) {
    if (lowerPassword.includes(pattern)) {
      return { passed: false, reason: 'Suspicious password pattern detected' };
    }
  }

  // Check failed attempts (simple rate limiting)
  const attempts = failedAttempts[nationalId] || 0;
  if (attempts >= 3) {
    return { passed: false, reason: 'Too many failed attempts. Account locked.' };
  }

  return { passed: true };
}

// Mock login API function
export async function login(nationalId, password) {
  // Perform fraud check first
  const fraudCheck = performFraudCheck(nationalId, password);
  if (!fraudCheck.passed) {
    // Record failed attempt
    failedAttempts[nationalId] = (failedAttempts[nationalId] || 0) + 1;
    throw new Error(fraudCheck.reason);
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find user
  const user = mockUsers.find(u => u.nationalId === nationalId && u.password === password);
  if (!user) {
    // Record failed attempt
    failedAttempts[nationalId] = (failedAttempts[nationalId] || 0) + 1;
    throw new Error('Invalid credentials');
  }

  // Reset failed attempts on success
  delete failedAttempts[nationalId];

  // Return user data (without password)
  const { password: _, ...userData } = user;
  return userData;
}

// Activate user function (for signup)
export async function activateUser(nationalId, phone, dob, password, pin) {
  // Simulate RSSB database verification
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Check if user already exists
  const existingUser = mockUsers.find(u => u.nationalId === nationalId);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Simulate verification failure for demo (e.g., invalid national ID)
  if (nationalId.length < 16) {
    throw new Error('Invalid National ID');
  }

  // Add user to mock database
  const newUser = {
    nationalId,
    password,
    pin,
    role: 'User',
    name: 'New User', // Would be fetched from RSSB database
    email: `${nationalId}@example.com`,
    phone,
    dob
  };
  mockUsers.push(newUser);

  return { success: true, message: 'Account activated successfully' };
}

// Create admin user function
export async function createAdminUser(name, email, role, nationalId, password) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Check if user already exists
  const existingUser = mockUsers.find(u => u.nationalId === nationalId);
  if (existingUser) {
    throw new Error('User with this National ID already exists');
  }

  // Add user to mock database
  const newUser = {
    nationalId,
    password,
    role,
    name,
    email
  };
  mockUsers.push(newUser);

  return { success: true, message: `${role} account created successfully` };
}

// Get all users (for admin management)
export function getAllUsers() {
  return mockUsers.map(({ password, ...user }) => user);
}

// Update user status (for admin)
export function updateUserStatus(nationalId, status) {
  const user = mockUsers.find(u => u.nationalId === nationalId);
  if (user) {
    user.status = status;
  }
}

// Delete user (for admin)
export function deleteUser(nationalId) {
  const index = mockUsers.findIndex(u => u.nationalId === nationalId);
  if (index > -1) {
    mockUsers.splice(index, 1);
  }
}
