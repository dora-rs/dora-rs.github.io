import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

const FeatureList = [
  {
    title: "🌳 Declarative",
    // Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Declarative dataflow enabling reusability and isolation. All nodes are
        declared within a YAML configuration, which can be easily modified.
      </>
    ),
  },
  {
    title: "📁 Zero Copy",
    // Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>Transfer message with no overhead as we do not perform any copy.</>
    ),
  },
  {
    title: "⭐ Shared Memory",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Use shared memory on the same machine.</>,
  },
  {
    title: "🎉 Polyglot",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Available on Python, Rust, C and C++</>,
  },
  {
    title: "💻 Cross Platform",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        By being written in Rust, we are able to cross-compile dora-rs into all
        platform with very little dependencies.
      </>
    ),
  },
  {
    title: "🔭 Observable",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        We provide log, tracing and metrics capabilities through opentelemetry
        to make debugging easy. You can also hot-reload your code in Python!
      </>
    ),
  },
  {
    title: "🧑‍🤝‍🧑 Community",
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        We're commited into making a dora a community-first project! We hope to
        help other learn and grow their knowledge about robotic application.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className="card shadow--md">
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
  </div> */}
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <h3>{title}</h3>
          </Heading>
        </div>
        <p className={styles.showcaseCardBody}>{description}</p>
      </div>
      {/*   <div className="card__footer">
        <Link className={"button button--primary"} href={title}>
          {title}
        </Link>
      </div> */}
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="margin-top--lg margin-bottom--xl margin-left--xl margin-right--xl ">
      <div className="container margin-top--lg ">
        <ul className={clsx("clean-list", styles.showcaseList)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </ul>
      </div>
    </section>
  );
}
