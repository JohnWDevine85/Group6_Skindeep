import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Drawer from "./components/Drawer/Drawer.jsx";
import Homepage from "./components/Homepage/Homepage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
