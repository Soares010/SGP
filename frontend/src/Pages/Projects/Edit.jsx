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
import { useParams, useNavigate } from "react-router-dom";
import { getOptions } from "../../utils/options";
import notify from "../../utils/notify";
import { validate } from "../../utils/validate";

const allTabs = getTabs();
const tabs = allTabs.filter((tab) => tab.id !== "Tab-4");
const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const options = getOptions();
  const [error, setError] = useState("");
  const [project, setProject] = useState({});
  const [success, setSuccess] = useState("");
  const [active, setTabActive] = useState("Tab-1");
  const [{ status }, { priority }, { category }] = options;
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const { redirect, user } = check();
  if (redirect) return redirect;

  useEffect(() => {
    handleGetProject();
  }, [id]);

  async function handleGetProject() {
    try {
      const response = await api.get(`/project/${id}`);
      setProject(response.data);
    } catch (error) {
      console.log(`Sem projectos ${error}`);
    }
  }

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

  async function handleEditProject() {
    try {
      const response = await api.patch(`/edit/${id}`, project);
      if (response.status === 200) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/project");
        }, 3000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log("Ocorreu algum erro", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errorMessageInputs = validate(
      project,
      "projects",
      "Todos os campos são obrigatórios"
    );
    if (errorMessageInputs) {
      setError(errorMessageInputs);
      return;
    }
    handleEditProject();
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
                  setProject={setProject}
                  textButton={"Actualizar Projecto"}
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
