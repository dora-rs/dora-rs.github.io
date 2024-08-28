import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import { XEmbed } from "react-social-media-embed";

const desktoplist = [
  {
    url: "https://twitter.com/Thom_Wolf/status/1780241959036047604",
  },
  {
    url: "https://x.com/RemiCadene/status/1799000991876178038",
  },
  {
    url: "https://x.com/ax_pey/status/1787386223310393627",
  },
  {
    url: "https://x.com/HaixuanT/status/1786442032602349959",
  },
  {
    url: "https://x.com/LFAIDataFdn/status/1803703036432273705",
  },
  {
    url: "https://twitter.com/blackanger/status/1612648192373587969",
  },
];

export default function Reviews() {
  return (
    <section className="margin-top--xl margin-bottom--xl">
      <div className="container">
        <div className="row margin-top--lg margin-bottom--lg">
          {desktoplist.map((props, idx) => (
            <div className="col col--4 padding--xs">
              <XEmbed url={props.url} width={325} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
