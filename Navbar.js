import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <ul>
      <li><Link to="/games">Games</Link></li>
      <li><Link to="/banking">Banking</Link></li>
    </ul>
  </nav>
);

export default Navbar;
