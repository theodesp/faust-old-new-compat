import { useQuery, gql } from "@apollo/client";
import Head from "next/head";
import { Footer, Header, Hero } from "components";
import EntryHeader from "components/entry-header";
import { getApolloClient, getNextStaticProps } from "@faustwp/core";
import { GetStaticPropsContext } from "next";
import ContentWrapper from "components/ContentWrapper";

/**
 * Next.js file based page example with Faust helpers.
 */
export default function Page(props) {
  if (props.loading) {
    return null;
  }
  const { title: siteTitle, description: siteDescription } =
  props.data?.generalSettings ?? { title: "", description: "description" };
  const { content } = props.data?.page ?? { title: "" };

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
            <ContentWrapper content={content} />
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
  const {data} = await getApolloClient().query({query: q, variables: variables()});
  return getNextStaticProps(ctx, {
    Page: Page as any,
    props: {
      data
    },
    revalidate: 10,
  });
}
