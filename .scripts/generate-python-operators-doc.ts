import * as childProcess from "child_process";
import * as path from "path";
import * as fs from "fs";

const templatePath = path.join(
  __dirname,
  "../docs/.templates/python-operator.md"
);
import * as Operators from "../src/data/operators.json";
const template = fs.readFileSync(templatePath, "utf8");

const modules = [
  { name: "Node", methods: ["next", "__next__", "send_output"] },
];

let doc = template;

// Modify Env variable
const env: NodeJS.ProcessEnv = {};

// Place previous env variable
for (const key in process.env) {
  env[key] = process.env[key];
}

env["PYTHONPATH"] = "../dora-drives/operators";

const operators: string[] = [];
const methods: string[] = [];

for (const op of operators) {
  const targetPath = path.join(__dirname, `../docs/nodes_operators/${op}.md`);
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];

    const output = childProcess
      .execSync(
        `python -c "import dora; print(${op}.Operator.${method}.__doc__)"`,
        { env: env }
      )
      .toString()
      .split("\n");
    output.splice(-1);

    doc = doc.replace(`{${op}.Operator.${method}}`, output.join("\n"));
  }
  const output = childProcess
    .execSync(`python -c "import dora; print(dora.${op}.Operator.__doc__)"`)
    .toString()
    .split("\n");
  output.splice(-1);
  doc = doc.replace(`{${modules[0].name}}`, output.join("\n"));
  fs.writeFileSync(targetPath, doc);
}
