import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      <a className="menu-item" href="/x">
        x
      </a>
      <a className="menu-item" href="/y">
        y
      </a>
      <a className="menu-item" href="/z">
        z
      </a>
    </Menu>
  );
};

export default Sidebar;