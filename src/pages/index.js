import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Chart from "react-apexcharts";

import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const state = {
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
      stroke: {
        curve: "smooth",
        width: [2, 2],
      },
    },
    series: [
      {
        name: "Series A",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Series B",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
  };

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="margin-right--md margin-bottom--xl">
          <img src="/img/logo.svg" width="400"></img>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/guides"
            >
              <Translate id="homepage.button.text">🔥 Get started</Translate>
            </Link>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <div className="margin-top--lg">
            <h2>We're fast!</h2>
            <Chart options={state.options} series={state.series} width="100%" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
