import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import appRoutes from "./routes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        {appRoutes.map(r => (
          <Route
            key={r.path}
            path={r.path}
            element={r.element}
            exact={r.exact}
          />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
