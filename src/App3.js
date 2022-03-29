import "./App.css";
import logo from "./logo.png";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginTheme from "./theme.js";
import Home from "./components/home";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <div className="App">
          <Route exact path="/" component={Home} />
        </div>
      </Routes>
    </BrowserRouter>
  );
}

export default withAuthenticator(App, {
  theme: LoginTheme,
  signUpConfig: {
    hiddenDefaults: ["phone_number"],
  },
});

