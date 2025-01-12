import React from "react";
import Image from "next/image";
import { Section, H } from "react-headings";

import Layout from "components/Layout";
import SEO from "components/SEO";
import Container from "components/Container";
import hikeWebp from "public/presentation.webp";
import award1 from "public/award/1.jpg";
import award2 from "public/award/2.jpg";
import award3 from "public/award/3.jpg";
import award4 from "public/award/4.jpg";
import award5 from "public/award/5.jpg";
import award6 from "public/award/6.jpg";
import award7 from "public/award/7.jpg";
import award8 from "public/award/8.jpg";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const LIST_IMAGE = [hikeWebp, award1, award2, award3, award4, award5, award6, award7, award8]
export default function AboutPage() {
  const [indexDisplayImg, setIndexDisplayImage] = React.useState<number>(0);

  const nextImage = () => {
    setIndexDisplayImage((prevIndex) => (prevIndex + 1) % LIST_IMAGE.length);
  };

  const prevImage = () => {
    setIndexDisplayImage(
      (prevIndex) => (prevIndex - 1 + LIST_IMAGE.length) % LIST_IMAGE.length
    );
  };

  React.useEffect(() => {
    const timer = setTimeout(nextImage, 2000);
    return () => clearTimeout(timer);
  }, [indexDisplayImg]);


  return (
    <Layout>
      <SEO title="About" />
      <Container className="mt-24 mb-8 md:max-w-screen-md">
        <Section
          component={
            <H className="mb-4 text-3xl font-bold sm:text-4xl md:mb-8 md:text-5xl">
              About Me
            </H>
          }
        >
          <div className="prose dark:prose-invert dark:prose-dark sm:prose-lg">
            <p className="font-bold text-gray-600">
              {`Hey! I'm Toby Nguyen, a developer from VietNam. 
              I work at Presight as a Software Engineer and I write articles for my fellow developers from time to time.`}
            </p>
            <p>
              {`
              I graduated in Software Engineering from the University of Science a few years later.
              Since then, I have worked at many technology-first companies.
              Turning my passion for building stuff into a full-time job.
              Young me would be proud.
              `}
            </p>
            <p>
              {`Anyway, you can find me either playing board games with friends, working out at the gym, or tasting beers at a micro-brewery.`}
            </p>
            <p>{`Enjoy your stay!`}</p>
            <div className=" relative">

              <div className="relative overflow-hidden w-full h-[500px] sm:h-[500px]">
                <Image
                  src={LIST_IMAGE[indexDisplayImg % LIST_IMAGE.length]}
                  alt="Toby Nguyen"
                  placeholder="blur"
                  className="bg-gray-100 shadow-xl sm:rounded-md transition-opacity duration-500 ease-in-out opacity-100"
                  style={{
                    transition: "opacity 0.5s ease-in-out",
                    opacity: 1,
                    height: "500px",
                    objectFit: 'cover'
                  }}
                />
                {/* <p>asda</p> */}
              </div>
              <button
                className="absolute left-2 p-4 rounded-full bg-white top-1/2 opacity-50"
                onClick={prevImage}
              >
                <FaAngleLeft />
              </button>
              <button
                className="absolute right-2 p-4 rounded-full bg-white top-1/2 opacity-50"
                onClick={nextImage}
              >
                <FaAngleRight />
              </button>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {LIST_IMAGE.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-4 h-4 rounded-full ${idx === indexDisplayImg
                      ? "bg-green-600"
                      : "bg-black dark:bg-[black] opacity-50"
                      }`}
                    onClick={() => setIndexDisplayImage(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </Layout>
  );
}
