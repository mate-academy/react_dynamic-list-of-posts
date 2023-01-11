import User from 'models/User';

const StorageService = {
  setUser: (user: Omit<User, 'id' | 'phone'>) => {
    return localStorage.setItem('user', JSON.stringify(user));
  },
  getUser: () => {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : {};
  },
};

export default StorageService;
