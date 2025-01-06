import * as path from "path";
import * as fs from "fs";
import * as nodes from "../src/data/nodes.json";
import { URL } from "url";
import * as https from "https";
import * as http from "http";

function getFileNameFromURL(urlString: string): string {
  const url = new URL(urlString);
  const filePath = url.pathname;
  return path.parse(filePath).name;
}

function downloadFile(url: string, targetPath: string) {
  const protocol = url.startsWith("https") ? https : http;

  protocol
    .get(url, (response) => {
      if (response.statusCode !== 200) {
        console.log("link not ok");
        return;
      }

      const fileStream = fs.createWriteStream(targetPath);
      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
      });

      fileStream.on("error", (err) => {});
    })
    .on("error", (err) => {});
}

export type TagType =
  | "object_detection"
  | "python"
  | "depth_estimation"
  | "control";

export type User = {
  title: string;
  description: string;
  preview: string | null;
  website: string;
  source: string;
  tags: TagType[];
};

const examplesArray: User[] = nodes as User[];

const env: NodeJS.ProcessEnv = {};

for (const example of examplesArray) {
  const module_name = getFileNameFromURL(example.source);
  const targetPath = path.join(__dirname, `../docs/nodes/${example.title}.md`);
  // Download the file from the URL and put it in the target.
  downloadFile(example.source, targetPath);
  console.log(targetPath);
}
