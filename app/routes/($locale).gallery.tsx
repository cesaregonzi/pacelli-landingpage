import Booking from '~/components/home/booking';
import SocialProof from '~/components/home/social-proof';
import OutProjects from '~/components/gallery/OutProjects';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import {PROJECT_GALERRY_QUERY} from '~/graphql/gallery';
import {parseObject} from '~/lib/utils';
import {useLoaderData} from '@remix-run/react';

export async function loader({request, context: {storefront}}: LoaderArgs) {
  const data = await storefront.query(PROJECT_GALERRY_QUERY);
  let projects = parseObject(data, 'metaobjects.nodes');
  if (!projects) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  projects = projects.map((project: any) => {
    const handledProject: any = {};
    handledProject.id = project.id;
    handledProject.type = project.type;
    handledProject.handle = project.handle;
    if (project.fields) {
      project.fields.forEach((field: any) => {
        if (!field.type.includes('list.')) {
          handledProject[field.key] = field.value;
        } else {
          handledProject[field.key] = JSON.parse(field.value);
        }
      });
    }
    return handledProject;
  });

  return json({projects});
}

export default function Homepage() {
  const {projects} = useLoaderData<typeof loader>();

  console.log(projects);

  return (
    <>
      <OutProjects />
      <Booking />
      <SocialProof />
      {/* <FeaturedPost articles={articles as any} /> */}
    </>
  );
}
