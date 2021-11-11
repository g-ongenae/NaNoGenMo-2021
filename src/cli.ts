import minimist from "minimist";
import { Opts } from "./Book";

/** Parameters to pass in the CLI */
const CLI_OPTIONS: minimist.Opts = {
  string: ["word", "target", "length"],
  alias: {
    word: "w",
    target: "t",
    length: "l"
  },
  default: {
    target: "./result.txt",
    length: "50000"
  }
};

/** Params got from the CLI */
type CliResult = Omit<Opts, "length"> & {
  /** Target length of the book, default: 50000 */
  length: string;
};

/**
 * Get and validate the CLI Params to generate book
 * @returns the params to call the book generation
 */
export function getCliParams(): Opts {
  const argv: string[] = process.argv.slice(2);
  const cli = (minimist(argv, CLI_OPTIONS) as unknown) as CliResult;

  // Ensure word is defined
  if (!cli.word) {
    console.error("No word provided, add --word <word>");
    process.exit(1);
  }

  return {
    word: cli.word,
    target: cli.target,
    length: parseInt(cli.length, 10)
  };
}
