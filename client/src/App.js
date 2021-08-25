import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Drawer from "./components/Drawer/Drawer";

function App() {
  return (
    <div>
      <Drawer />
      <NavBar />
    </div>
  );
}

export default App;
