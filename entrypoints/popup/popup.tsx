import { browser } from "wxt/browser";
import React from "react";
import ReactDOM from "react-dom/client";
import { isSafari } from "react-device-detect";

import * as configs from "@/src/configs";
import "./popup.css";

function App() {
  const manifest = browser.runtime.getManifest();
  const _ = browser.i18n.getMessage;

  return (
    <div className="container">
      <h1 className="h1">{manifest.name}</h1>
      <p>
        <a target="_blank" href={configs.URL_FEEDBACK} className="a">
          {/* 
          The browser.i18n.getMessage does not work on Safari, it will show blank. 
          we use plain text here walk around it. 
          */}
          {isSafari ? "Feedback" : _("Feedback")}
        </a>
      </p>
      <p className="version">
        <a target="_blank" href={configs.URL_HOME}>
          v{manifest.version}
        </a>
      </p>
    </div>
  );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
