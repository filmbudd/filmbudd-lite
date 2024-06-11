import { browser } from "wxt/browser";
import React from "react";
import ReactDOM from "react-dom/client";

import * as configs from "@/src/configs";
import classes from "./popup.module.css";

function App() {
  const manifest = browser.runtime.getManifest();
  const _ = browser.i18n.getMessage;

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>{manifest.name}</h1>
      <p>
        <a target="_blank" href={configs.URL_FEEDBACK} className={classes.a}>
          {_("Feedback")}
        </a>
      </p>
      <p className={classes.version}>v{manifest.version}</p>
    </div>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
