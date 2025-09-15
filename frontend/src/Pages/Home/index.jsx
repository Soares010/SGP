import { useState } from "react";
import "../../assets/styles/Home.css";
import "../../assets/styles/Card.css";
import Cards from "../../Components/Cards";
import { logout } from "../../utils/logout";
import NavBar from "../../Components/NavBar";
import SideBar from "../../Components/SideBar";
import { check } from "../../utils/checkAuth";

const Home = () => {
  const { redirect, user } = check();
  if (redirect) return redirect;

  const [sideBarToggle, setSideBarToggle] = useState(false);


  return (
    <div>
      <SideBar isOpenSidebar={sideBarToggle} />
      <div className="content">
        <NavBar
          handleLogout={logout}
          toggleSidebar={() => setSideBarToggle(!sideBarToggle)}
          isOpenSidebar={sideBarToggle}
        />
        <main className={` menu ${sideBarToggle ? "full" : ""}`}>
          <Cards userData={user.dataNoPassword} />
        </main>
      </div>
    </div>
  );
};

export default Home;
