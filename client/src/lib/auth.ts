import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const { user, token, isAuthenticated, login, logout, updateUser } =
    useAuthStore();

  const isAdmin = user?.role === 'admin';

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    updateUser,
  };
};
