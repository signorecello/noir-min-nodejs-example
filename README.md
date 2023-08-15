# Minimal Noir project for a nodejs environment

## Prerequisites

1. [Install Node.js ≥v18](https://nodejs.org/en) (tested on v18.17.0)

2. [Install noirup](https://noir-lang.org/getting_started/nargo_installation/#option-1-noirup)

3. Install nightly Nargo with

   ```bash
   noirup -n
   ```

   > If you're later faced with Noir <> ACVM <> bb.js incomaptibility issues, install Nargo from the tested commit instead:
   >
   > 1. [Install Nix](https://noir-lang.org/getting_started/nargo_installation#installing-nix)
   >
   > 2. Install Nargo with
   >
   > ```bash
   > nix profile install github:noir-lang/noir/7d0178987641f5cb8f8e95507c54c3cc367bf7d2
   > ```

## How to run this

1. `npm i` to install dependencies

2. `nargo compile main` to generate your circuit in ACIR format. You should get a folder called `target` with `main.json` inside. Feel free to use whatever name, as long as you update the import in `ts/index.ts`.

3. `npm run start` to transpile your code to `js` and run it
