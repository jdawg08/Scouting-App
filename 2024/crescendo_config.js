var config_data = `
{
  "dataFormat": "tsv",
  "title": "Scouting PASS 2024",
  "page_title": "Crescendo",
  "checkboxAs": "10",
  "prematch": [
    { "name": "Scouter Initials",
      "code": "s",
      "type": "scouter",
      "size": 5,
      "maxSize": 5,
      "required": "true"
    },
    { "name": "Path Drawer?<br>",
      "code": "Pdr",
      "type": "bool",
      "required": "true"
    },
    { "name": "Event",
      "code": "e",
      "type": "event",
      "defaultValue": "2024week0",
      "required": "true"
    },
    { "name": "Match Level",
      "code": "l",
      "type": "level",
      "choices": {
        "qm": "Quals<br>",
        "sf": "Semifinals<br>",
        "f": "Finals"
      },
      "defaultValue": "qm",
      "required": "true"
    },
    { "name": "Match #",
      "code": "m",
      "type": "match",
      "min": 1,
      "max": 150,
      "required": "true"
    },
    { "name": "Robot",
      "code": "r",
      "type": "robot",
      "choices": {
        "r1": "Red-1",
        "b1": "Blue-1<br>",
        "r2": "Red-2",
        "b2": "Blue-2<br>",
        "r3": "Red-3",
        "b3": "Blue-3"
      },
      "required":"true"
    },
    { "name": "Team #",
      "code": "t",
      "type": "team",
      "min": 1,
      "max": 99999,
      "required": "true"
    },
    { "name": "Auto Start Position",
      "code": "as",
      "type": "clickable_image",
      "filename": "2024/field_image.png",
      "clickRestriction": "one",
      "allowableResponses": "1 12 13 24 25 36 37 48 49 60 61 72",
      "shape": "circle 5 black red true"
    }
  ],

  "auton": [
    { "name": "Amp made?",
      "code": "ammd",
      "type": "bool"
    },
    { "name": "Speaker Scores",
      "code": "spsca",
      "type": "counter"
    },
    { "name": "Speaker Misses",
      "code": "spsm",
      "type": "counter"
    }
  ],

  "teleop": [
    { "name": "Actions after the bell",
      "code": "aatb",
      "type": "radio",
      "choices": {
        "mdn": "Pick up a missed/dropped note<br>",
        "puzn": "Pick up zone placed notes<br>"
      },
      "defaultValue": "mdn",
      "required": "true"
    },
    { "name": "Pick up midline placed note",
      "code": "mpn",
      "type": "radio",
      "choices": {
        "o": "Outside<br>",
        "i": "Inside<br>",
        "m": "Middle"
      },
      "defaultValue": "o",
      "required": "true"
    },
    { "name": "Speaker Scores",
      "code": "speksc",
      "type": "counter"
    },
    { "name": "Score in the speaker?",
      "code": "sits",
      "type": "radio",
      "choices": {
        "ne": "Near<br>",
        "f": "Far<br>",
        "b": "Both<br>",
        "n": "None<br>"
      }
    },
    { "name": "Only shoots w/ bumpers touching the speaker?",
      "code": "bts",
      "type": "bool"
    },
    { "name": "Note shuttler?",
      "code": "ns",
      "type": "bool"
    },
    { "name": "Notes shuttled",
      "code": "nosh",
      "type": "counter"
    },
    { "name": "Defensive Player?",
      "code": "dp",
      "type": "bool"
    },
    { "name": "Defense locations",
      "code": "sits",
      "type": "radio",
      "choices": {
        "sb": "Shot Blocker<br>",
        "sob": "Source Blocker<br>",
        "ao": "All over<br>",
        "no": "None<br>"
      }
    },
    { "name": "Amp Scores",
      "code": "amps",
      "type": "counter"
    },
    { "name": "Amp Misses",
      "code": "ampm",
      "type": "counter"
    },
    { "name": "# of Penalties",
      "code": "pe",
      "type": "pens",
      "size": 3,
      "maxSize": 5,
      "required": "false"
    },
    { "name": "Can go through stage?",
      "code": "ths",
      "type": "bool"
    },
    { "name": "Paths - For Certain People Only!!! Otherwise ignore",
      "code": "ts",
      "type": "drawable_image",
      "filename": "2024/field_image.png",
      "clickRestriction": "zero",
      "allowableResponses": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72",
      "shape": "circle 5 black red true",
      "path":true
    }
  ],
  "endgame": [
    { "name": "Final Status",
      "code": "fs",
      "type":"radio",
      "choices": {
        "p": "Parked<br>",
        "o": "Onstage<br>",
        "h": "Harmony<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    },
    { "name": "Chain Position",
      "code": "fs",
      "type":"radio",
      "choices": {
        "mid": "Middle<br>",
        "side": "Side"
      },
      "defaultValue": "side"
    },
    { "name": "Note in Trap",
      "code": "nit",
      "type": "bool"
    },
    { "name": "High note human player?",
      "code": "hp",
      "type": "bool"
    },
    { "name": "Made High Note?",
      "code": "madesp",
      "type": "bool"
    }
  ],
  "postmatch": [
    { "name": "Driver Skill",
      "code": "ds",
      "type": "radio",
      "choices": {
        "n": "Not Effective<br>",
        "a": "Average<br>",
        "v": "Very Effective<br>"
      },
      "defaultValue": "x"
    },
    { "name": "Defense Rating",
      "code": "dr",
      "type": "radio",
      "choices": {
        "b": "Below Average<br>",
        "a": "Average<br>",
        "g": "Good<br>",
        "e": "Excellent<br>",
        "x": "Did not play defense"
      },
      "defaultValue": "x"
    },
    { "name": "Speed Rating",
      "code": "sr",
      "type": "radio",
      "choices": {
        "1": "1 (slow)<br>",
        "2": "2<br>",
        "3": "3<br>",
        "4": "4<br>",
        "5": "5 (fast)"
      },
      "defaultValue":"3"
    },
    { "name": "Died/Immobilized",
      "code": "die",
      "type": "bool"
    },
    { "name": "Tippy<br>(almost tipped over)",
      "code": "tip",
      "type": "bool"
    },
    { "name": "Note stuck in robot? (>2)",
      "code": "dn",
      "type": "bool"
    },
    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 15,
      "maxSize": 55
    }
  ]
}`;
