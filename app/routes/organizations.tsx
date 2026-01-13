import * as v from "valibot";

const ORGANIZATIONS = [
  {
    id: 1,
    name: "Cruz Roja",
  },
  {
    id: 2,
    name: "UNICEF",
  },
  {
    id: 3,
    name: "Médicos Sin Fronteras",
  },
  {
    id: 4,
    name: "Greenpeace",
  },
  {
    id: 5,
    name: "Save the Children",
  },
  {
    id: 6,
    name: "World Wildlife Fund",
  },
  {
    id: 7,
    name: "Amnistía Internacional",
  },
];

export const OrganizationSchema = v.object({
  id: v.number(),
  name: v.string(),
});

export async function loader() {
  const organizations = v.parse(v.array(OrganizationSchema), ORGANIZATIONS);
  return organizations;
}
