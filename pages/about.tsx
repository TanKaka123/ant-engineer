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

const LIST_IMAGE = [
  hikeWebp,
  award1,
  award2,
  award3,
  award4,
  award5,
  award6,
  award7,
  award8,
];
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
      <Container className="mt-24 mb-8 max-w-[820px]">
        <Section
          component={
            <H className="mb-4 text-3xl font-bold sm:text-4xl md:mb-8 md:text-5xl">
              About Me
            </H>
          }
        >
          <div className="prose dark:prose-invert dark:prose-dark sm:prose-lg">
            <p className="font-bold text-gray-600">
              {`Hey!`} <br />
              {`I'm Nguyen Hong Tan`}
              <br />
              {`I'm a passionate software engineer from Vietnam, currently working at Presight. In addition to coding, I love sharing knowledge through writing articles for fellow developers.`}
            </p>
            <p>
              {`I earned my degree in Software Engineering from the University of Science. Since then, I’ve had the privilege of working with technology-driven companies, transforming my passion for building innovative solutions into a fulfilling career.`}
            </p>
            <p>
              {`Thanks for stopping by!`} <br />
              <span>{`Tan`}</span>
            </p>
          </div>
        </Section>
      </Container>
    </Layout>
  );
}
