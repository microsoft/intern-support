import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { msalInstance } from "./utils/auth";

const elem = document.getElementById("root")!;

// Initialize MSAL before rendering (handles redirect promise)
msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().then(() => {
    const app = (
      <StrictMode>
        <App />
      </StrictMode>
    );

    if (import.meta.hot) {
      const root = (import.meta.hot.data.root ??= createRoot(elem));
      root.render(app);
    } else {
      createRoot(elem).render(app);
    }
  });
});
