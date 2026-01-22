import { Link } from "react-router";
import * as v from "valibot";
import type { Route } from "./+types/organizationPage";
import { type Organization, OrganizationSchema } from "./organizations";
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
  project: Project;
  organizationId: number;
}) {
  return (
    <Link
      to={`/organization/${organizationId}/project/${project.id}`}
      className="organizationProjectsLinks"
    >
      <div className="organizationProject-link">
        <div className="organizationProject-name">{project.name}</div>
        <div className="organizationProject-description">
          {project.description}
        </div>
      </div>
    </Link>
  );
}

function OrganizationCard({
  organization,
  projects,
}: {
  organization: Organization;
  projects: Project[];
}) {
  const organizationProjects = projects.filter(
    (project) => project.organizationId === organization.id,
  );
  return (
    <div className="organizationPage-card">
      <div className="organizationPage-image">
        <img
          className="organization-image"
          src={organization.image_url}
          alt="organization"
        />
      </div>
      <hr className="divisor-line" />
      <div className="organizationPage-name">{organization.name}</div>
      <div className="organizationPage-description">
        {organization.description}
      </div>
      <div className="organizationPage-projects">
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
    <div className="organization-page">
      <OrganizationCard
        key={organization.id}
        organization={organization}
        projects={projects}
      />
    </div>
  );
}
