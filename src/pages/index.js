import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Reviews from "@site/src/components/Reviews";
import Talks from "@site/src/components/Talks";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Admonition from "@theme/Admonition";
import styles from "./index.module.css";
import Translate from "@docusaurus/Translate";

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ReactPlayer from "react-player";
import Heading from "@theme/Heading";
import Scripts from "./installation-scripts.mdx";

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
        curve: "monotoneCubic",
        width: [3, 3],
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
          {
            x: "40 MB",
            strokeDashArray: 0,
            borderColor: "#08737f",
            label: {
              borderColor: "#08737f",
              text: "4K",
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
              strokeColor: "#3578e5",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#3578e5",
              offsetY: 0,
              offsetX: -40,

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
        curve: "monotoneCubic",
        width: [3, 3],
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
          {
            x: "40 MB",
            strokeDashArray: 0,
            borderColor: "#08737f",
            label: {
              borderColor: "#08737f",
              text: "4K",
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
              strokeColor: "#3578e5",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#3578e5",
              offsetY: 0,
              offsetX: -40,
              text: "10x Faster than ROS 2",
            },
          },
        ],
      },
    },
    options_cuda: {
      chart: {
        type: "bar",
      },
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
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
          max: 30,
          min: 0,
          tickAmount: 10,
        },
      ],
      stroke: {
        curve: "monotoneCubic",
        width: [3, 3],
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
          {
            x: "40 MB",
            strokeDashArray: 0,
            borderColor: "#08737f",
            label: {
              borderColor: "#08737f",
              text: "4K",
            },
          },
        ],
        points: [
          {
            x: "40 MB",
            y: 1.09,
            marker: {
              size: 8,
              fillColor: "#fff",
              strokeColor: "green",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#3578e5",
              offsetY: 0,
              offsetX: -40,

              text: "20x Faster using CUDA IPC",
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
        curve: "monotoneCubic",
        width: [3, 3],
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
          {
            x: "40 MB",
            strokeDashArray: 0,
            borderColor: "#08737f",
            label: {
              borderColor: "#08737f",
              text: "4K",
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
              strokeColor: "#3578e5",
              radius: 2,
              cssClass: "apexcharts-custom-class",
            },
            label: {
              borderColor: "#FF4560",
              offsetY: 0,
              offsetX: -70,

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
    series_cuda: [
      {
        name: "CUDA->Shared Memory->CUDA",
        data: [0.641, 0.658, 0.933, 3.146, 23.968],
        color: "#3578e5",
      },
      {
        name: "CUDA->CUDA",
        data: [0.737, 0.708, 0.721, 0.826, 1.05],
        color: "#76B900",
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
  let height = "590px";
  let urls = [
    "https://www.youtube.com/shorts/XGLy1uFMTnU",
    "https://youtube.com/shorts/wDfQb7SBZgs",
    "https://youtube.com/shorts/kqwIuiikyJU",
    "https://youtube.com/shorts/O7ZQXZh0zjk",
  ];
  let phone = false;
  if (typeof window !== "undefined" && window.innerWidth < 960) {
    height = "670px";
    urls = ["https://youtube.com/shorts/OsFjvhdEaJs"];
    phone = true;
  }

  return (
    <header>
      <div className="container" style={{ padding: 0 }}>
        <div style={{ display: "flex" }}>
          {urls.map((url) => (
            <div
              className="player__wrapper"
              style={{
                height: height,
                position: "relative",
                margin: "auto",
                width: "100%",
                aspectRatio: "auto",
              }}
            >
              <ReactPlayer
                url={url}
                className="player"
                width="100%"
                height="100%"
                playing={true}
                loop={true}
                playsinline={true}
                volume={0.5}
                muted={true}
                config={{ youtube: { playerVars: { disablekb: 1 } } }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className="container margin-bottom--xl"
        style={{
          position: "relative",
          bottom: !phone ? "0px" : "180px",
          left: "0",
          right: "0",
          padding: "20px",
          color: "black",
          background: "rgba(255, 255, 255, 1)",
        }}
      >
        <p
          className="hero__subtitle"
          style={{ fontSize: "xx-large", textAlign: "center" }}
        >
          {siteConfig.tagline}
        </p>
        <Scripts />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--md margin-bottom--md"
              to="/docs/guides"
            >
              <Translate id="homepage.guide.button.text">
                🔥 Get started
              </Translate>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--md margin-bottom--md"
              to="https://dora-rs.ai/python-api.html"
            >
              <Translate id="homepage.python-api.button.text">
                🐍 Python API
              </Translate>
            </Link>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--md"
              to="https://docs.rs/dora-node-api/latest/dora_node_api/"
            >
              <Translate id="homepage.rust-api.button.text">
                🦀 Rust API
              </Translate>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="margin-right--md margin-bottom--xl">
          <div
            style={{
              width: "100%",
              fontSize: "large",
            }}
          >
            <p>
              <Translate id="homepage.main.paragraph.first">
                In 2024, AI is booming! Robotic framework however hasn't changed
                much in years... This is why we created dora-rs! dora-rs is a
                new robotic framework that brings modernity into robotic
                application.
              </Translate>
            </p>
            <p>
              <Translate id="homepage.main.paragraph.second">
                dora-rs can already show impressive performance! This is the
                result of using our own shared memory server and Apache Arrow to
                achieve zero copy!
              </Translate>
            </p>
            <p>
              <Translate id="homepage.main.paragraph.third">
                Those performance improvements make a world of difference for
                beginners, AI practitioners, and weekend hobbyists who have been
                limited by the lack of support for Python in this field!
              </Translate>
            </p>
            <p>
              <Translate id="homepage.main.paragraph.fourth">
                And that's only one example of the many innovative features that
                we can show for dora-rs!
              </Translate>
            </p>
          </div>
        </div>
      </div>
      <br />
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "49%",
          }}
        >
          <div className="">
            <h2>Dora CPU Latency (Lower is better)</h2>
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
                <Admonition type="info">
                  Source code:
                  <Link to="https://github.com/dora-rs/dora-benchmark/">
                    dora-benchmark
                  </Link>
                </Admonition>
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
                  <Link to="https://github.com/dora-rs/dora-benchmark/">
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
        <div
          style={{
            width: "49%",
            margin: "auto",
          }}
        >
          <div className="">
            <h2>Dora GPU Latency (Lower is better)</h2>
            <Tabs groupId="GPU" queryString>
              <TabItem value="PyTorch CUDA" label="PyTorch CUDA">
                <BrowserOnly fallback={<div>Chart not supported</div>}>
                  {() => {
                    const Chart = require("react-apexcharts").default;
                    return (
                      <Chart
                        options={state.options_cuda}
                        series={state.series_cuda}
                        width="100%"
                      />
                    );
                  }}
                </BrowserOnly>

                <Admonition type="tip">
                  Dora now support CUDA zero copy for Pytorch 🔥 See:
                  <Link to="docs/guides/Development/Cuda">Documentation</Link>
                </Admonition>
                <Admonition type="info">
                  Source code:
                  <Link to="https://github.com/dora-rs/dora-benchmark/">
                    dora-benchmark
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
      title={`${siteConfig.title}`}
      description="dora-rs a new robotic framework that brings modernity into robotic application."
    >
      <HomepageHeader />
      <main>
        <Heading as="h2" className="hero__title text--center">
          Features
        </Heading>
        <HomepageFeatures />
        <Heading as="h2" className="hero__title text--center">
          Reviews
        </Heading>
        <Reviews />
        <Heading as="h2" className="hero__title text--center">
          Talks
        </Heading>
        <Talks />
      </main>
    </Layout>
  );
}
