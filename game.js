/* Project Genesis: Hatchery Network
   Self-contained local browser prototype.
   No server needed. Saves to localStorage.
*/

const SAVE_KEY = "project_genesis_hatchery_node7_v1";

const FX_ASSETS = {
  hatch: "assets/duelyst/fx/fx_bigfirehitspark.png",
  mutation: "assets/duelyst/fx/fx_beamtesla.png",
  anomaly: "assets/duelyst/fx/f6_flashfreeze.png",
  research: "assets/duelyst/icons/bossspell_ancientknowledge.png",
  transfer: "assets/particles/smoke_09.png",
  creature: "assets/duelyst/fx/fx_animalslash.png"
};

const DUELYST_CREATURES = [
  "boss_crystal_breathing.gif",
  "boss_invader_breathing.gif",
  "boss_legion_breathing.gif",
  "boss_grym_breathing.gif",
  "boss_borealjuggernaut_breathing.gif",
  "boss_serpenti_breathing.gif",
  "boss_shadowlord_breathing.gif",
  "boss_wraith_breathing.gif",
  "boss_vampire_breathing.gif",
  "boss_umbra_breathing.gif",
  "boss_skyfalltyrant_breathing.gif",
  "neutral_saberspinemk2_breathing.gif"
];

const GENESIS_SPECIES_GIFS = {
  "Dune Raptor": "boss_serpenti_breathing.gif",
  "Forest Grazer": "boss_harmony_breathing.gif",
  "Marsh Stalker": "boss_sandpanther_breathing.gif",
  "Saberfang": "neutral_saberspinemk2_breathing.gif",
  "Direwolf": "boss_grym_breathing.gif",
  "Thunderhorn": "boss_borealjuggernaut_breathing.gif",
  "Frost Mammoth": "boss_borealjuggernaut_breathing.gif",
  "Ember Drake": "boss_skyfalltyrant_breathing.gif",
  "Void Panther": "boss_shadowlord_breathing.gif"
};

const GENESIS_ICON_ASSETS = {
  egg: "assets/duelyst/icons/generalspell_f5_egg.png",
  mutation: "assets/duelyst/icons/artifact_f2_unboundedenergyamulet.png",
  research: "assets/duelyst/icons/bossspell_ancientknowledge.png",
  resilience: "assets/duelyst/icons/artifact_f5_irridiumscale.png",
  vitality: "assets/duelyst/icons/artifact_f5_eternalheart.png",
  predator: "assets/duelyst/icons/artifact_f5_twinfang.png",
  frost: "assets/duelyst/icons/artifact_f6_frostbiter.png",
  containment: "assets/duelyst/icons/icon_f1_aegisbarrier.png"
};

function getCreatureVisual(c) {
  const base = GENESIS_SPECIES_GIFS[c.species] || DUELYST_CREATURES[Math.abs(hashString(c.species || c.name)) % DUELYST_CREATURES.length];
  let file = base;
  if (c.anomaly) {
    const anomalyMap = {
      "Crystalback": "boss_crystal_breathing.gif",
      "Hollowmane": "boss_wraith_breathing.gif",
      "Thunderblood": "boss_invader_breathing.gif",
      "Eclipseborn": "boss_shadowlord_breathing.gif",
      "Primal Reversion": "boss_legion_breathing.gif"
    };
    file = anomalyMap[c.anomaly] || file;
  } else if (c.mutation === "Giant") {
    file = "boss_legion_breathing.gif";
  } else if (c.mutation === "Melanistic") {
    file = "boss_umbra_breathing.gif";
  }
  return `assets/duelyst/creatures/${file}`;
}

function hashString(value) {
  return String(value).split("").reduce((acc, ch) => ((acc << 5) - acc + ch.charCodeAt(0)) | 0, 0);
}

const speciesCatalog = {
  "Dune Raptor": { icon: "△", color: "#d8a45f", class: "Saurian", tier: 1 },
  "Forest Grazer": { icon: "◒", color: "#78c679", class: "Grazer", tier: 1 },
  "Marsh Stalker": { icon: "◈", color: "#4fb7a8", class: "Predator", tier: 1 },
  "Saberfang": { icon: "♢", color: "#c9c2b6", class: "Predator", tier: 2 },
  "Direwolf": { icon: "◇", color: "#a7b2c5", class: "Predator", tier: 2 },
  "Thunderhorn": { icon: "⬟", color: "#b88f55", class: "Grazer", tier: 2 },
  "Frost Mammoth": { icon: "⬢", color: "#d7ecff", class: "Grazer", tier: 3 },
  "Ember Drake": { icon: "✦", color: "#ff8c4a", class: "Saurian", tier: 3 },
  "Void Panther": { icon: "◆", color: "#6d5dfc", class: "Predator", tier: 3 }
};

const patterns = ["Plain", "Stripe", "Spotted", "Crested", "Ghost Stripe", "Ringback"];
const colors = ["Amber", "Slate", "Crimson", "Ivory", "Moss", "Onyx", "Azure"];
const temperaments = ["Docile", "Alert", "Bold", "Skittish", "Dominant"];
const mutations = [
  { name: "Melanistic", rarity: "Rare" },
  { name: "Albino", rarity: "Rare" },
  { name: "Giant", rarity: "Rare" },
  { name: "Miniature", rarity: "Rare" },
  { name: "Crystalback", rarity: "Anomaly" },
  { name: "Hollowmane", rarity: "Anomaly" },
  { name: "Thunderblood", rarity: "Anomaly" },
  { name: "Eclipseborn", rarity: "Anomaly" },
  { name: "Primal Reversion", rarity: "Legendary" }
];

let state = defaultState();

function defaultState() {
  return {
    dna: 120,
    food: 90,
    data: 15,
    habitatLevel: 1,
    research: { mutation: 1, incubation: 1, habitat: 1 },
    selected: [],
    cycle: 1,
    log: [],
    creatures: [
      makeCreature("Dune Raptor", { name: "Ashclaw", gender: "F" }),
      makeCreature("Dune Raptor", { name: "Siltfang", gender: "M" }),
      makeCreature("Forest Grazer", { name: "Mossbell", gender: "F" }),
      makeCreature("Marsh Stalker", { name: "Reedshade", gender: "M" })
    ],
    eggs: [],
    archive: []
  };
}

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function id() { return Math.random().toString(36).slice(2, 10); }

function makeCreature(species, overrides = {}) {
  const data = speciesCatalog[species];
  return {
    id: id(),
    name: overrides.name || generateName(),
    species,
    class: data.class,
    gender: overrides.gender || randomFrom(["M", "F"]),
    generation: overrides.generation || 1,
    age: overrides.age || "Adult",
    strength: overrides.strength || randInt(2, 7),
    speed: overrides.speed || randInt(2, 7),
    resilience: overrides.resilience || randInt(2, 7),
    pattern: overrides.pattern || randomFrom(patterns.slice(0, 3)),
    color: overrides.color || randomFrom(colors.slice(0, 4)),
    temperament: overrides.temperament || randomFrom(temperaments),
    mutation: overrides.mutation || null,
    anomaly: overrides.anomaly || null,
    portrait: overrides.portrait || null
  };
}

function generateName() {
  const a = ["Ash", "Night", "Moss", "Ember", "Ghost", "Frost", "Reed", "Stone", "Sable", "Dawn", "Iron", "Vale"];
  const b = ["fang", "claw", "mane", "shade", "horn", "stripe", "crest", "pelt", "heart", "back", "eye", "tail"];
  return randomFrom(a) + randomFrom(b);
}

function populationCap() {
  return 4 + state.habitatLevel * 2 + state.research.habitat * 2;
}

function addLog(message) {
  state.log.unshift(`Cycle ${state.cycle}: ${message}`);
  state.log = state.log.slice(0, 24);
}

function archiveDiscovery(kind, value) {
  const key = `${kind}: ${value}`;
  if (!state.archive.includes(key)) {
    state.archive.push(key);
    addLog(`Archive updated — ${key}.`);
  }
}

function updateArchiveForCreature(c) {
  archiveDiscovery("Species", c.species);
  archiveDiscovery("Pattern", c.pattern);
  archiveDiscovery("Color", c.color);
  if (c.mutation) archiveDiscovery("Mutation", c.mutation);
  if (c.anomaly) archiveDiscovery("Anomaly", c.anomaly);
}

function load() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (raw) {
    try {
      state = JSON.parse(raw);
    } catch {
      state = defaultState();
    }
  }
  state.creatures.forEach(updateArchiveForCreature);
  if (!state.log.length) addLog("Node-7 interface restored. Genetic Custodian recognized.");
  render();
}

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  addLog("Facility state saved to local browser storage.");
  render();
}

function resetSave() {
  if (!confirm("Reset Hatchery Node-7 save data?")) return;
  localStorage.removeItem(SAVE_KEY);
  state = defaultState();
  state.creatures.forEach(updateArchiveForCreature);
  addLog("Facility reset complete. Starter bloodlines restored.");
  render();
}

function runCycle() {
  state.cycle += 1;
  const foodGain = 18 + state.habitatLevel * 8;
  const dnaGain = 12 + state.creatures.length * 3;
  const dataGain = 4 + state.eggs.length;

  state.food += foodGain;
  state.dna += dnaGain;
  state.data += dataGain;

  state.eggs.forEach(e => e.progress += 1 + state.research.incubation);
  const ready = state.eggs.filter(e => e.progress >= e.required);
  state.eggs = state.eggs.filter(e => e.progress < e.required);

  for (const egg of ready) {
    if (state.creatures.length >= populationCap()) {
      state.dna += 30;
      addLog(`${egg.child.name} was transferred to an allied preserve due to habitat capacity. +30 DNA.`);
    } else {
      state.creatures.push(egg.child);
      updateArchiveForCreature(egg.child);
      addLog(`${egg.child.name} hatched: ${egg.child.species}, ${egg.child.color}, ${egg.child.pattern}.`);
      triggerFX("hatch", `${egg.child.name} hatched`);
      if (egg.child.mutation) { addLog(`Rare mutation expressed: ${egg.child.mutation}.`); triggerFX("mutation", `Rare mutation: ${egg.child.mutation}`); }
      if (egg.child.anomaly) { addLog(`GENESIS ANOMALY detected: ${egg.child.anomaly}.`); triggerFX("anomaly", `GENESIS ANOMALY: ${egg.child.anomaly}`); }
    }
  }

  maybeUnlockSpecies();
  addLog(`Facility cycle complete. +${dnaGain} DNA, +${foodGain} food, +${dataGain} data.`);
  render();
}

function maybeUnlockSpecies() {
  const unlocked = new Set(state.archive.filter(x => x.startsWith("Species:")).map(x => x.replace("Species: ", "")));
  const count = unlocked.size;

  if (count >= 2 && !unlocked.has("Saberfang")) unlockCreature("Saberfang");
  if (count >= 3 && !unlocked.has("Direwolf")) unlockCreature("Direwolf");
  if (state.archive.length >= 14 && !unlocked.has("Thunderhorn")) unlockCreature("Thunderhorn");
  if (state.archive.length >= 24 && !unlocked.has("Frost Mammoth")) unlockCreature("Frost Mammoth");
  if (state.archive.length >= 32 && !unlocked.has("Ember Drake")) unlockCreature("Ember Drake");
  if (state.archive.length >= 40 && !unlocked.has("Void Panther")) unlockCreature("Void Panther");
}

function unlockCreature(species) {
  if (state.creatures.length < populationCap()) {
    const c = makeCreature(species, { generation: 1 });
    state.creatures.push(c);
    updateArchiveForCreature(c);
    addLog(`Unknown DNA signature stabilized. ${species} added to Node-7.`);
  }
}

function breedSelected() {
  if (state.selected.length !== 2) {
    addLog("Breeding rejected. Select exactly two adult specimens.");
    render();
    return;
  }

  if (state.creatures.length + state.eggs.length >= populationCap() + 3) {
    addLog("Incubation rejected. Facility capacity pressure too high.");
    return;
  }

  const a = state.creatures.find(c => c.id === state.selected[0]);
  const b = state.creatures.find(c => c.id === state.selected[1]);

  if (!a || !b) return;
  if (a.gender === b.gender) {
    addLog("Breeding rejected. Pair requires one male and one female specimen.");
    return;
  }

  const cost = 25 + Math.floor((a.generation + b.generation) * 3);
  if (state.food < cost) {
    addLog(`Insufficient food for pairing. Required: ${cost}.`);
    return;
  }

  state.food -= cost;
  const child = inheritCreature(a, b);
  const egg = {
    id: id(),
    parentA: a.name,
    parentB: b.name,
    child,
    progress: 0,
    required: Math.max(2, 7 - state.research.incubation)
  };
  state.eggs.push(egg);
  state.selected = [];
  addLog(`Incubation started: ${a.name} × ${b.name}.`);
  triggerFX("hatch", "Incubation started");
  render();
}

function inheritCreature(a, b) {
  const species = chooseSpecies(a, b);
  const child = makeCreature(species, {
    name: generateName(),
    generation: Math.max(a.generation, b.generation) + 1,
    strength: inheritStat(a.strength, b.strength),
    speed: inheritStat(a.speed, b.speed),
    resilience: inheritStat(a.resilience, b.resilience),
    pattern: maybeMutateTrait(randomFrom([a.pattern, b.pattern]), patterns),
    color: maybeMutateTrait(randomFrom([a.color, b.color]), colors),
    temperament: randomFrom([a.temperament, b.temperament, randomFrom(temperaments)])
  });

  applyMutation(child);
  return child;
}

function chooseSpecies(a, b) {
  if (a.species === b.species) return a.species;

  const classes = [a.class, b.class].sort().join("+");
  if (classes.includes("Predator") && state.archive.length > 10) return randomFrom(["Saberfang", "Direwolf", "Marsh Stalker"]);
  if (classes.includes("Grazer") && state.archive.length > 16) return randomFrom(["Forest Grazer", "Thunderhorn"]);
  if (classes.includes("Saurian") && state.archive.length > 28) return randomFrom(["Dune Raptor", "Ember Drake"]);

  return randomFrom([a.species, b.species]);
}

function inheritStat(x, y) {
  const base = Math.round((x + y) / 2);
  return Math.max(1, Math.min(10, base + randInt(-1, 1)));
}

function maybeMutateTrait(current, pool) {
  const chance = 0.08 + state.research.mutation * 0.025;
  return Math.random() < chance ? randomFrom(pool) : current;
}

function applyMutation(c) {
  const chance = 0.09 + state.research.mutation * 0.035;
  if (Math.random() > chance) return;

  const roll = Math.random();
  let possible = mutations.filter(m => m.rarity === "Rare");
  if (roll > 0.78) possible = mutations.filter(m => m.rarity === "Anomaly");
  if (roll > 0.96) possible = mutations.filter(m => m.rarity === "Legendary");

  const m = randomFrom(possible);
  if (m.rarity === "Anomaly" || m.rarity === "Legendary") c.anomaly = m.name;
  else c.mutation = m.name;

  if (m.name === "Giant") { c.strength += 2; c.resilience += 1; }
  if (m.name === "Miniature") { c.speed += 2; }
  if (m.name === "Thunderblood") { c.speed += 2; c.strength += 1; }
  if (m.name === "Primal Reversion") { c.strength += 2; c.speed += 2; c.resilience += 2; }
}

function toggleSelect(creatureId) {
  if (state.selected.includes(creatureId)) {
    state.selected = state.selected.filter(x => x !== creatureId);
  } else {
    if (state.selected.length >= 2) state.selected.shift();
    state.selected.push(creatureId);
  }
  render();
}

function releaseCreature(creatureId) {
  if (state.creatures.length <= 2) {
    addLog("Release denied. Node-7 requires at least two living specimens.");
    return;
  }
  const c = state.creatures.find(x => x.id === creatureId);
  state.creatures = state.creatures.filter(x => x.id !== creatureId);
  state.selected = state.selected.filter(x => x !== creatureId);
  const reward = 15 + c.generation * 2;
  state.dna += reward;
  addLog(`${c.name} transferred to preserve network. +${reward} DNA.`);
  triggerFX("transfer", `${c.name} transferred`);
  render();
}

function upgrade(type) {
  const costs = {
    mutation: 40 + state.research.mutation * 35,
    incubation: 35 + state.research.incubation * 30,
    habitat: 50 + state.research.habitat * 40
  };
  const cost = costs[type];
  if (state.data < cost) {
    addLog(`Insufficient research data. ${type} upgrade requires ${cost}.`);
    return;
  }
  state.data -= cost;
  state.research[type] += 1;
  if (type === "habitat") state.habitatLevel += 1;
  addLog(`${type[0].toUpperCase() + type.slice(1)} research upgraded.`);
  triggerFX("research", "Research upgraded");
  render();
}


function triggerFX(type = "hatch", message = "") {
  const layer = document.getElementById("fxLayer");
  if (!layer) return;
  const burst = document.createElement("div");
  burst.className = "fx-burst";
  burst.style.setProperty("--fx-img", `url("${FX_ASSETS[type] || FX_ASSETS.hatch}")`);
  burst.style.setProperty("--fx-x", `${40 + Math.random() * 20}%`);
  burst.style.setProperty("--fx-y", `${18 + Math.random() * 18}%`);
  layer.appendChild(burst);
  setTimeout(() => burst.remove(), 950);

  if (message) {
    const toast = document.createElement("div");
    toast.className = "fx-toast";
    toast.textContent = message;
    layer.appendChild(toast);
    setTimeout(() => toast.remove(), 1450);
  }
}

function render() {
  document.getElementById("dnaCount").textContent = state.dna;
  document.getElementById("foodCount").textContent = state.food;
  document.getElementById("dataCount").textContent = state.data;
  document.getElementById("habitatLevel").textContent = state.habitatLevel;
  document.getElementById("populationCount").textContent = state.creatures.length;
  document.getElementById("populationCap").textContent = populationCap();
  document.getElementById("archiveCount").textContent = state.archive.length;
  document.getElementById("mutationLevel").textContent = state.research.mutation;
  document.getElementById("incubationLevel").textContent = state.research.incubation;
  document.getElementById("habitatResearchLevel").textContent = state.research.habitat;

  renderLog();
  renderCreatures();
  renderEggs();
  renderArchive();
}

function renderLog() {
  const box = document.getElementById("logBox");
  box.innerHTML = "";
  state.log.forEach(entry => {
    const div = document.createElement("div");
    div.className = "log-entry";
    div.textContent = entry;
    box.appendChild(div);
  });
}

function renderCreatures() {
  const list = document.getElementById("creatureList");
  list.innerHTML = "";
  state.creatures.forEach(c => {
    const card = document.createElement("article");
    card.className = "creature-card" + (state.selected.includes(c.id) ? " selected" : "");
    card.onclick = () => toggleSelect(c.id);

    const data = speciesCatalog[c.species];
    const colorMap = {
      Amber: "#d8a45f", Slate: "#8490a8", Crimson: "#cc4d5a", Ivory: "#f3ead4",
      Moss: "#70a36b", Onyx: "#45475a", Azure: "#4fa3ff"
    };

    const art = document.createElement("div");
    art.className = "creature-art creature-art-animated";
    art.style.setProperty("--creatureColor", colorMap[c.color] || data.color);
    art.style.setProperty("--creatureIcon", `"${data.icon}"`);

    const img = document.createElement("img");
    img.className = "creature-gif";
    img.src = c.portrait || getCreatureVisual(c);
    img.alt = `${c.species} animated specimen`;
    img.loading = "lazy";
    art.appendChild(img);

    const info = document.createElement("div");
    info.className = "creature-info";
    info.innerHTML = `
      <h3>${c.name}</h3>
      <p class="muted">${c.species} · Gen ${c.generation} · ${c.gender}</p>
      <span class="badge">STR ${c.strength}</span>
      <span class="badge">SPD ${c.speed}</span>
      <span class="badge">RES ${c.resilience}</span>
      <span class="badge">${c.color}</span>
      <span class="badge">${c.pattern}</span>
      <span class="badge">${c.temperament}</span>
      ${c.mutation ? `<span class="badge rare">${c.mutation}</span>` : ""}
      ${c.anomaly ? `<span class="badge rare">${c.anomaly}</span>` : ""}
      <div class="mini-icon-row">
        <img src="${GENESIS_ICON_ASSETS.resilience}" alt="Resilience trait" title="Resilience trait" />
        <img src="${GENESIS_ICON_ASSETS.predator}" alt="Predator trait" title="Predator trait" />
        ${c.mutation ? `<img src="${GENESIS_ICON_ASSETS.mutation}" alt="Mutation marker" title="Mutation marker" />` : ""}
        ${c.anomaly ? `<img src="${GENESIS_ICON_ASSETS.frost}" alt="Anomaly marker" title="Anomaly marker" />` : ""}
      </div>
      <button class="small-button" onclick="event.stopPropagation(); releaseCreature('${c.id}')">Transfer</button>
    `;

    card.appendChild(art);
    card.appendChild(info);
    list.appendChild(card);
  });
}

function renderEggs() {
  const list = document.getElementById("eggList");
  list.innerHTML = "";
  if (!state.eggs.length) {
    list.innerHTML = `<p class="muted">No active incubations.</p>`;
    return;
  }

  state.eggs.forEach(e => {
    const div = document.createElement("article");
    div.className = "egg-card";
    const pct = Math.max(0, Math.min(100, Math.round((e.progress / e.required) * 100)));
    div.innerHTML = `
      <h3>Viable Egg</h3>
      <p class="muted">${e.parentA} × ${e.parentB}</p>
      <p>Progress: <b>${e.progress}</b>/<b>${e.required}</b></p>
      <div class="progress-shell"><div class="progress-fill" style="--progress:${pct}%"></div></div>
      <p>Projected Line: ${e.child.species}</p>
    `;
    list.appendChild(div);
  });
}

function renderArchive() {
  const list = document.getElementById("archiveList");
  list.innerHTML = "";
  [...state.archive].sort().forEach(item => {
    const chip = document.createElement("span");
    chip.className = "archive-chip";
    chip.textContent = item;
    list.appendChild(chip);
  });
}

document.getElementById("tickButton").addEventListener("click", runCycle);
document.getElementById("saveButton").addEventListener("click", save);
document.getElementById("resetButton").addEventListener("click", resetSave);
document.getElementById("breedButton").addEventListener("click", breedSelected);
document.getElementById("upgradeMutation").addEventListener("click", () => upgrade("mutation"));
document.getElementById("upgradeIncubation").addEventListener("click", () => upgrade("incubation"));
document.getElementById("upgradeHabitat").addEventListener("click", () => upgrade("habitat"));

load();
