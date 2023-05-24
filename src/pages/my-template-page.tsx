import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import { Footer, Header, Hero } from "components";
import EntryHeader from "components/entry-header";
import { getApolloClient, getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import { pageData } from "../data.ts";

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page(props) {
  if (props.loading) {
    return null;
  }
  const { title: siteTitle, description: siteDescription } = props.data
    ?.generalSettings ?? { title: "", description: "description" };

  return (
    <>
      <Header title={siteTitle} description={siteDescription} />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Hero title="New Faust Page" />
      <main className="content content-single">
        <div className="wrap">
          <EntryHeader title="Next.js Page Example" />
          <div className="container">
            <pre
              style={{
                overflowY: "scroll",
                maxWidth: "1024px",
                height: "400px",
                whiteSpace: "pre-wrap",
              }}
            >
              <code>{JSON.stringify(props.data?.page.pageHome)}</code>
            </pre>
          </div>
        </div>
      </main>
      <Footer copyrightHolder={siteTitle} />
    </>
  );
}

const q = gql`
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

const variables = () => {
  return {
    uri: "/my-template-page",
  };
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  console.debug(
    JSON.stringify(
      await getNextStaticProps(ctx, {
        Page: Page as any,
        props: {
          data: pageData,
        },
        revalidate: 10,
      })
    )
  );
  return getNextStaticProps(ctx, {
    Page: Page as any,
    props: {
      data: pageData,
    },
    revalidate: 10,
  });
}
