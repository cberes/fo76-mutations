import json
import multiprocessing as mp
from dataclasses import dataclass
from typing import Any, Self

@dataclass
class Effect:
  effect: str
  diff: float
  type: str = '#' # or '%'
  team: bool | None = None
  ignore_class_freak: bool = False

  @classmethod
  def from_json(cls, json_dict: Any) -> Self:
    effect = json_dict['effect']
    diff = json_dict['diff']
    instance = cls(effect, diff)
    if (type := json_dict.get('type')) is not None:
      instance.type = type
    if (team := json_dict.get('team')) is not None:
      instance.team = team
    if (ignore_class_freak := json_dict.get('ignoreClassFreak')) is not None:
      instance.ignore_class_freak = ignore_class_freak
    return instance

@dataclass
class Mutation:
  name: str
  positive: list[Effect]
  negative: list[Effect]

  @classmethod
  def from_json(cls, json_dict: Any) -> Self:
    name = json_dict['name']
    positive = [Effect.from_json(x) for x in json_dict['positive']]
    negative = [Effect.from_json(x) for x in json_dict['negative']]
    return cls(name, positive, negative)

type Condition = tuple[str, int]

class Player:
  def __init__(self, mutations: list[Mutation], active_mutations: set[str], conditions: list[Condition]):
    self.mutations = [x for x in mutations if x.name in active_mutations]
    self.conditions = conditions
    self.effects: dict[str, float] = {
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
    }

    # TODO have to consider positive/negative effects separately for class freak & strange in numbers
    def is_team_match(e: Effect) -> bool:
      on_team = not ('Team', 0) in self.conditions
      return e.team is None or e.team == on_team
    current_effects = [(e.effect, e.diff) for m in self.mutations for e in m.positive if e.type == '#' and is_team_match(e)]
    [self.add_effect(x, True) for x in current_effects]
    current_effects = [(e.effect, e.diff) for m in self.mutations for e in m.negative if e.type == '#' and is_team_match(e)]
    [self.add_effect(x, False) for x in current_effects]
    current_effects = [(e.effect, e.diff) for m in self.mutations for e in m.positive if e.type == '%' and is_team_match(e)]
    [self.multiply_effect(x, True) for x in current_effects]
    current_effects = [(e.effect, e.diff) for m in self.mutations for e in m.negative if e.type == '%' and is_team_match(e)]
    [self.multiply_effect(x, False) for x in current_effects]
  
  def add_effect(self, xyz: tuple[str, float], positive: bool) -> None:
    effect, diff = xyz
    diff = self.adjust_difference(diff, positive)
    if not effect in self.effects:
      self.effects[effect] = 0.0
    self.effects[effect] += diff
  
  def multiply_effect(self, xyz: tuple[str, float], positive: bool) -> None:
    effect, diff = xyz
    diff = self.adjust_difference(diff, positive)
    if not effect in self.effects:
      self.effects[effect] = 0.0
    self.effects[effect] *= diff

  def adjust_difference(self, diff: float, positive: bool) -> float:
    class_freak = self.apply_class_freak() if not positive else 1.0
    strange = self.apply_strange_in_numbers() if positive else 1.0
    return diff * class_freak * strange

  def apply_class_freak(self) -> float:
    class_freak = next((x[1] for x in self.conditions if x[0] == 'Class Freak'), 0)
    match class_freak:
      case 1:
        return 0.75
      case 2:
        return 0.5
      case 3:
        return 0.25
      case _:
        return 1.0

  def apply_strange_in_numbers(self) -> float:
    # TODO need a way to know if teammates are mutated
    teammates = next((x[1] for x in self.conditions if x[0] == 'Team'), 0)
    match teammates:
      case 0 | 1:
        return 1.0
      case _:
        return 1.25
  
  def print_effects(self) -> None:
    for effect in self.effects.items():
      print(f'{effect[0]}: {effect[1]}')

def read_json_file(filename: str) -> Any:
  with open(filename, 'r') as file:
    return json.load(file)

def simulate() -> None:
  with mp.Pool() as pool:
    mutationData, playerData = pool.map(read_json_file, ['mutations.json', 'player.json'])

  active_mutations: set[str] = set(playerData['mutations'])
  conditions: dict[str, int] = playerData["conditions"]
  mutations: list[Mutation] = [Mutation.from_json(x) for x in mutationData]

  player = Player(mutations, active_mutations, list(conditions.items()))
  player.print_effects()

if __name__ == "__main__":
  simulate()
