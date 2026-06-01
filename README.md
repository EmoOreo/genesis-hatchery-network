# Project Genesis: Hatchery Network

A standalone browser prototype for a lore-friendly Project Genesis web/playable-style game.

## What This Is

You are the Genetic Custodian of **Genesis Hatchery Node-7**, a remote breeding and archival facility inside the larger Genesis network.

The game focuses on:

- Creature breeding
- Trait inheritance
- Mutation discovery
- Incubation
- Archive completion
- Habitat/research upgrades
- Local browser save data

## How To Run

Open `index.html` in a browser.

No install, server, database, YouTube Playables program, or paid hosting is required.

## How To Play

1. Select two adult creatures.
2. Click **Breed Selected Pair**.
3. Run facility cycles until eggs hatch.
4. Discover new traits, mutations, species, and anomalies.
5. Spend research data on upgrades.
6. Transfer extra creatures for DNA.
7. Fill the Archive.

## Deployment Options

### Itch.io

1. Zip the contents of this folder.
2. Create a new itch.io project.
3. Set kind to **HTML**.
4. Upload the zip.
5. Enable "This file will be played in the browser."

### GitHub Pages

1. Create a GitHub repository.
2. Upload these files.
3. Go to Settings → Pages.
4. Deploy from the main branch.
5. Open the generated Pages URL.

## Files

```text
index.html
style.css
game.js
README.md
```

## Notes

This is an MVP/prototype. It is designed to be expanded with:

- Real creature art
- More species
- More genes
- Expedition events
- Creature card export/share
- Sound effects
- Story logs
- Better balancing


## Duelyst Asset Integration

This version includes a curated OpenDuelyst-derived asset pass: animated creature GIFs, selected icons, and selected FX assets for hatching, mutation, anomaly, and archive presentation. See `DUELYST_INTEGRATION.md`.


## Tier 1C + Tier 2A UX/Layout Patch

This build includes broken-icon cleanup, grouped Archive display, improved incubation cards with projected creature previews, research benefit descriptions, and mobile section navigation. See `TIER_1C_2A_UX_LAYOUT.md`.


## Tier 2B Gameplay Clarity

Adds Node Directive progression guidance, repairs remaining section icon artifacts, improves active mobile section navigation, and prepares the game for Tier 3 genetics visualization. See `TIER_2B_GAMEPLAY_CLARITY.md`.
