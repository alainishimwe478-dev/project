export const login = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getRole = () => {
  const user = getUser();
  return user?.role || null;
};

// User management functions
export const getAllUsers = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
};

export const createAdminUser = (name, email, role, nationalId, password) => {
  const users = getAllUsers();
  const newUser = { name, email, role, nationalId, password, status: 'Active' };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
};

export const deleteUser = (nationalId) => {
  const users = getAllUsers();
  const updatedUsers = users.filter(user => user.nationalId !== nationalId);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const activateUser = (nationalId, phone, dob, password, pin) => {
  const users = getAllUsers();
  const newUser = { nationalId, phone, dob, password, pin, role: 'user', status: 'Active' };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
};
