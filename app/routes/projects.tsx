import * as v from "valibot";

const PROJECTS = [
  {
    id: 1,
    organizationId: 1,
    description:
      "Asistencia humanitaria en zonas afectadas por desastres naturales",
  },
  {
    id: 2,
    organizationId: 1,
    description:
      "Programa de donación de sangre y capacitación en primeros auxilios",
  },

  {
    id: 3,
    organizationId: 2,
    description:
      "Acceso a educación básica para niños en situación de vulnerabilidad",
  },
  {
    id: 4,
    organizationId: 2,
    description: "Campaña de vacunación y nutrición infantil",
  },

  {
    id: 5,
    organizationId: 3,
    description: "Atención médica de emergencia en zonas de conflicto",
  },
  {
    id: 6,
    organizationId: 3,
    description: "Clínicas móviles para comunidades rurales aisladas",
  },

  {
    id: 7,
    organizationId: 4,
    description: "Protección de bosques y prevención de la deforestación",
  },
  {
    id: 8,
    organizationId: 4,
    description: "Campaña contra la contaminación de océanos",
  },

  {
    id: 9,
    organizationId: 5,
    description: "Apoyo escolar y alimentación para niños en riesgo",
  },
  {
    id: 10,
    organizationId: 5,
    description: "Protección infantil en contextos de emergencia",
  },

  {
    id: 11,
    organizationId: 6,
    description: "Conservación de especies en peligro de extinción",
  },
  {
    id: 12,
    organizationId: 6,
    description: "Restauración de ecosistemas y hábitats naturales",
  },

  {
    id: 13,
    organizationId: 7,
    description: "Defensa de derechos humanos y libertad de expresión",
  },
  {
    id: 14,
    organizationId: 7,
    description:
      "Asistencia legal para víctimas de violaciones de derechos humanos",
  },
];

export const ProjectSchema = v.object({
  id: v.number(),
  organizationId: v.number(),
  name: v.string(),
  description: v.string(),
});

export type Project = v.InferOutput<typeof ProjectSchema>;

export async function loader() {
  const project = v.parse(v.array(ProjectSchema), PROJECTS);
  return project;
}
