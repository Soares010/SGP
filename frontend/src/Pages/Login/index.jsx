import api from "../../services/api";
import Box from "../../Components/Box";
import Form from "../../Components/Form";
import notify from "../../utils/notify";
import { Toaster } from "react-hot-toast";
import Input from "../../Components/Input";
import Field from "../../Components/Field";
import Button from "../../Components/Button";
import Select from "../../Components/Select";
import { useNavigate } from "react-router-dom";
import Container from "../../Components/Container";
import { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHdd } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/gerenciamento-de-projetos (2).png";

const initialState = {
  email: "",
  password: "",
  name: "",
  birthYear: "",
  gender: "",
  phone: "",
};

const genders = [
  {
    id: 1,
    value: "Masculino",
  },
  {
    id: 2,
    value: "Feminino",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        user: action.payload,
      };
    case "Add":
      return {
        email: "",
        password: "",
        name: "",
        birthYear: "",
        gender: "",
        phone: "",
      };
    case "UpdateFields":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}

function Login() {
  const navigate = useNavigate();
  const REDIRECT_DELAY = 3000;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [active, setActive] = useState("Tab1");
  const [formType, setFormType] = useState("login");
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (active !== "Tab1") {
      setFormType("add");
    } else {
      setFormType("login");
    }
  }, [active]);

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

  // Usando a função dispatch e o hook useReducer para evitar ter muitos useStates no código e aumentar a praticidade
  function onGetInputData(e) {
    dispatch({
      type: "UpdateFields",
      field: e.target.name,
      value: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formType === "login") {
      try {
        if (!state.email?.trim() || !state.password?.trim()) {
          setError("Precisa preencher todos os campos!");
          return;
        }
        const response = await api.post("/login", {
          email: state.email,
          password: state.password,
        });

        if (response.status === 200) {
          localStorage.setItem(
            "dataWithTokenAuth",
            JSON.stringify(response.data)
          );
          dispatch({ type: "Login", payload: response.data });

          setSuccess(response.data.message);

          setTimeout(() => {
            navigate("/home");
          }, REDIRECT_DELAY);
        } else {
          navigate("/login");
        }
      } catch (error) {
        setError(error.response?.data?.message);
      }
    } else {
      if (
        !state.email?.trim() ||
        !state.password?.trim() ||
        !state.phone?.trim() ||
        !state.gender?.trim() ||
        !state.birthYear?.trim()
      ) {
        setError("Precisa preencher todos os campos!");
        return;
      }
      try {
        const response = await api.post("/add", {
          name: state.name,
          email: state.email,
          phone: state.phone,
          birthYear: state.birthYear,
          password: state.password,
          gender: state.gender,
        });
        if (response.status === 201) {
          dispatch({ type: "Add" });
          setSuccess(response.data.message);
        }
      } catch (error) {
        setError(error.response?.data?.message);
      }
    }
  }

  return (
    <>
      <div className="box-container">
        <div className="background">
          <div>
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="left-content">
          <Toaster />
          <Container className="container">
            <div className="inner-content">
              <div className="Tab-buttons">
                <button
                  className={`${active === "Tab1" ? "active" : ""}`}
                  onClick={() => setActive("Tab1")}
                >
                  Sign-in
                </button>

                <button
                  className={`${active === "Tab2" ? "active" : ""}`}
                  onClick={() => setActive("Tab2")}
                >
                  Sign-up
                </button>
              </div>
              <div className="Tab-content">
                {active === "Tab1" && (
                  <div>
                    <h2>
                      Sign<span>-In</span>
                    </h2>
                    <Form handleSubmit={handleSubmit}>
                      <Box className="input-box">
                        <Field className="input-field">
                          <span>* E-mail</span>
                          <Input
                            type="email"
                            placeholder="Exemplo@gmail.com"
                            name="email"
                            handleChange={onGetInputData}
                            valueInput={state.email}
                          />
                        </Field>
                        <Field className="input-field">
                          <span>* Password</span>
                          <Input
                            type="password"
                            placeholder="******"
                            name="password"
                            handleChange={onGetInputData}
                            valueInput={state.password}
                          />
                        </Field>
                        <div className="btns">
                          <div className="button">
                            <Button>
                              Seguinte
                              <FontAwesomeIcon
                                icon={faArrowRight}
                                className="icon"
                              />
                            </Button>
                          </div>
                          <p>
                            Gerencie os seus projectos com eficácia e dinamismo,
                            faça já o login, aguardamos pelo seu feedback!
                            <br />
                            Participe da nossa comunidade! Exponha suas dúvidas.
                          </p>
                        </div>
                      </Box>
                    </Form>
                  </div>
                )}
                {active === "Tab2" && (
                  <div>
                    <div className="add-form">
                      <h2>
                        Sign<span>-Up</span>
                      </h2>
                      <Form handleSubmit={handleSubmit}>
                        <Box className="input-box">
                          <Field className="input-field">
                            <span>*Nome Completo</span>
                            <Input
                              type="text"
                              placeholder="Fulano de tal"
                              name="name"
                              handleChange={onGetInputData}
                            />
                          </Field>
                          <Field className="input-field">
                            <span>*E-mail</span>
                            <Input
                              type="email"
                              placeholder="****@gmail.com"
                              name="email"
                              handleChange={onGetInputData}
                            />
                          </Field>
                        </Box>

                        <Box className="input-box">
                          <Field className="input-field">
                            <span>*Telefone</span>
                            <Input
                              type="text"
                              placeholder="+244 XXX-XXX-XXX"
                              name="phone"
                              handleChange={onGetInputData}
                            />
                          </Field>
                          <Field className="input-field">
                            <span>*Data de nascimento</span>
                            <Input
                              type="date"
                              name="birthYear"
                              handleChange={onGetInputData}
                            />
                          </Field>
                        </Box>

                        <Box className="input-box">
                          <Field className="input-field">
                            <span>*Palavra-passe</span>
                            <Input
                              type="password"
                              placeholder="******"
                              name="password"
                              handleChange={onGetInputData}
                            />
                          </Field>
                          <Field className="field-gender">
                            <span>*Género</span>
                            <Select
                              name="gender"
                              text="--- Selecione o género ---"
                              options={genders}
                              handleChange={onGetInputData}
                            ></Select>
                          </Field>
                        </Box>
                        <div className="button">
                          <Button>
                            Salvar{" "}
                            <FontAwesomeIcon icon={faHdd} className="icon" />
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Login;
