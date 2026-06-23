const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = fs.realpathSync.native(path.resolve(__dirname, ".."));
const tsBuildInfo = path.join(projectRoot, "tsconfig.tsbuildinfo");
const tscBin = path.join(projectRoot, "node_modules", "typescript", "bin", "tsc");

fs.rmSync(tsBuildInfo, { force: true });
process.chdir(projectRoot);

const result = spawnSync(process.execPath, [tscBin, "--noEmit"], {
  cwd: projectRoot,
  env: {
    ...process.env,
    INIT_CWD: projectRoot,
    PWD: projectRoot
  },
  stdio: "inherit"
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
