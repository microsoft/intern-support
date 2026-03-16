import {
  Body1,
  Button,
  Caption1,
  Card,
  MessageBar,
  MessageBarBody,
  Textarea,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import {
  CopyRegular,
  PersonRegular,
  WeatherMoonRegular,
  WeatherSunnyRegular,
} from "@fluentui/react-icons";
import { useAuth } from "../hooks/useAuth";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: tokens.spacingHorizontalXL,
    position: "relative" as const,
  },
  themeToggle: {
    position: "absolute" as const,
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: tokens.spacingHorizontalXXL,
  },
  header: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },
  title: {
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalXS,
    textAlign: "center" as const,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    alignItems: "center",
  },
  template: {
    width: "100%",
    maxWidth: "420px",
    marginTop: tokens.spacingVerticalL,
  },
  templateHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalXS,
  },
});

const TEMPLATE = `FW Name: 
FW Email: 
Capacity:
Role: 
Team: 
Sector: `;

interface LoginPageProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function LoginPage({ isDark, onToggleTheme }: LoginPageProps) {
  const styles = useStyles();
  const { login, whitelistError } = useAuth();

  return (
    <div className={styles.container}>
      <Button
        className={styles.themeToggle}
        appearance="subtle"
        icon={isDark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}
        size="small"
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      />
      <Card className={styles.card} appearance="outline">
        <div className={styles.header}>
          <Title3 className={styles.title} block>
            Intern Support
          </Title3>
          <Caption1>Belgium interns acceleration platform</Caption1>
        </div>

        <div className={styles.content}>
          {whitelistError && (
            <MessageBar intent="error">
              <MessageBarBody>
                Your account is not authorized to access this platform.
              </MessageBarBody>
            </MessageBar>
          )}

          <Body1 style={{ textAlign: "center" }}>
            Sign in with your Microsoft account to continue.
          </Body1>

          <Button
            appearance="primary"
            size="large"
            icon={<PersonRegular />}
            onClick={login}
          >
            Sign in with Microsoft
          </Button>
        </div>
      </Card>

      <div className={styles.template}>
        <div className={styles.templateHeader}>
          <Caption1>FTE Forward Template</Caption1>
          <Button
            appearance="subtle"
            icon={<CopyRegular />}
            size="small"
            onClick={() => navigator.clipboard.writeText(TEMPLATE)}
          >
            Copy
          </Button>
        </div>
        <Textarea
          value={TEMPLATE}
          readOnly
          resize="none"
          rows={6}
          style={{ width: "100%", fontFamily: "monospace", fontSize: "12px" }}
          aria-label="FTE Forward Template"
        />
      </div>
    </div>
  );
}
