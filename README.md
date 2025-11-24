# fo76-mutations

Calculates the effects of mutations in the video game Fallout 76. Mutations have overlapping effects, and they're modified by perks like Strange in Numbers and Class Freak.

## Setup

- mutations.json has a list of all mutations; it doesn't need to be modified
- player.json contains the player state including active mutations and perks; this is where you can make changes
   - inactiveMutations is not used (can keep unused mutations here)
   - `Team` is the number of teammates including yourself; use `0` for solo

## Usage

Run the python script

    python3 mutations.py

Or run the JavaScript script

    node mutations.js

Compare the output of the two

    diff <(python3 mutations.py) <(node mutations.js)
