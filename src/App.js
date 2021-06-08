import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import ErrorFallback from "./ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import TopBar from "./TopBar";
import Tree from "./Tree";

export default function App() {
  return (
    <div className="App p-2">
      <TopBar />

      <h1>Hierarchy Tree</h1>
      <div className="p-4">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            // reset the state of your app so the error doesn't happen again
          }}
        >
          <Tree />
        </ErrorBoundary>
      </div>
    </div>
  );
}
