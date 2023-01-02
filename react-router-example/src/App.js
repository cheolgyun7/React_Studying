
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
    <Route path="/" exact={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/about" component={About} />
    </BrowserRouter>
  );
}

export default App;
