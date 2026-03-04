import {
  FluentProvider,
  Spinner,
  Toaster,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Header } from "./components/Header";
import { LoginPage } from "./components/LoginPage";
import { MeetingList } from "./components/MeetingList";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import "./index.css";

const TOASTER_ID = "global";

// Persist QueryClient across HMR reloads to avoid "not a constructor" errors
const _global = globalThis as typeof globalThis & {
  __queryClient?: QueryClient;
};
if (!_global.__queryClient) {
  _global.__queryClient = new QueryClient();
}
const queryClient = _global.__queryClient;

const useStyles = makeStyles({
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
});

function AuthenticatedApp() {
  return (
    <>
      <Header />
      <MeetingList />
    </>
  );
}

function AppContent() {
  const styles = useStyles();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner size="large" label="Loading…" />
      </div>
    );
  }

  return isAuthenticated ? <AuthenticatedApp /> : <LoginPage />;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FluentProvider theme={webLightTheme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
        <Toaster toasterId={TOASTER_ID} position="top" />
      </FluentProvider>
    </QueryClientProvider>
  );
}

export default App;
