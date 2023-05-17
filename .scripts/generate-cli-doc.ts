import * as childProcess from "child_process";
import * as path from "path";
import * as fs from "fs";

const rustCliPath = path.join(__dirname, "../../dora/target/release/dora-cli");
const templatePath = path.join(__dirname, "../docs/.templates/cli.md");
const targetPath = path.join(__dirname, "../docs/api/cli.md");
const template = fs.readFileSync(templatePath, "utf8");

const commands: string[] = [
  "",
  "up",
  "new",
  "list",
  "start",
  "logs",
  "check",
  "stop",
  "destroy",
  "graph",
  "--version",
];

let doc = template;

for (const cmd of commands) {
  const output = childProcess
    .execSync(`${rustCliPath} ${cmd} --help`)
    .toString()
    .split("\n");
  output.splice(-1);
  doc = doc.replace(`{${cmd}}`, "```\n" + output.join("\n") + "\n```");
}

fs.writeFileSync(targetPath, doc);
