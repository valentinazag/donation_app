import { Link } from "react-router";
import * as v from "valibot";
import type { Route } from "./+types/organizationPage";
import { OrganizationSchema } from "./organizations";
import { type Project, ProjectSchema } from "./projects";

export async function loader({ params, request }: Route.LoaderArgs) {
  const organizationId = Number(params.organizationId);

  const url = new URL(request.url);
  const response_organizations = await fetch(`${url.origin}/organizations`);

  if (!response_organizations.ok) {
    throw new Error("didnt connect to the route organizations");
  }

  const data = await response_organizations.json();
  const organizations = v.parse(v.array(OrganizationSchema), data);

  const organization = organizations.find(
    (organization) => organization.id === organizationId,
  );

  if (!organization) {
    throw new Error("the organization doesnt exist");
  }

  const response_projects = await fetch(`${url.origin}/projects`);
  if (!response_projects.ok) {
    throw new Error("didnt connect to the route shows");
  }

  const data_projects = await response_projects.json();
  const projects = v.parse(v.array(ProjectSchema), data_projects);

  return { organization, projects };
}

function ProjectList({
  project,
  organizationId,
}: {
  project: {
    id: number;
    name: string;
    organizationId: number;
    description: string;
  };
  organizationId: number;
}) {
  return (
    <Link
      to={`/organization/${organizationId}/project/${project.id}`}
      className="projectsLink"
    >
      <ul className="projectLink">
        <li className="projectName">{project.name}</li>
        <li className="projectDescription">{project.description}</li>
      </ul>
    </Link>
  );
}

function OrganizationCard({
  organization,
  projects,
}: {
  organization: { id: number; name: string; description: string };
  projects: Project[];
}) {
  const organizationProjects = projects.filter(
    (project) => project.organizationId === organization.id,
  );
  return (
    <div className="organization-card">
      <div className="organization-name">{organization.name}</div>
      <div className="organization-projects">
        {organizationProjects.map((project) => (
          <ProjectList
            key={project.id}
            project={project}
            organizationId={organization.id}
          />
        ))}
      </div>
    </div>
  );
}

export default function OrganizationPage({ loaderData }: Route.ComponentProps) {
  const { organization, projects } = loaderData;
  return (
    <OrganizationCard
      key={organization.id}
      organization={organization}
      projects={projects}
    />
  );
}
