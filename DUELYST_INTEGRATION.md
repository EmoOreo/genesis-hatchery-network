# Duelyst Asset Integration Pass

This build integrates the curated OpenDuelyst-derived asset pack into Genesis Hatchery Network.

## Added

- `assets/duelyst/creatures/`
  - Animated breathing GIFs for creature cards and incubation previews.
- `assets/duelyst/icons/`
  - Curated icons for eggs, mutation energy, research, traits, frost anomalies, and containment.
- `assets/duelyst/fx/`
  - Selected FX atlases used as event burst images.

## Game Changes

- Creature cards now show animated specimen GIFs.
- Eggs now show a projected creature preview.
- Mutation/anomaly/research/hatch FX now point at the Duelyst-derived effect/icon set.
- Card badges include small trait/mutation/anomaly icon strips.

## Notes

The full OpenDuelyst repository should not be committed into this project. This build only includes a small curated set needed for the browser game.

OpenDuelyst was released under CC0-1.0. Keep source/license notes with the project for tracking even where attribution is not required.
