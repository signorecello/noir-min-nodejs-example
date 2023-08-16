# Minimal Noir project for a nodejs environment

## Prerequisites

1. Install [Node.js ≥v18](https://nodejs.org/en) (tested on v18.17.0)

2. Install [noirup](https://noir-lang.org/getting_started/nargo_installation/#option-1-noirup) with

   ```bash
   curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
   ```

3. Install Nargo v0.10.1 with

   ```bash
   noirup -v 0.10.1
   ```

## How to run this

1. `npm i` to install dependencies

2. `nargo compile` to generate your circuit in ACIR format. You should get a folder called `target` with `main.json` inside. Feel free to use whatever name, as long as you update the import in `ts/index.ts`.

3. `npm run start` to transpile your code to `js` and run it
