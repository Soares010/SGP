import { useRef } from "react";
import Box from "./Box";
import Field from "./Field";
import Input from "./Input";
import Text from "./Text";
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faSave } from "@fortawesome/free-solid-svg-icons";

const TabBody = ({ active, handleChange, category, status, priority }) => {
  const begin = useRef();
  const end = useRef();
  const days =
    Number(end.current?.value?.split("-")[2]) -
    Number(begin.current?.value?.split("-")[2]);

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
              />
            </Field>
            <Field className="input-field">
              <span>Categoria</span>
              <Select
                name="category"
                text={"--- Selecione a categoria ---"}
                options={category}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Status do projecto</span>
              <Select
                name="status"
                text={"--- Selecione o Status ---"}
                options={status}
                handleChange={handleChange}
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
                reference={begin}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Data de término</span>
              <Input
                type="date"
                name="end"
                reference={end}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Duração Estimada (Dias)</span>
              <Input
                type="number"
                name="days"
                valueInput={days.toString()}
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
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Custo Actual</span>
              <Input
                type="number"
                name="cost"
                placeholder={" KZ"}
                handleChange={handleChange}
              />
            </Field>
            <Field className="input-field">
              <span>Prioridade</span>
              <Select
                name="priority"
                text={"--- Selecione a Prioridade ---"}
                options={priority}
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
              />
            </Field>
          </Box>
          <div className="btns">
            <button>
              Criar Proejcto <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBody;
