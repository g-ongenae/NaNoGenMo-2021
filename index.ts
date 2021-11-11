import { main } from "./src";

main()
  .then((res: string) => {
    console.log(`Success, your book has been written to ${res}`);
  })
  .catch((err: Error) => {
    console.error("Unknown error");
    throw err;
  });
