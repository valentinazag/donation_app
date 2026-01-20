import { Link } from "react-router";
import * as v from "valibot";
import type { Route } from "./+types/home";
import { OrganizationSchema } from "./organizations";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const response_organizations = await fetch(`${url.origin}/organizations`);

  if (!response_organizations.ok) {
    throw new Error("didnt connect to the route organizations");
  }

  const data = await response_organizations.json();
  const organizations = v.parse(v.array(OrganizationSchema), data);

  return { organizations };
}

function OrganizationList({
  organization,
}: {
  organization: { id: number; name: string; description: string };
}) {
  return (
    <Link to={`/organization/${organization.id}`} className="organizationLink">
      <div className="organization">
        <div className="organizationName">{organization.name}</div>
        <div className="organizationDescription">
          {organization.description}
        </div>
      </div>
    </Link>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { organizations } = loaderData;
  return (
    <div>
      <section>
        <div className="title">DONATION APP</div>
      </section>
      <section>
        <div className="organizations_container">
          {organizations.map((organization) => (
            <OrganizationList
              key={organization.id}
              organization={organization}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
