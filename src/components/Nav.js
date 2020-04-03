import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Nav = () => {
  return (
    <Menu stackable>
      <NavLink to="/" exact className="item" activeClassName="active">
        Home
      </NavLink>

      <Menu.Menu position="right">
        <NavLink to="/hospitals" className="item" activeClassName="active">
          Hospitals
        </NavLink>
        <NavLink to="/myths" className="item" activeClassName="active">
          Myths
        </NavLink>
        <NavLink to="/questions" className="item" activeClassName="active">
          Questions
        </NavLink>
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
