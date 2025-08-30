import React, { useState, useEffect, useRef } from "react";
import ImageUser from "../assets/images/idea.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faBell,
  faCog,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import List from "./List";
import Button from "./Button";

const main = [
  {
    id: 1,
    name: "Perfil",
    link: "/profile",
    icon: <FontAwesomeIcon icon={faUser} />,
  },
  {
    id: 2,
    name: "Configurações",
    link: "/settings",
    icon: <FontAwesomeIcon icon={faCog} />,
  },
  {
    id: 3,
    name: "Logout",
    icon: <FontAwesomeIcon icon={faSignOut} />,
  },
];

const buttons = [
  {
    key: 1,
    count: 10,
    icon: <FontAwesomeIcon icon={faBell} />,
  },
  {
    key: 2,
    count: 10,
    icon: <FontAwesomeIcon icon={faFacebookMessenger} />,
  },
];

const NavBar = ({ handleLogout, toggleSidebar, isOpenSidebar }) => {
  const [toggle, setToggle] = useState(false);
  const dropdownRef = useRef(null);
  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`main ${isOpenSidebar ? "" : "full"}`}>
      <nav className={`navBar ${isOpenSidebar ? "" : "full"}`}>
        <div className="content">
          <div className="inner-content">
            <div className="bars">
              <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <div className="configs">
              <div className="icons">
                {buttons.map(({ count, icon, key }) => (
                  <Button key={key}>
                    {icon}
                    <span className="count">{count}</span>
                  </Button>
                ))}
              </div>
              <div className="image" onClick={() => setToggle((prev) => !prev)}>
                <img src={ImageUser} alt="User" />
              </div>
              <div className="online"></div>
              {toggle && (
                <div className="dropDown" ref={dropdownRef}>
                  <ul>
                    {main.map(({ id, name, link, icon }) => (
                      <List key={id}>
                        {name.toLowerCase() === "logout" ? (
                          <Button className="button" handleClick={handleLogout}>
                            {name} <span>{icon}</span>
                          </Button>
                        ) : (
                          <Link to={link}>
                            {name} <span>{icon}</span>
                          </Link>
                        )}
                      </List>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
