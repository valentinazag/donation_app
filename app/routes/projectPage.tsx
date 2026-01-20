import * as v from "valibot";
import type { Route } from "./+types/projectPage";
import { ProjectSchema } from "./projects";

export async function loader({ params, request }: Route.LoaderArgs) {
  const organizationId = Number(params.organizationId);
  const projectId = Number(params.projectId);

  const url = new URL(request.url);
  const response_projects = await fetch(`${url.origin}/projects`);

  const data = await response_projects.json();
  const projects = v.parse(v.array(ProjectSchema), data);

  const project = projects.find(
    (project) =>
      project.id === projectId && project.organizationId === organizationId,
  );

  if (!project) {
    throw new Error("the project doesnt exist");
  }

  return { project };
}

export default function ProjectPage({ loaderData }: Route.ComponentProps) {
  const { project } = loaderData;
  return (
    <div className="project-page">
      <section>
        <div className="projectPage-card">
          <div className="projectPage-name">{project.name}</div>
          <div className="projectPage-description">{project.description}</div>
          <div className="buttons-donation">
            <button type="submit" className="button first-button">
              $1000
            </button>
            <button type="submit" className="button second-button">
              $3000
            </button>
            <button type="submit" className="button third-button">
              $5000
            </button>
            <button type="submit" className="button fourth-button">
              $10000
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
