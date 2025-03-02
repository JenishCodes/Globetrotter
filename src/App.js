import { BrowserRouter as Router } from "react-router-dom";

import Challenge from "./pages/Challenge";
import Profile from "./pages/Profile";
import Main from "./pages/Main";
import "./App.css";
import Answer from "./pages/Answer";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "20%",
                height: "100vh",
                borderRight: "solid 1px",
              }}
            >
              <Challenge />
              <Profile />
            </div>
            <Main />
            <Answer />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
