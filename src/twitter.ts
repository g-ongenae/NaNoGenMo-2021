import TwitterApi, {
  TweetSearchRecentV2Paginator,
  TweetV2,
  Tweetv2SearchParams,
  TwitterApiReadOnly
} from "twitter-api-v2";
import { getRandomElementIn, waitTrue } from "./utils";

/**
 * Connect a Twitter API instance in ReadOnly mode
 *
 * Should only be used once
 * @returns a twitter API instance
 */
function connectToTwitter(): TwitterApiReadOnly {
  // Ensure API key is defined
  const apiKey: string = process.env.TWITTER_API_KEY ?? "";
  if (apiKey === "") {
    throw new Error("No TWITTER_API_KEY in the environment variables");
  }

  // Instantiate a new Twitter API Client (using Bearer v2 auth)
  const twitterClient = new TwitterApi(apiKey);

  // Limit it to readonly
  return twitterClient.readOnly;
}

/**
 * Get a Twitter API instance in ReadOnly mode
 * @returns a twitter API instance
 */
const getTwitterApi = (): TwitterApiReadOnly =>
  TWITTER_CLIENT ?? connectToTwitter();

/** Twitter Client in Readonly mode */
const TWITTER_CLIENT: TwitterApiReadOnly = getTwitterApi();

/**
 * Filter tweets by lang to only have the french ones
 * @param tweets a list of tweets
 * @returns french tweets
 */
const filterFrenchTweets = (tweets: TweetV2[]): TweetV2[] =>
  tweets.filter(({ lang }) => /fr/.test(lang));

/**
 * Catch and ignore errors
 * @param search a twitter search object
 * @returns the result of a twitter search object (even in case of failure)
 */
async function safeNext(
  search: TweetSearchRecentV2Paginator
): Promise<TweetSearchRecentV2Paginator> {
  try {
    return search.next();
  } catch (err) {
    console.error(`Error fetching next tweets: ${err}`);

    // Returns the same object to be able to create a new search request
    return search;
  }
}

/**
 * Get tweets in French
 * @param twitter twitter client
 * @param word the word searched
 * @returns french tweets
 */
async function getFrenchTweets(paginatedSearch: TweetSearchRecentV2Paginator) {
  // Filter by lang (french)
  let tweetsInFrench: TweetV2[] = [];

  // Retry 20 times / until french tweets are found with the word
  for (
    let callsLimit: number = 20;
    callsLimit > 0 && tweetsInFrench.length === 0 && (await waitTrue());
    callsLimit--, paginatedSearch = await safeNext(paginatedSearch)
  ) {
    tweetsInFrench = filterFrenchTweets(paginatedSearch.tweets);
  }

  return tweetsInFrench;
}

/** Twitter Client options to ensure that the lang is present in the tweets */
const TWEET_OPTIONS: Partial<Tweetv2SearchParams> = {
  "tweet.fields": "lang"
};

/**
 * Get a random tweet content (text) containing the word given
 * @param word the word to search tweets with
 * @returns a tweet content
 */
export async function getRandomTweetTextWithWord(
  word: string
): Promise<string> {
  // Get twitter client
  const twitter: TwitterApiReadOnly = getTwitterApi();

  // Create the search for the word on twitter
  const search: TweetSearchRecentV2Paginator = await twitter.search(
    word,
    TWEET_OPTIONS
  );

  // Search the word on twitter
  const tweetsInFrench: TweetV2[] = await getFrenchTweets(search);

  // Returns a random tweet or an empty string if no tweets found
  return getRandomElementIn(tweetsInFrench)?.text ?? "";
}
