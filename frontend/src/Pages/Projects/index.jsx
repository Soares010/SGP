import { useEffect, useRef, useState } from "react";
import api from "../../services/api";
import "../../assets/styles/Form.css";
import "../../assets/styles/Table.css";
import notify from "../../utils/notify";
import Form from "../../Components/Form";
import { Toaster } from "react-hot-toast";
import Table from "../../Components/Table";
import { logout } from "../../utils/logout";
import NavBar from "../../Components/NavBar";
import { check } from "../../utils/checkAuth";
import SideBar from "../../Components/SideBar";
import TabBody from "../../Components/TabBody";
import { getOptions } from "../../utils/options";
import { getTabs } from "../../utils/tabs";
import TabHeader from "../../Components/TabHeader";
import Container from "../../Components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileEdit,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const headers = [
  {
    key: "title",
    name: "Nome do projecto",
  },
  {
    key: "category",
    name: "Categoria",
  },
  {
    key: "status",
    name: "Status",
  },
  {
    key: "begin",
    name: "Criado em",
  },
  {
    key: "end",
    name: "Provável término",
  },
  {
    key: "days",
    name: "Duração",
  },
  {
    key: "budget",
    name: "Orçamento",
  },
  {
    key: "cost",
    name: "Custo",
  },
  {
    key: "priority",
    name: "Nível de prioridade",
  },
];

const icons = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faFileEdit} />,
    to: "/edit",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faTrash} />,
    to: "/delete",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faEye} />,
    to: "/see",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faPlus} />,
    to: "/addFriend",
  },
];
const tabs = getTabs();
const options = getOptions();
const [{ status }, { priority }, { category }] = options;
const getToken = JSON.parse(localStorage.getItem("dataWithTokenAuth"));
const TOKEN = getToken?.token;

const Project = () => {
  const { redirect, user } = check();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [project, setProject] = useState({});
  const [data, setData] = useState([]);
  const [active, setTabActive] = useState("Tab-1");
  const [sideBarToggle, setSideBarToggle] = useState(false);
  if (redirect) return redirect;

  useEffect(() => {
    async function handleGetProjects() {
      try {
        const response = await api.get("/projects", {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(`Sem projectos ${error}`);
      }
    }
    handleGetProjects();
  }, []);

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

  async function addProject() {
    try {
      const response = await api.post(
        "/addProject",
        {
          title: project.title,
          category: project.category,
          status: project.status,
          description: project.description,
          begin: project.begin,
          end: project.end,
          days: project.days,
          budget: project.budget,
          cost: project.cost,
          priority: project.priority,
          document: project.document,
          observation: project.observation,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess(response.data.message);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !project.title?.trim() ||
      !project.description?.trim() ||
      !project.status?.trim() ||
      !project.begin?.trim() ||
      !project.end?.trim() ||
      !project.budget?.trim() ||
      !project.cost?.trim() ||
      !project.priority?.trim()
    ) {
      setError("Precisa preencher os campos obrigatórios!");
      return;
    }
    addProject();
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
                  category={category}
                  status={status}
                  active={active}
                  priority={priority}
                />
              </Form>
            </div>
          </Container>
          <Container className="data-table">
            <div className="container-table">
              <Table headers={headers} icon={icons} data={data} />
            </div>
          </Container>
        </main>
      </div>
    </div>
  );
};

export default Project;
