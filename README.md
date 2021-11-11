# NaNoGenMo

## How to use

```sh
# Clone
git clone git@github.com:g-ongenae/NaNoGenMo.git
cd NaNoGenMo

# Install
npm install

# Add your Twitter API key to your shell
export TWITTER_API_KEY="<insert your api key>"

# Run with options
npx ts-node ./index.ts --word "<insert your french word here>"

# Open the book generated
open ./result.txt
```

## CLI Options

- `word` (or `w`) specify the word to use to start the generation of the book
- `target` (or `t`) change the path of the file generated
- `length` (or `l`) change the number of words to be written

## Idea

The idea behind this book-generator is in the middle of a _cadavre exquis_ and a game which I can't remember the name
(which I always play by starting with "Flûte de pan, pan de terre, terre de feu").
