import { Book } from "./Book";
import { getCliParams } from "./cli";

/**
 * Exec the book generation and pass the CLI params
 * @returns the path where the book has been written
 */
export async function main(): Promise<string> {
  // Get args from the CLI call
  const cli = getCliParams();

  // Create and generate book
  const book: Book = new Book(cli);
  await book.generate();

  return cli.target;
}
