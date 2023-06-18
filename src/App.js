import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import appRoutes from "./routes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import theme from "./theme";

const App = () => {
  const { spacing } = theme;

  return (
    <>
      <NavBar />
      <div style={{ marginTop: spacing(8) }}>
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
      </div>
      <Footer />
    </>
  );
}

export default App;
