import * as path from "path";
import * as fs from "fs";
import nodess from "../src/data/nodes.json";
import { URL } from "url";
import * as https from "https";
import * as http from "http";

export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favorites
  //| "favorite"
  //
  "python" | "depth" | "control" | "rust" | "audio" | "video" | "image";
export type User = {
  title: string;
  description: string;
  preview: string | null;
  author: string | null;
  github: string | null;
  downloads: string | null;
  last_commit: string | null;
  last_release: string | null;
  license: string | null;
  install: string | null;
  category: string | null;
  website: string;
  source: string;
  tags: TagType[];
};

function getFileNameFromURL(urlString: string): string {
  const url = new URL(urlString);
  const filePath = url.pathname;
  return path.parse(filePath).name;
}
function downloadFile(url, targetPath, visited = new Set()) {
  const protocol = url.startsWith("https") ? https : http;

  protocol
    .get(url, (response) => {
      if (
        response.statusCode >= 300 &&
        response.statusCode < 400 &&
        response.headers.location
      ) {
        const redirectUrl = response.headers.location;

        if (visited.has(redirectUrl)) {
          console.error(`Redirect loop detected to ${redirectUrl}`);
          return;
        }

        visited.add(redirectUrl);
        downloadFile(redirectUrl, targetPath, visited);
      } else if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetPath);
        response.pipe(fileStream);

        fileStream.on("finish", () => {
          fileStream.close();
        });

        fileStream.on("error", (err) => {
          console.error(`Error writing to file: ${err.message}`);
          fileStream.close();
          fs.unlink(targetPath, () => {
            console.log("Incomplete file deleted.");
          });
        });
      } else {
        console.error(
          url + `: Failed to download file. HTTP Status: ${response.statusCode}`
        );
        response.resume(); // Consume response data to free up memory
      }
    })
    .on("error", (err) => {
      console.error(`Request error: ${err.message}`);
    });
}

const nodes: User[] = nodess as User[];

nodess.map((node) => {
  const module_name = getFileNameFromURL(node.source + "/README.md?raw=true");
  const targetPath = path.join(__dirname, `../docs/nodes/${node.website}.md`);
  // Download the file from the URL and put it in the target.
  downloadFile(node.source + "/README.md?raw=true", targetPath);
});
