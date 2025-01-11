/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
// import Image from "@theme/IdealImage";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import {
  Tags,
  TagList,
  type TagType,
  type User,
  type Tag,
} from "@site/src/data/users";
import { sortBy } from "@site/src/utils/jsUtils";
import Heading from "@theme/Heading";
import Tooltip from "../ShowcaseTooltip";
import styles from "./styles.module.css";
import CodeBlock from "@theme/CodeBlock";

const TagComp = React.forwardRef<HTMLLIElement, Tag>(
  ({ label, color, description }, ref) => (
    <li ref={ref} className={styles.tag} title={description}>
      <span className={styles.textLabel}>{label.toLowerCase()}</span>
      <span className={styles.colorLabel} style={{ backgroundColor: color }} />
    </li>
  )
);

function ShowcaseCardTag({ tags }: { tags: TagType[] }) {
  const tagObjects = tags.map((tag) => ({ tag, ...Tags[tag] }));

  // Keep same order for all tags
  const tagObjectsSorted = sortBy(tagObjects, (tagObject) =>
    TagList.indexOf(tagObject.tag)
  );

  return (
    <>
      {tagObjectsSorted.map((tagObject, index) => {
        const id = `showcase_card_tag_${tagObject.tag}`;

        return (
          <Tooltip
            key={index}
            text={tagObject.description}
            anchorEl="#__docusaurus"
            id={id}
          >
            <TagComp key={index} {...tagObject} />
          </Tooltip>
        );
      })}
    </>
  );
}

function getCardImage(user: User): string {
  return user.preview;
}

function getFileNameFromURL(urlString: string): string {
  const url = new URL(urlString);
  const filePath = url.pathname;
  return filePath.split("/").at(-1);
}

function ShowcaseCard({ user }: { user: User }) {
  const image = getCardImage(user);

  const module_name = user.source;
  return (
    <li key={user.title} className="card shadow--md">
      <div className={clsx("card__image", styles.showcaseCardImage)}>
        {user.preview && (
          <Link
            href={module_name}
            className={styles.showcaseCardLink}
            style={{ height: "150px", display: "flex" }}
          >
            <img src={user.preview} style={{ margin: "auto" }} alt=" " />
          </Link>
        )}
        {user.preview == null && (
          <h2 className={styles.showcaseCardHeaderNoImage}>{user.title}</h2>
        )}
      </div>
      <div className="card__body">
        <div className={clsx(styles.showcaseCardHeader)}>
          <Heading as="h4" className={styles.showcaseCardTitle}>
            <Link href={module_name} className={styles.showcaseCardLink}>
              {user.title}
            </Link>
            {user.author && (
              <em style={{ color: "grey" }}> by {user.author}</em>
            )}
          </Heading>
          {user.tags.includes("favorite") && (
            <FavoriteIcon svgClass={styles.svgIconFavorite} size="small" />
          )}
          {user.source && (
            <Link
              href={user.source}
              className={clsx(
                "button button--secondary button--sm",
                styles.showcaseCardSrcBtn
              )}
            >
              <img src="/img/github.svg" width="20px"></img>
            </Link>
          )}
        </div>
        <p className={styles.showcaseCardBody}>{user.description}</p>
        {user.install && (
          <div>
            <details>
              <summary>
                <em>Try it with...</em>
              </summary>
              <CodeBlock language="yaml">{user.install}</CodeBlock>
            </details>
          </div>
        )}
      </div>
      <ul className={clsx("card__footer", styles.cardFooter)}>
        <div>
          {user.downloads && (
            <img className="margin-right--sm" src={user.downloads}></img>
          )}
          {user.last_commit && (
            <img
              className="margin-right--sm"
              alt="GitHub last commit"
              src={user.last_commit}
            ></img>
          )}
          {user.last_release && (
            <img
              className="margin-right--sm"
              alt="GitHub last release"
              src={user.last_release}
            ></img>
          )}
          {user.license && (
            <img
              className="margin-right--sm"
              alt="GitHub license"
              src={user.license}
            ></img>
          )}
        </div>
        <div>
          <ShowcaseCardTag tags={user.tags} />
        </div>
      </ul>
    </li>
  );
}

export default React.memo(ShowcaseCard);
