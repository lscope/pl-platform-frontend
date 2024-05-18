import React from "react"
import { Link } from "react-router-dom";
import Logout from "../session/logout";
import "../index.css"




const NavBar: React.FC = () => {
  const linkList = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ] // Esempi di link che potresti voler includere

  return (
    <nav>
      <div>
        <div>Logo</div>
        <ul>
          {linkList.map((el) => {
            return (
              <li key={el.name}>
                <Link to={el.path}>{el.name}</Link>
              </li>
            )
          })}
        </ul>
        <Logout />
      </div>
    </nav>
  );
}

export default NavBar