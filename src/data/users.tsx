/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import { translate } from "@docusaurus/Translate";
import { sortBy } from "@site/src/utils/jsUtils";

/*
 * ADD YOUR SITE TO THE DOCUSAURUS SHOWCASE
 *
 * Please don't submit a PR yourself: use the Github Discussion instead:
 * https://github.com/facebook/docusaurus/discussions/7826
 *
 * Instructions for maintainers:
 * - Add the site in the json array below
 * - `title` is the project's name (no need for the "Docs" suffix)
 * - A short (≤120 characters) description of the project
 * - Use relevant tags to categorize the site (read the tag descriptions on the
 *   https://docusaurus.io/showcase page and some further clarifications below)
 * - Add a local image preview (decent screenshot of the Docusaurus site)
 * - The image MUST be added to the GitHub repository, and use `require("img")`
 * - The image has to have minimum width 640 and an aspect of no wider than 2:1
 * - If a website is open-source, add a source link. The link should open
 *   to a directory containing the `docusaurus.config.js` file
 * - Resize images: node admin/scripts/resizeImage.js
 * - Run optimizt manually (see resize image script comment)
 * - Open a PR and check for reported CI errors
 *
 * Example PR: https://github.com/facebook/docusaurus/pull/7620
 */

// LIST OF AVAILABLE TAGS
// Available tags to assign to a showcase site
// Please choose all tags that you think might apply.
// We'll remove inappropriate tags, but it's less likely that we add tags.
export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favorites
  //| "favorite"
  //
  "object_detection" | "python" | "depth_estimation" | "control";

// Add sites to this list
// prettier-ignore
const Users: User[] = [
  {
    title: 'Yolov5 Operator',
    description: 'Yolov5 object detection operator',
    preview: '/img/agilets.png',
    website: 'yolov5_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/yolov5_op.py',
    tags: ['object_detection', 'python'],
  },
  {
    title: 'Plot Operator',
    description: 'Plot operator based on cv2',
    preview: '/img/agilets.png',
    website: 'plot_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/plot.py',
    tags: ['python'],
  },
  {
    title: 'PID Operator',
    description: 'PID controller',
    preview: '/img/agilets.png',
    website: 'pid_control_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/pid_control_op.py',
    tags: ['python', "control"],
  },
  {
    title: 'Obstacle Location Operator',
    description: 'Obstacle location based on LIDAR and 2D bounding boxes',
    preview: '/img/agilets.png',
    website: 'obstacle_location_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/obstacle_location_op.py',
    tags: ['python'],
  },
  {
    title: 'GPS Operator',
    description: 'Waypoint generation based on current position and a opendrive map.',
    preview: '/img/agilets.png',
    website: 'obstacle_location_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/carla/gps_op.py',
    tags: ['python'],
  },
  {
    title: 'FOT Operator',
    description: 'Waypoint generation based on current position and frenet optimal trajectory planner.',
    preview: '/img/agilets.png',
    website: 'obstacle_location_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/carla/gps_op.py',
    tags: ['python'],
  },
  {
    title: 'YOLOP Operator',
    description: 'YOLOP lane and drivable area detection',
    preview: '/img/agilets.png',
    website: 'yolovp_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/yolop_op.py',
    tags: ['object_detection', 'python'],
  },
  {
    title: 'MiDaS Operator',
    description: 'MiDaS depth estimation',
    preview: '/img/agilets.png',
    website: 'midas_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/midas_op.py',
    tags: ['depth_estimation', 'python'],
  },
  {
    title: 'Webcam Operator',
    description: 'Webcam Operator',
    preview: '/img/agilets.png',
    website: 'webcam_operator',
    source: 'https://github.com/dora-rs/dora-drives/blob/main/operators/webcam_op.py',
    tags: ['python'],
  },

  /*
  Pro Tip: add your site in alphabetical order.
  Appending your site here (at the end) is more likely to produce Git conflicts.
   */
];

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string | null;
  tags: TagType[];
};

export type Tag = {
  label: string;
  description: string;
  color: string;
};

export const Tags: { [type in TagType]: Tag } = {
  //favorite: {
  //label: translate({ message: "Favorite" }),
  //description: translate({
  //message:
  //"Our favorite Docusaurus sites that you must absolutely check out!",
  //id: "showcase.tag.favorite.description",
  //}),
  //color: "#e9669e",
  //},

  object_detection: {
    label: translate({ message: "object detection" }),
    description: translate({
      message: "Open-Source Docusaurus sites can be useful for inspiration!",
      id: "showcase.tag.opensource.description",
    }),
    color: "#39ca30",
  },

  python: {
    label: translate({ message: "Python" }),
    description: translate({
      message: "Docusaurus sites associated to a commercial product!",
      id: "showcase.tag.product.description",
    }),
    color: "#dfd545",
  },

  control: {
    label: translate({ message: "Control" }),
    description: translate({
      message:
        "Beautiful Docusaurus sites, polished and standing out from the initial template!",
      id: "showcase.tag.design.description",
    }),
    color: "#a44fb7",
  },

  depth_estimation: {
    label: translate({ message: "Depth Esimation" }),
    description: translate({
      message:
        "Translated Docusaurus sites using the internationalization support with more than 1 locale.",
      id: "showcase.tag.i18n.description",
    }),
    color: "#127f82",
  },

  //versioning: {
  //label: translate({ message: "Versioning" }),
  //description: translate({
  //message:
  //"Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.",
  //id: "showcase.tag.versioning.description",
  //}),
  //color: "#fe6829",
  //},

  //large: {
  //label: translate({ message: "Large" }),
  //description: translate({
  //message:
  //"Very large Docusaurus sites, including many more pages than the average!",
  //id: "showcase.tag.large.description",
  //}),
  //color: "#8c2f00",
  //},

  //meta: {
  //label: translate({ message: "Meta" }),
  //description: translate({
  //message: "Docusaurus sites of Meta (formerly Facebook) projects",
  //id: "showcase.tag.meta.description",
  //}),
  //color: "#4267b2", // Facebook blue
  //},

  //personal: {
  //label: translate({ message: "Personal" }),
  //description: translate({
  //message:
  //"Personal websites, blogs and digital gardens built with Docusaurus",
  //id: "showcase.tag.personal.description",
  //}),
  //color: "#14cfc3",
  //},

  //rtl: {
  //label: translate({ message: "RTL Direction" }),
  //description: translate({
  //message:
  //"Docusaurus sites using the right-to-left reading direction support.",
  //id: "showcase.tag.rtl.description",
  //}),
  //color: "#ffcfc3",
  //},
};

export const TagList = Object.keys(Tags) as TagType[];
function sortUsers() {
  let result = Users;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  return result;
}

export const sortedUsers = sortUsers();
