import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";

const FeatureList = [
  {
    title: translate({
      message: "⭐ Zero Overhead",
      id: "homepage.features.shared-memory.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.shared-memory.text">
        Transfer message with zero copy on shared memory! We use Arrow and our
        own shared memory daemon to make lightspeed communnication on a single
        machine.
      </Translate>
    ),
  },
  {
    title: translate({
      message: "🤯 Scalable",
      id: "homepage.features.scale.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.scale.text">
        Built to scale accross machines and robots! We use YAML description to
        make our software declarative in order to be distributable on multiple
        machines.
      </Translate>
    ),
    href: "docs/api/dataflow-config",
  },
  {
    title: translate({
      message: "👨‍🏭 Fast Prototyping",
      id: "homepage.features.prototyping.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        <Translate id="homepage.features.prototyping.text">
          Use readily available nodes and operators from your YAML dataflow, so
          that you don't need to bother copy pasting boilerplate code. You can
          also tinker live using Python!
        </Translate>
      </>
    ),
    href: "docs/guides/Development/hot-reload",
  },
  {
    title: translate({
      message: "🔭 Observable",
      id: "homepage.features.observable.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.observable.text">
        Get logs, traces and metrics through our cli and scale using ops using
        opentelemetry!
      </Translate>
    ),
    href: "docs/guides/debugging/logs",
  },
  {
    title: translate({
      message: "💻 Large Support Matrix",
      id: "homepage.features.cross-platform.title",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <Translate id="homepage.features.cross-platform.text">
        By being written in Rust, we are available in Python, Rust, C and C++
        but also accross platform and architecture!
      </Translate>
    ),
    href: "docs/guides/support-matrix",
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
    href: "docs/community",
  },
];

function Feature({ Svg, title, description, href }) {
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
      <div className="card__footer">
        <Link className={"button button--primary"} href={href}>
          <Translate id="homepage.button.text">Learn More</Translate>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="margin-top--lg margin-bottom--xl">
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
