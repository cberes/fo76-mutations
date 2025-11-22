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
//     Minor damage to player during the radiation blast

const mutations = [
    {
        name: 'Adrenal Reaction',
        positive: [
            { effect: 'DMG per kill while on a Kill Streak', diff: 1.05, type: '%' }
        ],
        negative: [
            { effect: 'Max HP', diff: -50 }
        ]
    },
    {
        name: 'Bird Bones',
        positive: [
            { effect: 'AGI', diff: 4 },
            { effect: 'Fall from heights more gradually', diff: 1 }
        ],
        negative: [
            { effect: 'STR', diff: -4 },
            { effect: 'Limb Damage', diff: 10000000 }
        ]
    },
    {
        name: 'Carnivore',
        positive: [
            { effect: 'Meat Benefits', diff: 1, type: '%' }
        ],
        negative: [
            { effect: 'Plant Benefits', diff: -1, type: '%' }
        ]
    },
    {
        name: 'Herbivore',
        positive: [
            { effect: 'Plant Benefits', diff: 1, type: '%' }
        ],
        negative: [
            { effect: 'Meat Benefits', diff: -1, type: '%' }
        ]
    },
    {
        name: 'Chameleon',
        positive: [
            { effect: 'Invisibility in combat if unarmored and standing still', diff: 10000000 }
        ],
        negative: []
    },
    {
        name: 'Eagle Eyes',
        positive: [
            { effect: 'Critical Damage', diff: 1.5, type: '%' },
            { effect: 'PER', diff: 4 }
        ],
        negative: [
            { effect: 'STR', diff: -4 }
        ]
    },
    {
        name: 'Egg Head',
        positive: [
            { effect: 'INT', diff: -6 }
        ],
        negative: [
            { effect: 'STR', diff: -3 },
            { effect: 'END', diff: -3 }
        ]
    },
    {
        name: 'Electrically Charged',
        positive: [
            { effect: 'Chance to shock melee attackers', diff: 10000000 }
        ],
        negative: [
            { effect: 'Small amount of damage done to player', diff: 10000000 }
        ]
    },
    {
        name: 'Empath',
        positive: [
            { effect: 'Teammate Damage Taken', diff: -0.25, type: '%' }
        ],
        negative: [
            { effect: 'Damage Taken', diff: 1.33, type: '%' }
        ]
    },
    {
        name: 'Grounded',
        positive: [
            { effect: 'Energy Resistance', diff: 100 }
        ],
        negative: [
            { effect: 'Energy Damage', diff: -0.5, type: '%' }
        ]
    },
    {
        name: 'Healing Factor',
        positive: [
            { effect: 'Health Regeneration', diff: 3, type: '%' }
        ],
        negative: [
            { effect: 'Chem effects', diff: -0.55, type: '%' }
        ]
    },
    {
        name: 'Herd Mentality',
        positive: [
            { effect: 'STR', diff: 2, team: true },
            { effect: 'PER', diff: 2, team: true },
            { effect: 'END', diff: 2, team: true },
            { effect: 'CHR', diff: 2, team: true },
            { effect: 'INT', diff: 2, team: true },
            { effect: 'AGI', diff: 2, team: true },
            { effect: 'LCK', diff: 2, team: true }
        ],
        negative: [
            { effect: 'STR', diff: -2, solo: true },
            { effect: 'PER', diff: -2, solo: true },
            { effect: 'END', diff: -2, solo: true },
            { effect: 'CHR', diff: -2, solo: true },
            { effect: 'INT', diff: -2, solo: true },
            { effect: 'AGI', diff: -2, solo: true },
            { effect: 'LCK', diff: -2, solo: true }
        ]
    },
    {
        name: 'Marsupial',
        positive: [
            { effect: 'Carry Weight', diff: 20 },
            { effect: 'Jump Height', diff: 1 }
        ],
        negative: [
            { effect: 'INT', diff: -4 }
        ]
    },
    {
        name: 'Plague Walker',
        positive: [
            { effect: 'Poison Aura', diff: 1 }
        ],
        negative: []
    },
    {
        name: 'Scaly Skin',
        positive: [
            { effect: 'Damage Resistance', diff: 50 },
            { effect: 'Energy Resistance', diff: 50 }
        ],
        negative: [
            { effect: 'Max AP', diff: -50 }
        ]
    },
    {
        name: 'Speed Demon',
        positive: [
            { effect: 'Movement Spped', diff: 1.2, type: '%' },
            { effect: 'Reload Speed', diff: 1.2, type: '%' }
        ],
        negative: [
            { effect: 'Hunger', diff: 1.5, type: '%', ignoreClassFreak: true },
            { effect: 'Thirst', diff: 1.5, type: '%', ignoreClassFreak: true }
        ]
    },
    {
        name: 'Talons',
        positive: [
            { effect: 'Fist Damage', diff: 1.25, type: '%' }
        ],
        negative: [
            { effect: 'AGI', diff: -4 }
        ]
    },
    {
        name: 'Twisted Muscles',
        positive: [
            { effect: 'Melee Damage', diff: 1.25, type: '%' },
            { effect: 'Cripple Limb Chance', diff: 1.5, type: '%' } // TODO IDK what the real value is
        ],
        negative: [
            { effect: 'Gun Accurary', diff: -0.5, type: '%' },
        ]
    },
    {
        name: 'Unstable Isotope',
        positive: [
            { effect: 'Medium chance to release a radiation blast when struck in melee', diff: 1 }
        ],
        negative: [
            { effect: 'Minor damage to player during the radiation blast', diff: 1 }
        ]
    }
];

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

console.log(JSON.stringify(mutations));

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
