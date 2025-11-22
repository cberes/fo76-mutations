// Adrenal Reaction
//     +5% DMG per kill while on a Kill Streak
//     Max HP -50
// Bird Bones
//     AGI +4, Fall from heights more gradually
//     STR -4, take extra limb damage
// Carnivore
//     Eating meat provides double the hunger satisfaction, HP restoration, and consumable buffs, with no disease chance
//     Eating plant-based food does not satisfy hunger, restore HP, or apply buffs
// Chameleon
//     Invisibility in combat if unarmored and standing still
// Eagle Eyes
//     Critical Damage +50%, PER +4
//     STR -4 
// Egg Head
//     INT +6
//     STR -3, END -3
// Electrically Charged
//     Chance to shock melee attackers
//     Small amount of damage done to player
// Empath
//     Teammates take 25% less damage 
//     Player takes 33% more damage
// Grounded
//     Energy Resistance +100
//     Energy Damage -50%
// Healing Factor
//     Health Regeneration while not in combat +300% (Regardless of hunger level)
//     Chem Effects -55%
// Herbivore
//     Eating plant-based food provides double the hunger satisfaction, HP restoration, and consumable buffs, with no disease chance
//     Eating meat does not satisfy hunger, restore HP, or apply buffs
// Herd Mentality
//     All SPECIAL stats +2 when grouped
//     All SPECIAL stats -2 when solo
// Marsupial
//     Carry Weight +20, +jump height 	INT -4
// Plague Walker
//     Poison aura scaling with your diseases 
//     Only works if you are carrying a disease
// Scaly Skin
//     Damage and Energy Resistance +50
//     AP -50
// Speed Demon
//     Movement speed +20%, faster reload +20%
//     +50% drain on hunger and thirst while moving
// Talons
//     Punching attacks do 25% more damage + bleed damage
//     AGI -4
// Twisted Muscles
//     Melee Damage +25%, better chance to cripple limbs
//     Gun accuracy -50%
// Unstable Isotope
//     Medium chance to release a radiation blast when struck in melee
//     Minor damage to player during the radiation 

const fs = require('fs');

const classFreak = [
  0,
  0.25,
  0.5,
  0.75
];

const strangeInNumbers = [
  0,
  0.25
];

function sumDiffs(diffs) {
  return diffs.reduce((acc, cur) => (acc || 0.0) + cur);
}

function mutate(mutationsPresent, classFreakLevel, strangeInNumbersLevel, isSolo) {
  const mutationsAcquired = mutations.filter(({ name }) => mutationsPresent.includes(name));
  const effects = mutationsAcquired.flatMap(it => it.positive.concat(it.negative));
  const effectsAfterTeamSolo = effects.filter(({ solo, team}) => (solo === undefined  && team === undefined) || solo === isSolo || team === !isSolo);
  const effectsByType = Object.groupBy(effectsAfterTeamSolo, ({ effect }) => effect);
  effectsByType.reduce((acc, cur) => {
    const byType = Objects.groupBy(cur, ({ type }) => type || '#')
    const sum = byType['#'].length ? sumDiffs(byType['#']) : 1;
    const multiplier = byType['%'].length ? sumDiffs(byType['%']) : 1;
    const result = sum * multiplier;
  })
}

function main() {
  fs.readFile('mutations.json', function(err, data) { 
    if (err) {
      throw err;
    }
  
    const mutations = JSON.parse(data); 
    console.log(mutations);
    // TODO do something with mutate
  }); 
}

if (require.main === module) {
  main();
}
