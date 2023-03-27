import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./auth/index";

export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};
