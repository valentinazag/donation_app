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
    <body>
      <section>
        <div className="project-container">
          <div className="project-name">{project.name}</div>
          <div className="project-description">{project.description}</div>
        </div>
      </section>
    </body>
  );
}
