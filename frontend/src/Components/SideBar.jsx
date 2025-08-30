import React, { useState } from "react";
import List from "./List";
import Container from "./Container";
import Header from "./Header";
import { Link } from "react-router-dom";
import { getMenuItems } from "../utils/menus";

const SideBar = ({ isOpenSidebar }) => {
  const menuItems = getMenuItems();  
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div>
      <Container className={`sidebar ${isOpenSidebar ? "hidden" : ""}`}>
        <Header />
        <ul className="side-items">
          {menuItems.map((section, id) => (
            <React.Fragment key={id}>
              <span className="title">{section.title}</span>

              {section.items.map((item, i) => (
                <List className="item" key={i}>
                  {item.submenu ? (
                    <>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu(item.label);
                        }}
                        className={openMenu === item.label ? "active" : ""}
                      >
                        <span className="icon">{item.icon}</span>
                        <span className="description--item">{item.label} </span>
                      </a>

                      <ul
                        className={`dropdown--main ${
                          openMenu === item.label ? "show" : ""
                        }`}
                      >
                        {item.submenu.map((sub, j) => (
                          <List key={j}>
                            <Link to={sub.link}>
                              {sub.label}{" "}
                              <span className="icon"> {item.icon}</span>
                            </Link>
                          </List>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link to={item.link}>
                      <span className="icon">{item.icon}</span>
                      <span className="description--item">{item.label}</span>
                    </Link>
                  )}
                </List>
              ))}

              <div className="line--gray"></div>
            </React.Fragment>
          ))}
        </ul>
      </Container>
    </div>
  );
};
export default SideBar;
