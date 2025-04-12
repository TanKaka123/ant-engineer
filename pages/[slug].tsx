import React from "react";
import {
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import Image from "next/image";
import { Section, H } from "react-headings";
import { Menu } from "@headlessui/react";
import { useInView } from "react-intersection-observer";

import { articleRepo } from "repos/articles";

import Layout from "components/Layout";
import SEO from "components/SEO";
import MarkdownRenderer from "components/MarkdownRenderer";
import BlueskyIcon from "components/icons/Bluesky";
import LinkedInIcon from "components/icons/LinkedIn";
import LinkIcon from "components/icons/Link";
import Container from "components/Container";
import ArticleCards from "components/ArticleCards";
import CustomMenu from "components/Menu";
import LikeCounter from "components/LikeCounter";

import tobyWebp from "public/toby.png";
import { date } from "zod";

const siteUrl = "https://tobynguyen.dev";

export default function SlugPage({
  article,
  articleCards,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { slug, title, excerpt, coverImage, blurDataURL, content } = article;

  const currentUrl = `${siteUrl}/${slug}`;

  const schema = {
    "@context": "http://schema.org",
    "@type": "TechArticle",
    url: currentUrl,
    headline: title,
    name: title,
    description: excerpt,
    author: {
      "@type": "Person",
      name: "Ant Engineer",
      url: siteUrl,
    },
    creator: ["Ant Engineer"],
    publisher: {
      "@type": "Person",
      name: "Ant Engineer",
      url: siteUrl,
    },
    image: `${siteUrl}${coverImage}`,
    mainEntityOfPage: currentUrl,
  };

  const [topRef, isTopInView] = useInView();
  const [bottomRef, isBottomInView] = useInView();

  const handleShareBluesky = () => {
    const url = `https://bsky.app/intent/compose?text=${encodeURIComponent(
      `${title} ${currentUrl} via @tobynguyen.dev`
    )}`;
    window.open(url, "_blank");
  };

  const handleShareLinkedIn = () => {
    const urlEncoded = encodeURI(
      `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${title}&summary=${excerpt}&source=LinkedIn`
    );

    window.open(
      urlEncoded,
      "_blank",
      "width=550,height=431,location=no,menubar=no,scrollbars=no,status=no,toolbar=no"
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Layout>
      <SEO
        title={title}
        image={`${siteUrl}${coverImage}`}
        description={excerpt}
        schema={schema}
        url={currentUrl}
      />
      <Section
        component={
          <Container className="max-w-[820px]">
            <article>
              <header className="mt-24 mb-8">
                <div className="relative mb-8 pt-[50%] h-36 md:h-44 lg:h-64">
                  <Image
                    src={coverImage}
                    blurDataURL={blurDataURL}
                    alt="Article cover"
                    fill
                    sizes="(max-width: 728px) 100vw, 728px"
                    placeholder="blur"
                    className="bg-gray-100 object-cover shadow-xl sm:rounded-md"
                  />
                </div>
                <H className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:mb-8">
                  {title}
                </H>
                <p className="text-xl font-normal italic text-gray-500">{excerpt}</p>
              </header>

              <div ref={topRef} />
              <div
                className={`fixed top-80 right-[calc((100vw-1000px)/2)] hidden lg:block ${
                  !isTopInView && !isBottomInView ? "opacity-100" : "opacity-0"
                } transition-opacity duration-200`}
              >
                <LikeCounter slug={slug} />
              </div>
              <MarkdownRenderer>{content}</MarkdownRenderer>
              <div className="my-8 flex items-center space-x-2">
                <CustomMenu
                  button={
                    <Menu.Button className="btn-primary">Share</Menu.Button>
                  }
                  items={[
                    {
                      key: "bluesky",
                      title: "Bluesky",
                      onClick: handleShareBluesky,
                      icon: (
                        <BlueskyIcon
                          size="sm"
                          className="mr-3 text-gray-400 group-hover:text-gray-500"
                        />
                      ),
                    },
                    {
                      key: "linkedin",
                      title: "LinkedIn",
                      onClick: handleShareLinkedIn,
                      icon: (
                        <LinkedInIcon
                          size="sm"
                          className="mr-3 text-gray-400 group-hover:text-gray-500"
                        />
                      ),
                    },
                    {
                      key: "link",
                      title: "Copy link",
                      onClick: handleCopyLink,
                      icon: (
                        <LinkIcon
                          size="sm"
                          className="mr-3 text-gray-400 group-hover:text-gray-500"
                        />
                      ),
                    },
                  ]}
                />
                {/* <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Edit
                </a> */}
                <LikeCounter slug={slug} className="px-1" />
              </div>
              <Link href="/" passHref className="my-8 flex items-center">
                <Image
                  src={tobyWebp}
                  width={64}
                  height={64}
                  alt="Ant Engineer"
                  className="mr-3 shrink-0 rounded-full bg-gray-100"
                  placeholder="blur"
                />
                <div>
                  <div className="text-lg font-bold">By Ant Engineer</div>
                  <div className="text-lg text-gray-500">
                    I write bite-sized articles for developers
                  </div>
                </div>
              </Link>
            </article>
          </Container>
        }
      >
        <Container className="mt-24 mb-16 xl:max-w-screen-xl">
          <Section
            component={
              <H className="mb-6 text-3xl font-bold">Related articles</H>
            }
          >
            <ArticleCards articleCards={articleCards} />
            <div ref={bottomRef} />
          </Section>
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = params?.slug;

  if (typeof slug !== "string") {
    throw new Error("Invalid slug param");
  }

  const article = await articleRepo.getArticleBySlug(slug);

  if (!article) {
    throw new Error("Missing article");
  }

  const articleCards = (await articleRepo.getRelatedArticles(slug)).map(
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
  );

  return {
    props: {
      article,
      articleCards,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await articleRepo.getAllSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
};
