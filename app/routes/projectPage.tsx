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

function DonationButton({ value, style }: { value: number; style: string }) {
  return (
    <button type="submit" value={value} className={style}>
      {`$${value}`}
    </button>
  );
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
            <DonationButton value={1000} style="button first-button" />
            <DonationButton value={3000} style="button second-button" />
            <DonationButton value={5000} style="button third-button" />
            <DonationButton value={10000} style="button fourth-button" />
          </div>
        </div>
      </section>
    </div>
  );
}
