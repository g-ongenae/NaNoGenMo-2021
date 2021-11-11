/** End punctuation characters to add at the end of a sentence or a part of a sentence */
export const END_PUNCTUATION: string[] = [
  // Punctuations without space before it
  "… ",
  ", ",
  // simple dot should be present more often than other punctuations
  ". ",
  ". ",
  ". ",
  ". ",
  // Punctuations with space before and after it
  " ? ",
  " ! ",
  " ; ",
  " : ",
  " - "
];

/** RegExp to match end of sentence */
export const RE_END_SENTENCE: RegExp = /\n|\?|\.{1,}|\!|…/gi;

/**
 * Get the last readable word of the sentence
 * @param sentence the sentence to get the last word from
 * @param defaultWord the default last word if empty string or other errors
 * @returns the last word of the sentence
 */
export function getLastWord(sentence: string, defaultWord: string): string {
  const text: string[] = sentence?.split("\b");
  for (let i: number = text.length - 1; i >= 0; i++) {
    if (/^\w+$/.test(text[i])) {
      return text[i];
    }
  }
  return defaultWord;
}
