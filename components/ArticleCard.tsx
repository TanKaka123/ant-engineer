import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section, H } from "react-headings";

import { Article } from "domain/ArticleRepo";

import LikeCounter from "components/LikeCounter";

export type ArticleCardProps = Pick<
  Article,
  | "slug"
  | "title"
  | "coverImage"
  | "readingTime"
  | "blurDataURL"
  | "excerpt"
  | "tags"
  | "date"
>;

const formatDate = (dateString) => {
  console.log({dateString})
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default function ArticleCard({
  slug,
  title,
  coverImage,
  readingTime,
  blurDataURL,
  excerpt,
  tags,
  date,
}: ArticleCardProps) {
  return (
    <Link href={`/${slug}`} passHref className="overflow-hidden  bg-white ">
      <div className="relative w-full pt-[50%] h-36 md:h-44 lg:h-64">
        <Image
          src={coverImage}
          blurDataURL={blurDataURL}
          alt="Cover image"
          fill
          sizes="(max-width: 660px) 100vw, (max-width: 788px) 50vw, 436px"
          placeholder="blur"
          className="rounded-2xl bg-gray-100 object-cover"
        />
      </div>
      <div className="py-6">
        <Section
          component={
            <H className="mb-3 text-xl font-bold md:text-2xl">{title}</H>
          }
        >
          {/* <p className="text-sm text-gray-600 md:text-base">{excerpt}</p> */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="text-md text-black">{date && formatDate(date)}</div>
            <LikeCounter
              slug={slug}
              classNameText="text-sm"
              IconProps={{
                size: "xs",
              }}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <p
                key={index}
                className="rounded-full bg-gray-300 px-3 py-1 text-sm font-medium text-white"
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
