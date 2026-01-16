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
      <ul className="organizationList">
        <li className="organizationName">{organization.name}</li>
        <li className="organizationDescription">{organization.description}</li>
      </ul>
    </Link>
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { organizations } = loaderData;
  return (
    <body>
      <section>
        <div className="title">Donation app</div>
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
    </body>
  );
}
