import React from "react";
import {
  faFilePdf,
  faLineChart,
  faProjectDiagram,
  faUserFriends,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function getMenuItems() {
  const items = [
    {
      title: "Home",
      items: [
        {
          label: "Dashboard",
          icon: <FontAwesomeIcon icon={faLineChart} />,
          link: "/home",
        },
      ],
    },
    {
      title: "Pré-inserção de dados",
      items: [
        {
          label: "Área de Projetos",
          icon: <FontAwesomeIcon icon={faProjectDiagram} />,
          submenu: [
            {
              label: "Criar Projeto",
              link: "/project",
            },
            {
              label: "Criar Tarefas",
              link: "/tasks",
            },
          ],
        },
      ],
    },
    {
      title: "Comunidade",
      items: [
        {
          label: "Área Comunitária",
          icon: <FontAwesomeIcon icon={faUsers} />,
          submenu: [
            {
              label: "Criar Comunidade",
              link: "/debate",
            },
            {
              label: "Criar Debate",
              link: "/debate",
            },
          ],
        },
        {
          label: "Área de Amigos",
          icon: <FontAwesomeIcon icon={faUserFriends} />,
          submenu: [
            {
              label: "Adicionar Amigos",
              link: "/friends",
            },
            {
              label: "Criar Grupo",
              link: "/friends",
            },
          ],
        },
      ],
    },
    {
      title: "Documentos",
      items: [
        {
          label: "Documentos",
          icon: <FontAwesomeIcon icon={faFilePdf} />,
          link: "/documents",
        },
      ],
    },
  ];

  return items;
}
