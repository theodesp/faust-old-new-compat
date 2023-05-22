import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import EntryHeader from "../components/entry-header";
import { getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import ContentWrapper from "components/ContentWrapper";

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page(props) {
  const { data } = useQuery(Page.query as any, {
    variables: Page.variables(),
  });
  if (props.loading) {
    return null;
  }
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? { title: "", description: "description" };
  const { content } = data?.page ?? { title: "" };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <main className="container">
        <EntryHeader title="Next.js Page Example" />
        <div className="container">
          <ContentWrapper content={content} />
        </div>
      </main>
    </>
  );
}

Page.query = gql`
  query GetExamplePage($uri: ID!) {
    generalSettings {
      title
      description
    }
    page(id: $uri, idType: URI) {
      title
      content
    }
    primaryMenuItems: menuItems(where: { location: PRIMARY }) {
      nodes {
        id
        uri
        path
        label
        parentId
        cssClasses
        menu {
          node {
            name
          }
        }
      }
    }
  }
`;

Page.variables = () => {
  return {
    uri: "/my-template-page",
  };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
    console.debug(
      await getNextStaticProps(ctx, {
        Page,
        revalidate: 10,
      })
    );
  return getNextStaticProps(ctx, {
    Page,
    revalidate: 10,
  })
}