import { MsalProvider } from "@azure/msal-react";
import {
  FluentProvider,
  Spinner,
  Toaster,
  makeStyles,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Header, type Page } from "./components/Header";
import { InternList } from "./components/InternList";
import { LoginPage } from "./components/LoginPage";
import { MeetingList } from "./components/MeetingList";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import "./index.css";
import { msalInstance } from "./utils/auth";

const TOASTER_ID = "global";

const useStyles = makeStyles({
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

function AuthenticatedApp({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const [page, setPage] = useState<Page>("meetings");

  return (
    <>
      <Header
        currentPage={page}
        onNavigate={setPage}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />
      {page === "meetings" ? <MeetingList /> : <InternList />}
    </>
  );
}

function AppContent({
  isDark,
  onToggleTheme,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const styles = useStyles();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="large" label="Loading…" />
      </div>
    );
  }

  return isAuthenticated ? (
    <AuthenticatedApp isDark={isDark} onToggleTheme={onToggleTheme} />
  ) : (
    <LoginPage isDark={isDark} onToggleTheme={onToggleTheme} />
  );
}

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("intern_support_theme") === "dark",
  );

  // Fix Fluent UI Tabster dummy elements that are aria-hidden but focusable
  useEffect(() => {
    const fix = () =>
      document
        .querySelectorAll(
          '[data-tabster-dummy][aria-hidden="true"][tabindex="0"]',
        )
        .forEach((el) => el.setAttribute("tabindex", "-1"));
    fix();
    const observer = new MutationObserver(fix);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["tabindex"],
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("intern_support_theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <FluentProvider
          theme={isDark ? webDarkTheme : webLightTheme}
          style={{ minHeight: "100vh" }}
        >
          <AuthProvider>
            <AppContent isDark={isDark} onToggleTheme={toggleTheme} />
          </AuthProvider>
          <Toaster toasterId={TOASTER_ID} position="top" />
        </FluentProvider>
      </QueryClientProvider>
    </MsalProvider>
  );
}

export default App;
