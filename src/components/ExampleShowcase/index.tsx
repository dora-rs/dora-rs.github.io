/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import Translate, { translate } from "@docusaurus/Translate";
import { useHistory, useLocation } from "@docusaurus/router";
import { usePluralForm } from "@docusaurus/theme-common";

import Link from "@docusaurus/Link";
import FavoriteIcon from "@site/src/components/svgIcons/FavoriteIcon";
import {
  Tags,
  TagList,
  sortedExamples,
  sortedNodes,
  type User,
  type TagType,
} from "@site/src/data/users";
import Heading from "@theme/Heading";
import ShowcaseTagSelect, {
  readSearchTags,
} from "./_components/ShowcaseTagSelect";
import ShowcaseFilterToggle, {
  type Operator,
  readOperator,
} from "./_components/ShowcaseFilterToggle";
import ShowcaseCard from "./_components/ShowcaseCard";
import ShowcaseTooltip from "./_components/ShowcaseTooltip";

import styles from "./styles.module.css";
import { CategoriesNodes, CategoriesExamples } from "../../data/users";

const SUBMIT_NODE_URL =
  "https://github.com/dora-rs/dora-rs.github.io/blob/main/src/data/nodes.json";

const SUBMIT_EXAMPLE_URL =
  "https://github.com/dora-rs/dora-rs.github.io/blob/main/src/data/examples.json";

type UserState = {
  scrollTopPosition: number;
  focusedElementId: string | undefined;
};

function restoreUserState(userState: UserState | null) {
  const { scrollTopPosition, focusedElementId } = userState ?? {
    scrollTopPosition: 0,
    focusedElementId: undefined,
  };
  // @ts-expect-error: if focusedElementId is undefined it returns null
  document.getElementById(focusedElementId)?.focus();
  window.scrollTo({ top: scrollTopPosition });
}

export function prepareUserState(): UserState | undefined {
  if (ExecutionEnvironment.canUseDOM) {
    return {
      scrollTopPosition: window.scrollY,
      focusedElementId: document.activeElement?.id,
    };
  }

  return undefined;
}

const SearchNameQueryKey = "name";

function readSearchName(search: string) {
  return new URLSearchParams(search).get(SearchNameQueryKey);
}

function filterUsers(
  users: User[],
  selectedTags: TagType[],
  operator: Operator,
  searchName: string | null
) {
  if (searchName) {
    // eslint-disable-next-line no-param-reassign
    users = users.filter((user) =>
      user.title.toLowerCase().includes(searchName.toLowerCase())
    );
  }
  if (selectedTags.length === 0) {
    return users;
  }
  return users.filter((user) => {
    if (user.tags.length === 0) {
      return false;
    }
    if (operator === "AND") {
      return selectedTags.every((tag) => user.tags.includes(tag));
    }
    return selectedTags.some((tag) => user.tags.includes(tag));
  });
}

function useFilteredUsers(sortedExamples: User[]) {
  const location = useLocation<UserState>();
  const [operator, setOperator] = useState<Operator>("OR");
  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [searchName, setSearchName] = useState<string | null>(null);
  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client
  // hydration mismatch)
  useEffect(() => {
    setSelectedTags(readSearchTags(location.search));
    setOperator(readOperator(location.search));
    setSearchName(readSearchName(location.search));
    restoreUserState(location.state);
  }, [location]);

  return useMemo(
    () => filterUsers(sortedExamples, selectedTags, operator, searchName),
    [selectedTags, operator, searchName]
  );
}

function ShowcaseHeader({ text, url }: { text: string; url: string }) {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Link className="button button--primary" to={url}>
        {text}
      </Link>
    </section>
  );
}

function useSiteCountPlural() {
  const { selectMessage } = usePluralForm();
  return (sitesCount: number) =>
    selectMessage(
      sitesCount,
      translate(
        {
          id: "showcase.filters.resultCount",
          description:
            'Pluralized label for the number of sites found on the showcase. Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: "1 site|{sitesCount} sites",
        },
        { sitesCount }
      )
    );
}

function ShowcaseFilters({ sortedExamples }: { sortedExamples: User[] }) {
  const filteredUsers = useFilteredUsers(sortedExamples);
  const siteCountPlural = useSiteCountPlural();
  return (
    <section className="container margin-top--l margin-bottom--lg">
      <div className={clsx("margin-bottom--sm", styles.filterCheckbox)}>
        <div>
          <Heading as="h2">
            <Translate id="showcase.filters.title">Filters</Translate>
          </Heading>
          <span>{siteCountPlural(filteredUsers.length)}</span>
        </div>
        <ShowcaseFilterToggle />
      </div>
      <ul className={clsx("clean-list", styles.checkboxList)}>
        {TagList.map((tag, i) => {
          const { label, description, color } = Tags[tag];
          const id = `showcase_checkbox_id_${tag}`;

          return (
            <li key={i} className={styles.checkboxListItem}>
              <ShowcaseTooltip
                id={id}
                text={description}
                anchorEl="#__docusaurus"
              >
                <ShowcaseTagSelect
                  tag={tag}
                  id={id}
                  label={label}
                  icon={
                    tag === "favorite" ? (
                      <FavoriteIcon svgClass={styles.svgIconFavoriteXs} />
                    ) : (
                      <span
                        style={{
                          backgroundColor: color,
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          marginLeft: 8,
                        }}
                      />
                    )
                  }
                />
              </ShowcaseTooltip>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(readSearchName(location.search));
  }, [location]);
  return (
    <div className={styles.searchContainer}>
      <input
        id="searchbar"
        placeholder={translate({
          message: "Search for site name...",
          id: "showcase.searchBar.placeholder",
        })}
        value={value ?? undefined}
        onInput={(e) => {
          setValue(e.currentTarget.value);
          const newSearch = new URLSearchParams(location.search);
          newSearch.delete(SearchNameQueryKey);
          if (e.currentTarget.value) {
            newSearch.set(SearchNameQueryKey, e.currentTarget.value);
          }
          history.push({
            ...location,
            search: newSearch.toString(),
            state: prepareUserState(),
          });
          setTimeout(() => {
            document.getElementById("searchbar")?.focus();
          }, 0);
        }}
      />
    </div>
  );
}

function ShowcaseCards({
  sortedExamples,
  Categories,
}: {
  sortedExamples: User[];
  Categories: String[];
}) {
  const filteredUsers = useFilteredUsers(sortedExamples);

  if (filteredUsers.length === 0) {
    return (
      <section className="margin-top--lg margin-bottom--xl">
        <div className="container padding-vert--md text--center">
          <Heading as="h2">
            <Translate id="showcase.usersList.noResult">No result</Translate>
          </Heading>
          <SearchBar />
        </div>
      </section>
    );
  }

  return (
    <section className="margin-top--lg margin-bottom--xl">
      <div className="container">
        <div
          className={clsx("margin-bottom--md", styles.showcaseFavoriteHeader)}
        >
          <SearchBar />
        </div>
        <div>
          {Categories.map((category) => {
            let categoryUsers = filteredUsers.filter(
              (user) => user.category == category
            );
            if (categoryUsers.length === 0) {
              return null;
            }
            return (
              <div>
                <Heading as="h2" id={"#" + category}>
                  {category}
                </Heading>
                <ul className={clsx("clean-list", styles.showcaseList)}>
                  {categoryUsers.map((user) => (
                    <ShowcaseCard key={user.title} user={user} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function NodeShowcase(): JSX.Element {
  return (
    <div>
      <ShowcaseHeader url={SUBMIT_NODE_URL} text="Showcase your nodes 🔥" />
      <ShowcaseFilters sortedExamples={sortedNodes} />
      <ShowcaseCards
        sortedExamples={sortedNodes}
        Categories={CategoriesNodes}
      />
    </div>
  );
}

export default function ExampleShowcase(): JSX.Element {
  return (
    <div>
      <ShowcaseHeader url={SUBMIT_NODE_URL} text="Showcase your examples 🔥" />
      <ShowcaseFilters sortedExamples={sortedExamples} />
      <ShowcaseCards
        sortedExamples={sortedExamples}
        Categories={CategoriesExamples}
      />
    </div>
  );
}
