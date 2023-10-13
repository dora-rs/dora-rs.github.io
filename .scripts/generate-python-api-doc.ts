import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

const templatePath = path.join(__dirname, '../docs/.templates/python-api.md');
const targetPath = path.join(__dirname, '../docs/api/python-api.md');
const template = fs.readFileSync(templatePath, 'utf8');

interface Module {
  name: string;
  methods: string[];
}

const modules: Module[] = [
  { name: 'Node', methods: ['next', '__next__', 'send_output', 'dataflow_descriptor', "merge_external_events"] },
];

let doc = template;

for (const module of modules) {
  for (let i = 0; i < module.methods.length; i++) {
    const method = module.methods[i];

    const output = childProcess
      .execSync(
        `python -c "import dora; print(dora.${module.name}.${method}.__doc__)"`
      )
      .toString()
      .split('\n');
    output.splice(-1);

    doc = doc.replace(`{${module.name}.${method}}`, output.join('\n'));
  }
  const output = childProcess
    .execSync(`python -c "import dora; print(dora.${module.name}.__doc__)"`)
    .toString()
    .split('\n');
  output.splice(-1);
  doc = doc.replace(`{${module.name}}`, output.join('\n'));
}

fs.writeFileSync(targetPath, doc);
