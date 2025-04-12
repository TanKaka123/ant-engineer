import React from "react";
import { Section, H } from "react-headings";
import { InferGetStaticPropsType } from "next";
import { articleRepo } from "repos/articles";
import SEO from "components/SEO";
import Layout from "components/Layout";
import ArticleCards from "components/ArticleCards";
import Container from "components/Container";
import { ICChevronRight } from "components/icons/ChevronRight";
import { ICChevronDown } from "components/icons/ChevronDown";
import { useRouter } from "next/router";
import { ICClose } from "components/icons/Close";

type TagArticle = {
  label: string;
  value: string;
};

export default function HomePage({
  articleCards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [filteredArticles, setFilteredArticles] = React.useState(articleCards);
  const [filteredTagValues, setFilterTagValues] = React.useState<string[]>([]);
  const uniqueTags = Array.from(
    new Set(articleCards.flatMap((article) => article.tags))
  ).map((tag) => ({
    label: tag,
    value: tag,
  }));

  const [isShowTag, setIsShowTag] = React.useState<boolean>(true);
  const router = useRouter();
  const searchQuery =
    typeof router.query.search === "string" ? router.query.search : "";

  React.useEffect(() => {
    let updatedArticles = articleCards;
    if (searchQuery) {
      updatedArticles = articleCards.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filteredTagValues.length > 0) {
      updatedArticles = updatedArticles.filter((article) =>
        article.tags.some((tag: string) => filteredTagValues.includes(tag))
      );
    }
    console.log(updatedArticles.length);
    setFilteredArticles(updatedArticles);
  }, [searchQuery, articleCards, filteredTagValues]);

  return (
    <>
      <SEO />
      <Layout>
        {/* <Section
            component={
              <section className=" mb-20 flex flex-col justify-center">
                <Overview />
              </section>
            }
          > */}
        <section className="bg-gradient-custom mt-28 flex h-64 w-full items-center justify-center ">
          <div className="flex flex-col items-center justify-center rounded-full bg-white px-12 py-4">
            <p className="text-gradient-custom bg-clip-text text-2xl font-bold text-transparent">
              Welcome to
            </p>
            <p className="text-gradient-custom bg-clip-text text-center text-4xl font-extrabold text-transparent">
              The Ant Engineer
            </p>
          </div>
        </section>
        <Container className="xl:max-w-screen-xl">
          <section className="mb-16 mt-12">
            <Section
              component={
                <div className="flex items-end gap-6">
                  <H className="text-2xl font-bold md:text-3xl">
                    Filter by category
                  </H>
                  {/* <p className="mb-6 mt-2 text-lg text-gray-400 dark:text-gray-500">
                    Here&apos; a list of articles, thoughts and ideas around
                    topics like design systems, <br />
                    accessibility, state machines and lots more.
                  </p> */}
                  <div onClick={() => setIsShowTag((prev) => !prev)}>
                    {isShowTag ? (
                      <ICChevronDown className="cursor-pointer text-2xl font-thin" />
                    ) : (
                      <ICChevronRight className="cursor-pointer text-2xl font-thin" />
                    )}
                  </div>
                </div>
              }
            >
              <div className="mb-12 mt-6 flex flex-wrap gap-2">
                {searchQuery !== "" && (
                  <TagButton
                    title={searchQuery}
                    isSelected={true}
                    onClick={() => router.push("/")}
                  />
                )}
                {isShowTag &&
                  uniqueTags.map((tag, index) => (
                    <TagButton
                      key={index}
                      title={tag.label}
                      isSelected={filteredTagValues.includes(tag.value)}
                      onClick={() =>
                        setFilterTagValues((prevTagsValue) => {
                          if (prevTagsValue.includes(tag.value)) {
                            return prevTagsValue.filter(
                              (tagValue) => tagValue !== tag.value
                            );
                          }
                          return [tag.value, ...prevTagsValue];
                        })
                      }
                    />
                  ))}
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

const TagButton = ({
  title,
  isSelected,
  onClick,
}: {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-black py-2 text-[12px] font-medium flex gap-2 items-center ${
        isSelected ? "bg-black text-white pl-4 pr-2" : "bg-transparent text-black px-4"
      }`}
    >
      {title}
      {isSelected && <ICClose width={18} height={18} className="bg-black"/>}
    </button>
  );
};

export async function getStaticProps() {
  const articleCards = (await articleRepo.getAllArticles())
    .map(
      ({
        slug,
        title,
        coverImage,
        readingTime,
        blurDataURL,
        excerpt,
        tags,
        date,
      }) => ({
        slug,
        title,
        coverImage,
        readingTime,
        blurDataURL,
        excerpt,
        tags,
        date,
      })
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    props: {
      articleCards,
    },
  };
}
