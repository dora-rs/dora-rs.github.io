/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import { translate } from "@docusaurus/Translate";
import { sortBy } from "@site/src/utils/jsUtils";
import * as Users from "./operators.json";
import * as Examples from "./examples.json";
import * as Nodes from "./nodes.json";
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
  "python" | "depth" | "control" | "rust" | "audio" | "video" | "image";

export const CategoriesNodes = [
  "Camera",
  "Peripheral",
  "Actuator",
  "Chassis",
  "Arm",
  "Robot",
  "Voice Activity Detection",
  "Speech to Text",
  "Object Detection",
  "Vision Language Model",
  "Large Language Model",
  "Vision Language Action",
  "Translation",
  "Text to Speech",
  "Recorder",
  "Visualization",
  "Simulator",
];
export const CategoriesExamples = ["Computer Audition", "Computer Vision"];

export type User = {
  title: string;
  description: string;
  preview: string | null;
  author: string | null;
  github: string | null;
  downloads: string | null;
  install: string | null;
  category: string | null;
  website: string;
  source: string;
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

  image: {
    label: translate({
      id: "showcase.tag.image.tag",
      message: "image",
    }),
    description: translate({
      message: "Computer vision related nodes!",
      id: "showcase.tag.image.description",
    }),
    color: "#39ca30",
  },

  python: {
    label: translate({
      id: "showcase.tag.python.tag",
      message: "python",
    }),
    description: translate({
      message: "Docusaurus sites associated to a commercial product!",
      id: "showcase.tag.python.description",
    }),
    color: "#dfd545",
  },

  rust: {
    label: "rust",
    description: translate({
      message: "Docusaurus sites associated to a commercial product!",
      id: "showcase.tag.rust.description",
    }),
    color: "#333e2e",
  },

  control: {
    label: translate({
      id: "showcase.tag.control.tag",
      message: "control",
    }),
    description: translate({
      message:
        "Beautiful Docusaurus sites, polished and standing out from the initial template!",
      id: "showcase.tag.control.description",
    }),
    color: "#a44fb7",
  },

  depth: {
    label: translate({
      id: "showcase.tag.depth.tag",
      message: "depth",
    }),
    description: translate({
      message:
        "Translated Docusaurus sites using the internationalization support with more than 1 locale.",
      id: "showcase.tag.depth.description",
    }),
    color: "#127f82",
  },

  audio: {
    label: translate({ message: "audio" }),
    description: translate({
      message:
        "Docusaurus sites using the versioning feature of the docs plugin to manage multiple versions.",
      id: "showcase.tag.audio.description",
    }),
    color: "#fe6829",
  },

  text: {
    label: translate({ message: "text" }),
    description: translate({
      message:
        "Very large Docusaurus sites, including many more pages than the average!",
      id: "showcase.tag.large.description",
    }),
    color: "#8c2f00",
  },

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
const usersArray: User[] = Users as User[];
const ExamplesArray: User[] = Examples as User[];
const NodesArray: User[] = Nodes as User[];

function sortUsers() {
  // Fix: adding default fix an issue with webpack.
  let result = usersArray.default;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  return result;
}

export const sortedUsers = sortUsers();

function sortExamples() {
  // Fix: adding default fix an issue with webpack.
  let result = ExamplesArray.default;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  console.log(result);
  return result;
}

export const sortedExamples = sortExamples();

function sortNodes() {
  // Fix: adding default fix an issue with webpack.
  let result = NodesArray.default;
  // Sort by site name
  result = sortBy(result, (user) => user.title.toLowerCase());
  // Sort by favorite tag, favorites first
  result = sortBy(result, (user) => !user.tags.includes("favorite"));
  return result;
}

export const sortedNodes = sortNodes();
