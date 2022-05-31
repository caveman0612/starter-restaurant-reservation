import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="">
      <div className="container-fluid row h-100">
        <div className="col-3 side-bar">
          <Menu />
        </div>
        <div className="col-9">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
