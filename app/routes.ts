import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("organizations", "routes/organizations.tsx"),
  route("projects", "routes/projects.tsx"),
  route("organization/:organizationId", "routes/organizationPage.tsx"),
  route(
    "organization/:organizationId/project/:projectId",
    "routes/projectPage.tsx",
  ),
] satisfies RouteConfig;
