import { createWriteStream, WriteStream } from "fs";
import { getRandomTweetTextWithWord } from "./twitter";
import {
  END_PUNCTUATION,
  getLastWord,
  getRandomElementIn,
  RE_END_SENTENCE,
  writeOn
} from "./utils";

export interface Opts {
  /** First and default word to use as the search parameter */
  word: string;
  /** Path to write the book at */
  target: string;
  /** Target length of the book */
  length: number;
}

export class Book {
  /** First and default word to use as the search parameter */
  private readonly word: string;

  /** Stream to write the book at */
  private readonly stream: WriteStream;

  /** Length of the text to be generated */
  private readonly maxLength: number;

  /**
   * Book - call `book.generate()` to create the book
   * @param opts options for the book generation
   */
  constructor({ word, target, length }: Opts) {
    this.stream = createWriteStream(target);
    this.word = word;
    this.maxLength = length;
  }

  /**
   * Generate the book at the provided target position
   */
  public async generate(): Promise<void> {
    /** Current length of the generated book */
    let length: number = 0;
    /** Current word to use as the search parameter */
    let currentSearchWord: string = this.word;

    while (length < this.maxLength) {
      const tweet: string = await getRandomTweetTextWithWord(currentSearchWord);
      const sentence: string =
        getRandomElementIn(tweet.split(RE_END_SENTENCE)) ?? "";
      currentSearchWord = getLastWord(tweet, this.word);
      length += sentence.split("\b").length;
      await writeOn(
        this.stream,
        sentence + getRandomElementIn(END_PUNCTUATION)
      );
    }
  }
}
