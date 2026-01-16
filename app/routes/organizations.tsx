import * as v from "valibot";

const ORGANIZATIONS = [
  {
    id: 1,
    name: "Cruz Roja",
    description: "Organization",
  },
  {
    id: 2,
    name: "UNICEF",
    description: "Organization",
  },
  {
    id: 3,
    name: "Médicos Sin Fronteras",
    description: "Organization",
  },
  {
    id: 4,
    name: "Greenpeace",
    description: "Organization",
  },
  {
    id: 5,
    name: "Save the Children",
    description: "Organization",
  },
  {
    id: 6,
    name: "World Wildlife Fund",
    description: "Organization",
  },
  {
    id: 7,
    name: "Amnistía Internacional",
    description: "Organization",
  },
];

export const OrganizationSchema = v.object({
  id: v.number(),
  name: v.string(),
  description: v.string(),
});

export async function loader() {
  const organizations = v.parse(v.array(OrganizationSchema), ORGANIZATIONS);
  return organizations;
}
