import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import SideBar from "@components/layout/SideBar";
import CommonRouter from '@components/common/CommonRouter';
import '@styles/index.scss';

const Layout = () => {
  const [menuState, setMenuState] = useState(true);
  const location = useLocation();
  const hiddenPaths = ["/", "/join"];
  const isHidden = hiddenPaths.includes(location.pathname);

  return (
    <>
      {!isHidden && (
        <div className="main-layout">
          <SideBar menuState={menuState} setMenuState={setMenuState}/>
          <div id="main" className={menuState ? "open" : "close"}>
            <CommonRouter/>
          </div>
        </div>
      )}
      {isHidden && (
        <div className="auth-layout">
          <div className="auth-form">
            <CommonRouter />
          </div>
          <div className="auth-img" />
        </div>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <Layout />
  </Router>
);

export default App;
