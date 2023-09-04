import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Admonition from "@theme/Admonition";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  const state = {
    options_python: {
      chart: {
        type: "line",
      },
      legend: {
        position: "top",
      },
      xaxis: {
        categories: ["8 B", "40 kB", "400 kB", "4 MB", "40 MB"],
        title: { text: "Message Size" },
      },
      yaxis: [
        {
          //          logarithmic: true,
          title: { text: "Latency (milliseconds)" },
          max: 160,
          min: 0,
          tickAmount: 8,
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
    options_rust: {
      chart: {
        type: "line",
      },
      legend: {
        position: "top",
      },
      xaxis: {
        categories: ["8 B", "40 kB", "400 kB", "4 MB", "40 MB"],
        title: { text: "Message Size" },
      },
      yaxis: [
        {
          //          logarithmic: true,
          title: { text: "Latency (milliseconds)" },
          max: 160,
          min: 0,
          tickAmount: 8,
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
            y: 4.49,
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

              text: "10x Faster than ROS 2",
            },
          },
        ],
      },
    },
    options_cpp: {
      chart: {
        type: "line",
      },
      legend: {
        position: "top",
      },
      xaxis: {
        categories: ["8 B", "40 kB", "400 kB", "4 MB", "40 MB"],
        title: { text: "Message Size" },
      },
      yaxis: [
        {
          //          logarithmic: true,
          title: { text: "Latency (milliseconds)" },
          max: 160,
          min: 0,
          tickAmount: 8,
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
            y: 4.49,
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
              offsetX: -70,
              style: {
                color: "#fff",
                background: "#FF4560",
              },

              text: "Match ROS 2 C/C++ Shared Memory",
            },
          },
        ],
      },
    },
    series_python: [
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
    series_rust: [
      {
        name: "dora-rs",
        data: [0.28, 0.28, 0.34, 0.91, 4.49],
        color: "#3578e5",
      },
      {
        name: "ROS 2",
        data: [0.44, 0.49, 0.48, 4.17, 40.99],
        color: "#545454",
      },
    ],
    series_cpp: [
      {
        name: "dora-rs",
        data: [0.28, 0.28, 0.34, 0.91, 4.49],
        color: "#3578e5",
      },
      {
        name: "ROS 2",
        data: [0.19, 0.29, 0.3, 0.67, 4.55],
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
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <p><Translate id="homepage.main.paragraph.first">
              In 2023, AI is booming! Robotic framework however hasn't
              changed much in years... This is why we create dora-rs! dora-rs is a new robotic
              framework that brings modernity into robotic application.
            </Translate> </p>
            <p><Translate id="homepage.main.paragraph.second">
              dora-rs can already show impressive
              performance! This is the result of using our own shared memory server and Apache Arrow to achieve zero copy!
            </Translate></p>
            <p><Translate id="homepage.main.paragraph.third">
              Those performance improvements make a world of difference for beginners, AI practitioners, and weekend hobbyists who have been limited by the lack of support for Python in this field!
            </Translate></p>
            <p><Translate id="homepage.main.paragraph.fourth">And that's only one example of the many innovative features that we can show for dora-rs!</Translate></p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--md margin-bottom--md"
                to="/docs/guides"
              >
                <Translate id="homepage.guide.button.text">🔥 Get started</Translate>
              </Link>
            </div>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--md margin-bottom--md"
                to="/docs/api/python-api"
              >
                <Translate id="homepage.python-api.button.text">🐍 Python API</Translate>
              </Link>
            </div>
            <div className={styles.buttons}>
              <Link
                className="button button--secondary button--md"
                to="https://docs.rs/dora-node-api/latest/dora_node_api/"
              >
                <Translate id="homepage.rust-api.button.text">🦀 Rust API</Translate>
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <div className="margin-top--lg">
            <h2>Latency (Lower is better)</h2>
            <Tabs groupId="language" queryString>
              <TabItem value="Python" label="Python API">
                <BrowserOnly fallback={<div>Chart not supported</div>}>
                  {() => {
                    const Chart = require("react-apexcharts").default;
                    return (
                      <Chart
                        options={state.options_python}
                        series={state.series_python}
                        width="100%"
                      />
                    );
                  }}
                </BrowserOnly>
              </TabItem>
              <TabItem value="Rust" label="Rust API">
                <BrowserOnly fallback={<div>Chart not supported</div>}>
                  {() => {
                    const Chart = require("react-apexcharts").default;
                    return (
                      <Chart
                        options={state.options_rust}
                        series={state.series_rust}
                        width="100%"
                      />
                    );
                  }}
                </BrowserOnly>
                <Admonition type="info">
                  <Link to="https://github.com/haixuanTao/ros2_rust">
                    Source code for ros2_rust
                  </Link>
                  <br />
                  <Link to="https://github.com/dora-rs/dora/tree/main/examples/benchmark">
                    Source code for dora-rs
                  </Link>
                </Admonition>
              </TabItem>
              <TabItem value="C/C++" label="C/C++ API">
                <BrowserOnly fallback={<div>Chart not supported</div>}>
                  {() => {
                    const Chart = require("react-apexcharts").default;
                    return (
                      <Chart
                        options={state.options_cpp}
                        series={state.series_cpp}
                        width="100%"
                      />
                    );
                  }}
                </BrowserOnly>
                <Admonition type="info">
                  ROS 2 shared memory is only available for C/C++.
                  <br />
                  <Link to="https://github.com/haixuanTao/ros2_shm_demo">
                    Source code for ROS 2 benchmark.
                  </Link>
                  <br />
                  <Link to="https://github.com/dora-rs/dora/tree/main/examples/benchmark">
                    Source code for dora-rs
                  </Link>
                </Admonition>
              </TabItem>
            </Tabs>
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
