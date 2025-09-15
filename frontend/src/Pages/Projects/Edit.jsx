import React, { useEffect, useState } from "react";
import Form from "../../Components/Form";
import { Toaster } from "react-hot-toast";
import { getTabs } from "../../utils/tabs";
import { logout } from "../../utils/logout";
import NavBar from "../../Components/NavBar";
import { check } from "../../utils/checkAuth";
import SideBar from "../../Components/SideBar";
import TabBody from "../../Components/TabBody";
import TabHeader from "../../Components/TabHeader";
import Container from "../../Components/Container";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import { getOptions } from "../../utils/options";
import notify from "../../utils/notify";

const tabs = getTabs();
const Edit = () => {
  const { id } = useParams();
  const options = getOptions();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [active, setTabActive] = useState("Tab-1");
  const [{ status }, { priority }, { category }] = options;
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const { redirect, user } = check();
  if (redirect) return redirect;

  async function handleGetProject() {
    try {
      const response = await api.get(`/project/${id}`);
      console.log(response);
    } catch (error) {
      console.log(`Sem projectos ${error}`);
    }
  }
  useEffect(() => {
    // handleGetProject();
  }, [id]);

  useEffect(() => {
    notify({
      type: "success",
      message: success,
      configMessage: setSuccess,
    });
    notify({
      type: "error",
      message: error,
      configMessage: setError,
    });
  }, [success, error]);

  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <SideBar userData={user.dataNoPassword} isOpenSidebar={sideBarToggle} />
      <div className="content">
        <NavBar
          handleLogout={logout}
          toggleSidebar={() => setSideBarToggle(!sideBarToggle)}
          isOpenSidebar={sideBarToggle}
        />
        <main className={` menu ${sideBarToggle ? "full" : ""}`}>
          <Container className={`content-form`}>
            <Toaster />
            <div className="container-tab">
              <TabHeader tabs={tabs} active={active} changeTab={setTabActive} />
              <Form handleSubmit={handleSubmit}>
                <TabBody
                  handleChange={handleChange}
                  active={active}
                  priority={priority}
                  category={category}
                  status={status}
                  project={project}
                  textButton={"Actualizar ProjEcto"}
                />
              </Form>
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Edit;
