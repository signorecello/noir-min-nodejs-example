# Minimal Noir project for a nodejs environment

## How to run this

1. `npm i` to install dependencies

2. `nargo compile main` to generate your circuit in ACIR format. You should get a folder called `target` with `main.json` inside. Feel free to use whatever name, as long as you update the import in `ts/index.ts`.

3. `npm run start` to transpile your code to `js` and run it
