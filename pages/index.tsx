import React from "react";
import { Section, H } from "react-headings";
import { InferGetStaticPropsType } from "next";

import { articleRepo } from "repos/articles";

import SEO from "components/SEO";
import Layout from "components/Layout";
import ArticleCards from "components/ArticleCards";
import Container from "components/Container";

export default function HomePage({
  articleCards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const uniqueTags = (tags: string[]) => {
    return tags.reduce<string[]>((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  };

  const filteredArticles = selectedTag
    ? articleCards.filter((article) => article.tags.includes(selectedTag))
    : articleCards;

  return (
    <>
      <SEO />
      <Layout>
        <Container className="xl:max-w-screen-xl">
          {/* <Section
            component={
              <section className=" mb-20 flex flex-col justify-center">
                <Overview />
              </section>
            }
          > */}
          <section className="mb-16 mt-28">

            <Section
              component={
                <>
                  <H className="text-2xl font-bold md:text-3xl">
                    Articles
                  </H>
                  <p className="text-lg mb-6 mt-2 text-gray-400 dark:text-gray-500">
                    Here&apos; a list of articles, thoughts and ideas around topics like design systems, <br />accessibility, state machines and lots more.
                  </p>
                </>
              }
            >
              <div className="flex flex-wrap gap-2 mb-12">
                {uniqueTags(articleCards.flatMap(({ tags }) => tags)).map(
                  (tag, index) => (
                    <TagButton
                      key={index}
                      tag={tag}
                      isSelected={selectedTag === tag}
                      onClick={() => setSelectedTag(prevTag => tag === prevTag ? null : tag)}
                    />
                  )
                )}
              </div>

              <ArticleCards articleCards={filteredArticles} />
            </Section>
          </section>
          {/* </Section> */}
        </Container>
      </Layout>
    </>
  );
}

const TagButton = ({ tag, isSelected, onClick }: { tag: string, isSelected: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-[16px] font-medium ${isSelected
        ? "bg-green-400 text-black"
        : "bg-black text-white"
        }`}
    >
      {tag}
    </button>
  )
}

export async function getStaticProps() {
  const articleCards = (await articleRepo.getAllArticles()).map(
    ({ slug, title, coverImage, readingTime, blurDataURL, excerpt, tags }) => ({
      slug,
      title,
      coverImage,
      readingTime,
      blurDataURL,
      excerpt,
      tags
    })
  );

  return {
    props: {
      articleCards,
    },
  };
}
