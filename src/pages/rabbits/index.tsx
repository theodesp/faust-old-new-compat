import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Footer, Header, Hero } from "components";
import { getNextStaticProps } from "@faustwp/core";
import ContentWrapper from "components/ContentWrapper";
import EntryHeader from "components/entry-header";

export default function Page() {
  const { data, loading, fetchMore } = useQuery(Page.query, {
    variables: Page.variables(),
  });

  if (loading) {
    return <></>;
  }

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? { title: "", description: "description" };
  const rabbits = data.rabbits.edges.map((el) => el.node);

  return (
    <>
      <Header title={siteTitle} description={siteDescription} />
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Hero title="New Faust Page" />
      <main className="content">
        <div className="wrap">
          <EntryHeader title="Next.js Page Example" />
          {rabbits.map((rabbit, i) => {
            return (
              <div key={i}>
                <h1>{rabbit.title}</h1>
                <p>{rabbit.content}</p>
              </div>
            );
          })}
        </div>
      </main>
      <Footer copyrightHolder={siteTitle} />
    </>
  );
}

Page.query = gql`
  query GetRabbitsPage {
    rabbits {
      edges {
        node {
          title
          content
        }
      }
    }
    generalSettings {
        title
        description
    }
  }
`;

Page.variables = () => {
  return {};
};

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page,
    revalidate: 10
  });
}
