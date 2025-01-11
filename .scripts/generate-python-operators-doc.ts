import * as childProcess from "child_process";
import * as path from "path";
import * as fs from "fs";

const templatePath = path.join(
  __dirname,
  "../docs/.templates/python-operator.md"
);
import * as Users from "../src/data/operators.json";
import { URL } from "url";

function replaceWithEmptyString(value: any): string {
  if ( value == 'None') {
    return '';
  }
  return value;
}

function getFileNameFromURL(urlString: string): string {
  const url = new URL(urlString);
  const filePath = url.pathname;
  return path.parse(filePath).name;
}

const template = fs.readFileSync(templatePath, "utf8");

export type TagType =
  // DO NOT USE THIS TAG: we choose sites to add to favorites
  //| "favorite"
  //
  "object_detection" | "python" | "depth_estimation" | "control";

export type User = {
  title: string;
  description: string;
  preview: string | null; // null = use our serverless screenshot service
  website: string;
  source: string;
  tags: TagType[];
};

const usersArray: User[] = Users as User[];


// Modify Env variable
const env: NodeJS.ProcessEnv = {};

// Place previous env variable
for (const key in process.env) {
  env[key] = process.env[key];
}

env["PYTHONPATH"] = `${process.env["PYTHONPATH"]}:../dora-drives/operators`;

for (const op of usersArray) {
  let doc = template;
  console.log(`Generating: ${op.title}`);
  const module_name = getFileNameFromURL(op.source);
  const targetPath = path.join(
    __dirname,
    `../docs/nodes_operators/${module_name}.md`
  );
  var methods = ["__init__", "on_event", "on_input"];

  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];

    // Get docstring
    const output = childProcess
      .execSync(
        `python -c "import ${module_name} ; print(${module_name}.Operator.${method}.__doc__)"`,
        { env: env }
      )
      .toString()
      .split("\n");
    output.splice(-1);
    doc = doc.replace(`{op.${method}}`, replaceWithEmptyString(output.join("\n")));

    // Get source code
    const output_source_code = childProcess
      .execSync(
        `python -c "import ${module_name}; import inspect; print(inspect.getsource(${module_name}.Operator.${method}))"`,
        { env: env }
      )
      .toString()
      .split("\n");
    output.splice(-1);

    doc = doc.replace(
      `{op.${method}.source_code}`,
      output_source_code.join("\n")
    );
  }
  const output = childProcess
    .execSync(
      `python -c "import ${module_name}; print(${module_name}.__doc__)"`,
      { env: env }
    )
    .toString()
    .split("\n");
  output.splice(-1);
  doc = doc.replace(`{op}`, replaceWithEmptyString(output.join("\n")));

  fs.writeFileSync(targetPath, doc);
}
