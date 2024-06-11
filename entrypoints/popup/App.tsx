import { browser } from "wxt/browser";
import "./App.css";
import * as configs from "@/src/configs";

function App() {
  const manifest = browser.runtime.getManifest();
  const _ = browser.i18n.getMessage;

  return (
    <>
      <h1>{manifest.name}</h1>
      <p>
        <a target="_blank" href={configs.URL_FEEDBACK}>
          {_("Feedback")}
        </a>
      </p>
      <p>v{manifest.version}</p>
    </>
  );
}

export default App;
