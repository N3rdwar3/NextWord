# NextWord

This app brings to life a word game I have played in my head since I was a kid. The concept is simple: start with one word, and by making one-letter modifications at a time, arrive at a final target word.

## Game Rules

You can perform three operations on a word:

1. **Add a letter**: Insert a letter anywhere in the word.
2. **Remove a letter**: Remove a letter from anywhere in the word.
3. **Swap a letter**: Replace one letter with another.

## Example: Transforming 'the' into 'were'

Here is a step-by-step example of how the game works:

1. **T H E**
2. **T H E M** (Added an M to the end, **Rule 1**)
3. **T H E M E** (Added an E to the end, **Rule 1**)
4. **T H E R E** (Swapped the M for an R, **Rule 3**)
5. **W H E R E** (Swapped the T for a W, **Rule 3**)
6. **W E R E** (Dropped the H, **Rule 2**)

## How to Play

1. Start with a given word (e.g., "the").
2. Use the rules above to transform the word step by step.
3. Aim to reach the target word (e.g., "were") in as few moves as possible.
4. Each move must follow one of the three allowed operations.

c.
---

Have fun transforming words one letter at a time!


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
