import unittest
from mutations import simulate, Stat

class StatTest(unittest.TestCase):

  def test_value_empty(self):
    stat = Stat()
    self.assertEqual(stat.value(), 0)

  def test_add(self):
    stat = Stat()
    stat.add(5)
    self.assertEqual(stat.value(), 5.0)

  def test_multiply(self):
    stat = Stat(1)
    stat.multiply(5)
    self.assertEqual(stat.value(), 5.0)

  def test_value(self):
    stat = Stat()
    stat.add(2)
    stat.multiply(5)
    stat.add(3)
    stat.multiply(10)
    self.assertEqual(stat.value(), 250.0)

class PlayerTest(unittest.TestCase):

  def test_simulate(self):
    effects = simulate()
    self.assertEqual(len(effects), 33)
    self.assertEqual(effects['DMG per kill while on a Kill Streak'], 1.1625)
    self.assertEqual(effects['Meat Benefits'], 0)
    self.assertEqual(effects['Plant Benefits'], 2.5)
    self.assertEqual(effects['Critical Damage'], 1.625)
    self.assertEqual(effects['Health Regeneration'], 3.75) # ???
    self.assertEqual(effects['Chem effects'], 0.8625)
    self.assertEqual(effects['Movement Speed'], 1.25)
    self.assertEqual(effects['Reload Speed'], 1.4)
    self.assertEqual(effects['Hunger'], 1.125)
    self.assertEqual(effects['Thirst'], 1.125)
    self.assertEqual(effects['Fall Speed'], 0.35)
    self.assertAlmostEqual(effects['Fall Damage'], 0.05)
    self.assertEqual(effects['AGI'], 7.5)
    self.assertEqual(effects['PER'], 7.5)
    self.assertEqual(effects['INT'], 9)
    self.assertEqual(effects['STR'], -0.25)
    self.assertEqual(effects['END'], 1.75)
    self.assertEqual(effects['CHR'], 2.5)
    self.assertEqual(effects['LCK'], 2.5)
    self.assertEqual(effects['Max HP'], -12.5)
    self.assertEqual(effects['Max AP'], -12.5)
    self.assertEqual(effects['Carry Weight'], 25)
    self.assertEqual(effects['Jump Height'], 4)
    self.assertEqual(effects['Damage Resistance'], 62.5)
    self.assertEqual(effects['Energy Resistance'], 62.5)
    self.assertEqual(effects['Limb Damage'], 2500000) #???

    # these are all default values that aren't touched
    self.assertEqual(effects['Teammate Damage Taken'], 1.0)
    self.assertEqual(effects['Damage Taken'], 1.0)
    self.assertEqual(effects['Energy Damage'], 1.0)
    self.assertEqual(effects['Fist Damage'], 1.0)
    self.assertEqual(effects['Melee Damage'], 1.0)
    self.assertEqual(effects['Cripple Limb Chance'], 1.0)
    self.assertEqual(effects['Gun Accurary'], 1.0)

if __name__ == '__main__':
  unittest.main()
