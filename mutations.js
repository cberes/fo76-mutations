const fs = require('fs').promises;

const classFreak = [
  1.0,
  0.75,
  0.5,
  0.25
];

const strangeInNumbers = [
  1.0,
  1.25
];

function initialEffects() {
  return {
    'DMG per kill while on a Kill Streak': 5.0,
    'Meat Benefits': 1.0,
    'Plant Benefits': 1.0,
    'Critical Damage': 1.0,
    'Teammate Damage Taken': 1.0,
    'Damage Taken': 1.0,
    'Energy Damage': 1.0,
    'Health Regeneration': 1.0,
    'Chem effects': 1.0,
    'Movement Spped': 1.0,
    'Reload Speed': 1.0,
    'Hunger': 1.0,
    'Thirst': 1.0,
    'Fist Damage': 1.0,
    'Melee Damage': 1.0,
    'Cripple Limb Chance': 1.0,
    'Gun Accurary': 1.0
  };
}

class Player {
  constructor(mutations, activeMutations, conditions) {
    this.mutations = mutations.filter(({ name }) => activeMutations.includes(name));
    this.conditions = conditions;
    this.mutate();
  }

  mutate() {
    const isTeamMatch = it => it.team === undefined || it.team === (this.conditions['Team'] || 0) > 0;

    let effects = this.mutations.flatMap(it => it.positive)
      .filter(it => (it.type || '#') === '#' && isTeamMatch(it));
    let tempEffects = effects.reduce((acc, cur) => this.addEffect(acc, cur, true), initialEffects());

    effects = this.mutations.flatMap(it => it.negative)
      .filter(it => (it.type || '#') === '#' && isTeamMatch(it));
    tempEffects = effects.reduce((acc, cur) => this.addEffect(acc, cur, false), tempEffects);

    effects = this.mutations.flatMap(it => it.positive)
      .filter(it => it.type === '%' && isTeamMatch(it));
    tempEffects = effects.reduce((acc, cur) => this.addEffect(acc, cur, true), tempEffects);

    effects = this.mutations.flatMap(it => it.negative)
      .filter(it => it.type === '%' && isTeamMatch(it));
    this.effects = effects.reduce((acc, cur) => this.addEffect(acc, cur, false), tempEffects);
  }

  addEffect(effects, item, positive) {
    if (!(item.effect in effects)) {
      effects[item.effect] = 0.0;
    }

    const diff = this.calculateDifference(item.diff, positive);
    if (item.type === '%') {
      effects[item.effect] *= diff;
    } else {
      effects[item.effect] += diff;
    }
    return effects;
  }

  calculateDifference(diff, positive) {
    const classFreakMultipler = positive ? 1.0 : classFreak[this.conditions['Class Freak' || 0]];
    const strangeMultipler = positive ? strangeInNumbers[this.conditions['Strange in Numbers' || 0]] : 1.0;
    return diff * classFreakMultipler * strangeMultipler;
  }
  
  printEffects() {
    Object.keys(this.effects).forEach(key => console.log(`${key}: ${this.effects[key]}`));
  }
}

async function main() {
  try {
    const [mutationData, playerData] = await Promise.all([
      fs.readFile('mutations.json', 'utf8'),
      fs.readFile('player.json', 'utf8'),
    ]);

    const mutations = JSON.parse(mutationData);
    const { mutations: activeMutations, conditions } = JSON.parse(playerData);

    const player = new Player(mutations, activeMutations, conditions);
    player.printEffects();
  } catch (err) {
    console.error('Error reading files:', err);
  }
}

if (require.main === module) {
  main();
}
