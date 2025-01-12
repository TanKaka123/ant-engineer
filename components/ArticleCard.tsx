import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section, H } from "react-headings";

import { Article } from "domain/ArticleRepo";

import LikeCounter from "components/LikeCounter";

export type ArticleCardProps = Pick<
  Article,
  "slug" | "title" | "coverImage" | "readingTime" | "blurDataURL" | "excerpt" | "tags"
>;

export default function ArticleCard({
  slug,
  title,
  coverImage,
  readingTime,
  blurDataURL,
  excerpt,
  tags
}: ArticleCardProps) {
  return (
    <Link
      href={`/${slug}`}
      passHref
      className="overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200 transition hover:shadow-2xl dark:bg-gray-100 dark:hover:ring-green-400"
    >
      <div className="relative w-full pt-[50%]">
        <Image
          src={coverImage}
          blurDataURL={blurDataURL}
          alt="Cover image"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 416px"
          placeholder="blur"
          className="bg-gray-100 object-cover"
        />
      </div>
      <div className="px-4 py-6 sm:px-6">
        <Section
          component={
            <H className="mb-3 text-xl font-bold md:text-2xl">{title}</H>
          }
        >
          <p className="text-sm text-gray-600 md:text-base">{excerpt}</p>
          <div className="mt-4 flex items-center space-x-4">
            <div className="text-sm text-gray-500">{readingTime} min read</div>
            <LikeCounter
              slug={slug}
              classNameText="text-sm"
              IconProps={{
                size: "xs",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <p key={index}
                className="px-3 py-1 text-sm font-medium text-gray-500 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-white"
              >
                {tag}
              </p>
            ))}
          </div>
        </Section>
      </div>
    </Link>
  );
}
