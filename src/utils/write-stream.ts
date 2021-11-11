import { WriteStream } from "fs";
import { Stream } from "stream";

/**
 * Wait for an event to be emitted by a stream but async
 * @param stream the stream to wait on
 * @param event the event to wait for
 * @returns a void promise
 */
const waitOn = (stream: Stream, event: string): Promise<void> =>
  new Promise((resolve: () => void): void => {
    stream.once(event, () => resolve);
  });

/**
 * A simple handler for the write stream function
 *
 * Handles stream drains
 * @param data data to write to the stream
 * @returns a void promise
 */
export async function writeOn(
  stream: WriteStream,
  data: string
): Promise<void> {
  if (!stream.write(data)) {
    return waitOn(stream, "drain");
  }
}
