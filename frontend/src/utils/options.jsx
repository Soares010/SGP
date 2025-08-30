export function getOptions() {
  const options = [
    {
      status: [
        {
          id: 1,
          value: "Em Andamento",
        },
        {
          id: 2,
          value: "Pendente",
        },
        {
          id: 3,
          value: "Concluído",
        },
        {
          id: 4,
          value: "Planeado",
        },
        {
          id: 5,
          value: "Cancelado",
        },
      ],
    },
    {
      priority: [
        {
          id: 1,
          value: "Alta",
        },
        {
          id: 2,
          value: "Média",
        },
        {
          id: 3,
          value: "Baixa",
        },
      ],
    },
    {
      category: [
        {
          id: 1,
          value: "Marketing",
        },
        {
          id: 2,
          value: "Infra-estrutura",
        },
        {
          id: 3,
          value: "Desenvolvimento",
        },
        {
          id: 4,
          value: "Planeamento",
        },
      ],
    },
  ];

  return options;
}
