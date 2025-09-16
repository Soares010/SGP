import { useEffect, useRef, useState } from "react";
import Box from "./Box";
import Field from "./Field";
import Input from "./Input";
import Text from "./Text";
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faSave } from "@fortawesome/free-solid-svg-icons";

const TODAY = new Date();
const NOW = TODAY.toISOString().split("T")[0];

const TabBody = ({
  active,
  handleChange,
  category,
  status,
  priority,
  textButton,
  project,
}) => {
  const end = useRef();
  const [days, setDays] = useState(0);
  // ✅ recalcula quando o valor de "project.end" mudar
  useEffect(() => {
    if (project.end) {
      const endDate = new Date(project.end);
      if (!isNaN(endDate)) {
        const diff = endDate - TODAY;
        setDays(Math.ceil(diff / (1000 * 60 * 60 * 24)));
      }
    } else {
      setDays(0);
    }
  }, [project.end]);
  return (
    <div className="body-tab">
      {active === "Tab-1" && (
        <div>
          <Box className="input-box">
            <Field className="input-field">
              <span>Nome do projecto</span>
              <Input
                type="text"
                placeholder="Insira o nome do projecto"
                name="title"
                handleChange={handleChange}
                valueInput={project.title}
              />
            </Field>
            <Field className="input-field">
              <span>Categoria</span>
              <Select
                name="category"
                text={"--- Selecione a categoria ---"}
                options={category}
                handleChange={handleChange}
                value={project.category}
              />
            </Field>
            <Field className="input-field">
              <span>Status do projecto</span>
              <Select
                name="status"
                text={"--- Selecione o Status ---"}
                options={status}
                handleChange={handleChange}
                value={project.status}
              />
            </Field>
          </Box>
          <Box className="input-box">
            <Field className="input-field">
              <span>Descrição do projecto</span>
              <Text
                name="description"
                className="description"
                placeholder={"Escreva alguma coisa sobre o projecto!"}
                handleChange={handleChange}
                value={project.description}
              />
            </Field>
          </Box>
        </div>
      )}
      {active === "Tab-2" && (
        <div>
          <Box className="input-box">
            <Field className="input-field">
              <span>Data de início</span>
              <Input
                type="date"
                name="begin"
                valueInput={NOW}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Data de término</span>
              <Input
                type="date"
                name="end"
                reference={end}
                valueInput={project.end}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Duração Estimada (Dias)</span>
              <Input
                type="number"
                name="days"
                valueInput={days ?? 0}
                handleChange={handleChange}
              />
            </Field>
          </Box>
        </div>
      )}
      {active === "Tab-3" && (
        <div>
          <Box className="input-box">
            <Field className="input-field">
              <span>Orçamento Estimado</span>
              <Input
                type="number"
                name="budget"
                placeholder={" KZ"}
                valueInput={project.budget}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Custo Actual</span>
              <Input
                type="number"
                name="cost"
                placeholder={" KZ"}
                valueInput={project.cost}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Prioridade</span>
              <Select
                name="priority"
                text={"--- Selecione a Prioridade ---"}
                options={priority}
                value={project.priority}
                handleChange={handleChange}
              />
            </Field>
          </Box>
        </div>
      )}
      {active === "Tab-4" && (
        <div>
          <Box className="input-box">
            <Field className="input-field">
              <span>Submeter documento</span>
              <div className="upload">
                <label htmlFor="fileUpload">
                  <FontAwesomeIcon
                    icon={faFileArrowUp}
                    className="icon-upload"
                  />
                </label>
                <Input
                  type="file"
                  name="document"
                  hidden="hidden"
                  id="fileUpload"
                  handleChange={handleChange}
                />
              </div>
            </Field>
          </Box>
          <Box className="input-box">
            <Field className="input-field">
              <span>Observações Gerais</span>
              <Text
                name="observation"
                placeholder="Escreva algumas observações"
                className="obs"
                handleChange={handleChange}
                value={project.observation}
              />
            </Field>
          </Box>
          <div className="btns">
            <button>
              {textButton} <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBody;
