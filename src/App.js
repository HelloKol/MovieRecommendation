import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./comp/Home/Home";
import ViewAll from "./comp/Home/ViewAll/ViewAll";
import MovieDetails from "./comp/MovieDetails/MovieDetails";
import Navbar from "./comp/Navigation/Navbar";
import Footer from "./comp/Footer/Footer";
import Authentication from "./comp/Authentication/Authentication";
import Watchlist from "./comp/Watchlist/Watchlist";
import Profile from "./comp/Profile/Profile";
import { LoginContext } from "./contexts/LoginContext";
import Request from "./comp/Request/Request";
import Error from "./error/Error";
import ScrollTop from "./ScrollTop";

function App() {
  const [currentUser, setCurrentUser] = useState([]);
  return (
    <>
      <LoginContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navbar />
        <Router>
          <ScrollTop />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/category/:name/page/:number"
              exact
              component={ViewAll}
            />
            <Route path="/mywatchlist" exact component={Watchlist} />
            <Route path="/profile/:name" exact component={Profile} />
            <Route path="/request" exact component={Request} />

            <Route path="/auth" exact component={Authentication} />
            <Route path="/movie/:name" exact component={MovieDetails} />
            <Route path="*" exact component={Error} />
          </Switch>
        </Router>
        <Footer />
      </LoginContext.Provider>
    </>
  );
}

export default App;