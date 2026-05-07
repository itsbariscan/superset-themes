#!/usr/bin/env bun
import { Glob } from "bun";
import Ajv from "ajv/dist/2020";
import addFormats from "ajv-formats";
import { schema } from "../packages/schema/index.ts";

const args = process.argv.slice(2);
const patterns = args.length > 0 ? args : ["themes/**/*.json"];

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const cwd = process.cwd();
const files: string[] = [];
for (const pattern of patterns) {
  const glob = new Glob(pattern);
  for await (const file of glob.scan({ cwd, absolute: false })) {
    files.push(file);
  }
}

if (files.length === 0) {
  console.log("No theme files found.");
  process.exit(0);
}

let failed = 0;
const idsSeen = new Map<string, string>();

for (const file of files.sort()) {
  const data = await Bun.file(file).json();
  const ok = validate(data);
  if (!ok) {
    failed++;
    console.log(`\x1b[31m✗\x1b[0m ${file}`);
    for (const err of validate.errors ?? []) {
      console.log(`    ${err.instancePath || "/"} ${err.message}`);
    }
    continue;
  }
  const id = (data as { id: string }).id;
  if (idsSeen.has(id)) {
    failed++;
    console.log(`\x1b[31m✗\x1b[0m ${file}: duplicate id "${id}" (also in ${idsSeen.get(id)})`);
    continue;
  }
  idsSeen.set(id, file);
  console.log(`\x1b[32m✓\x1b[0m ${file} (${id})`);
}

console.log(`\n${files.length - failed}/${files.length} themes valid.`);
process.exit(failed === 0 ? 0 : 1);
