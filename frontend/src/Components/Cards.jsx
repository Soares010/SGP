import Container from "./Container";
import { Link } from "react-router-dom";
import Image from "../assets/images/greeting.png";
import {
  faMoneyBill,
  faProjectDiagram,
  faTasks,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cards = [
  {
    label: "Total de Projectos",
    icon: <FontAwesomeIcon icon={faProjectDiagram} />,
    count: 10,
  },
  {
    label: "Total de Tarefas",
    icon: <FontAwesomeIcon icon={faTasks} />,
    count: 10,
  },
  {
    label: "Total de Amigos",
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    count: 10,
  },
  {
    label: "Orçamento Total",
    icon: <FontAwesomeIcon icon={faMoneyBill}/>,
    count: 10,
  },
];

const Cards = ({ userData }) => {
  return (
    <div>
      <Container className="container-card">
        <div className="inner-content-card">
          <div className="card-fly-greeting">
            <div>
              <div className="greeting">
                <h3>Bem-vindo {userData.name} 🎉</h3>
                <p>
                  Seja bem-vindo ao <span>SGP</span> o melhor sistema de gestão
                  de projectos que já viu!
                </p>
              </div>
              <div className="profile">
                <Link to="/profile">Visitar Perfil</Link>
              </div>
            </div>
            <div className="image">
              <img src={Image} alt="greeting" />
            </div>
          </div>
          <div className="cards">
            {cards.map(({ label, icon, count }) => (
              <div className="card" key={label}>
                <div className="conuter">
                  <h2>{count}</h2>
                  <span>{label}</span>
                </div>
                <div className="icon">{icon}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cards;
