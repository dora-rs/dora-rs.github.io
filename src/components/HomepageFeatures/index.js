import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";

const FeatureList = [
  {
    title: translate({
      message: "🌳 Declarative",
      id: "homepage.features.declarative.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <Translate id="homepage.features.declarative.text">
        Declarative dataflow enabling reusability and isolation. All nodes are
        declared within a YAML configuration, which can be easily modified.
      </Translate>
    ),
  },
  {
    title: translate({
      message: "📁 Zero Copy",
      id: "homepage.features.zero-copy.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <Translate id="homepage.features.zero-copy.text">
        Transfer message with no overhead as we do not perform any copy.
      </Translate>
    ),
  },
  {
    title: translate({
      message: "⭐ shared memory",
      id: "homepage.features.shared-memory.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.shared-memory.text">
        Use shared memory on the same machine.
      </Translate>
    ),
  },
  {
    title: translate({
      message: "🎉 Polyglot",
      id: "homepage.features.polyglot.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.polyglot.text">
        Available on Python, Rust, C and C++
      </Translate>
    ),
  },
  {
    title: translate({
      message: "💻 Cross Platform",
      id: "homepage.features.cross-platform.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.cross-platform.text">
        By being written in Rust, we are able to cross-compile dora-rs into all
        platform with very little dependencies.
      </Translate>
    ),
  },
  {
    title: translate({
      message: "🔭 Observable",
      id: "homepage.features.observable.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.observable.text">
        We provide log, tracing and metrics capabilities through opentelemetry
        to make debugging easy. You can also hot-reload your code in Python!
      </Translate>
    ),
  },
  {
    title: translate({
      message: "🧑‍🤝‍🧑 Community",
      id: "homepage.features.community.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.community.text">
        We're commited into making a dora a community-first project! We hope to
        help other learn and grow their knowledge about robotic application.
      </Translate>
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
