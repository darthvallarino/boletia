import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeProvider from "@/providers/ThemeProvider";
import StoreProvider from "@/providers/StoreProvider";
import MainMenuDrawerLayout from "@/components/layouts/MainMenuDrawerLayout";

export const metadata = {
  title: "Boletia",
  description: "Boletia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ key: "css" }}>
          <ThemeProvider>
            <StoreProvider>
              <MainMenuDrawerLayout> {children}</MainMenuDrawerLayout>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
