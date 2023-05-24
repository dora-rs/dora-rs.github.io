import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import BrowserOnly from "@docusaurus/BrowserOnly";

import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const state = {
    options: {
      chart: {
        type: "line",
      },
      legend: {
        position: "top",
      },
      xaxis: {
        categories: ["8", "40 kB", "400 kB", "4 MB", "40 MB"],
        title: { text: "Message Size" },
      },
      yaxis: [
        {
          //          logarithmic: true,
          title: { text: "Latency (milliseconds)" },
        },
      ],
      stroke: {
        // curve: "smooth",
        width: [2, 2],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " ms";
          },
        },
      },
      annotations: {
        xaxis: [
          {
            x: "400 kB",
            strokeDashArray: 0,
            borderColor: "#089f8f",
            label: {
              borderColor: "#089f8f",
              text: "480p",
            },
          },
          {
            x: "4 MB",
            strokeDashArray: 0,
            borderColor: "#08737f",
            label: {
              borderColor: "#08737f",
              text: "1080p",
            },
          },
        ],
        points: [
          {
            x: "40 MB",
            y: 8.94,
            marker: {
              size: 8,
              fillColor: "#fff",
              strokeColor: "red",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              offsetX: -40,
              style: {
                color: "#fff",
                background: "#FF4560",
              },

              text: "17x Faster than ROS 2",
            },
          },
        ],
      },
    },
    series: [
      {
        name: "dora-rs",
        data: [0.53, 0.41, 0.69, 2.18, 8.94],
        color: "#3578e5",
      },
      {
        name: "ROS 2",
        data: [0.71, 0.97, 4.94, 14.76, 153.11],
        color: "#545454",
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
            <h2>Latency for Python (Lower is better)</h2>
            <BrowserOnly fallback={<div>Chart not supported</div>}>
              {() => {
                const Chart = require("react-apexcharts").default;
                return (
                  <Chart
                    options={state.options}
                    series={state.series}
                    width="100%"
                  />
                );
              }}
            </BrowserOnly>
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
