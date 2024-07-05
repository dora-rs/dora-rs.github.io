import { exec } from "child_process";
import { rm } from "fs/promises";

// Define the folder and file paths
const outDir = "out";
const staticFile = "static/python-api.html";

// Define the system commands
const commands = [
  "pdoc dora.dora -o out",
  "cp out/dora/dora.html static/python-api.html",
];

// Function to execute a command and return a Promise
const execCommand = (command: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command "${command}":`, error);
        reject(error);
        return;
      }

      if (stderr) {
        console.error(
          `Standard error output for command "${command}":`,
          stderr
        );
        reject(stderr);
        return;
      }

      console.log(`Standard output for command "${command}":`, stdout);
      resolve();
    });
  });
};

// Function to remove a directory or file if it exists
const removeIfExists = async (path: string): Promise<void> => {
  try {
    await rm(path, { recursive: true, force: true });
    console.log(`Removed ${path}`);
  } catch (error) {
    console.error(`Error removing ${path}:`, error);
  }
};

const run = async (): Promise<void> => {
  try {
    // Remove the output directory if it exists
    await removeIfExists(outDir);

    // Execute each command in sequence
    for (const command of commands) {
      await execCommand(command);
    }

    // Remove the output directory again after the commands have run
    await removeIfExists(outDir);
  } catch (error) {
    console.error("Error during execution:", error);
  }
};

// Run the main function
run();
