var config_data = `
{
  "dataFormat": "kvs",
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
      "defaultValue": "2024ineva",
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
    { "name": "Starting Positions",
    "code": "stpos",
    "type": "radio",
    "choices": {
      "bas": "Between amp & speaker<br>",
      "ifsas": "In front of speaker amp side<br>",
      "insm": "In front of speaker middle<br>",
      "insas": "In front of speaker source side<br>",
      "bsss": "Between speaker and source<br>"
    },
    "defaultValue": "bas",
    "required": "true"
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
    },
    {
      "name": "Actions after first shot",
      "code": "aafs",
      "type": "radio",
      "choices": {
        "afsna": "First shot not attempted<br>",
        "punz": "Pick up note in wing<br>",
        "puncl": "Pick up note - center line<br>",
        "sz": "Only leave starting zone<br>",
        "o": "Other<br>",
        "no": "Nothing<br>"
      },
      "defaultValue": "no"
    },
    { "name": "Auton Path Drawer - Ignore if not a drawer",
      "code": "apd",
      "type": "drawable_image",
      "filename": "2024/field_image.png",
      "clickRestriction": "zero",
      "allowableResponses": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72",
      "shape": "circle 5 black red true",
      "path":"a"
    }
  ],

  "teleop": [
    { "name": "Speaker Scores",
      "code": "speksc",
      "type": "counter"
    },
    { "name": "Speaker Misses",
      "code": "spekm",
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
      },
      "defaultValue":"n"
    },
    { "name": "Only shoots w/ bumpers touching the speaker?",
      "code": "bts",
      "type": "bool"
    },
    { "name": "Amp Scores",
      "code": "amps",
      "type": "counter"
    },
    { "name": "Amp Misses",
      "code": "ampm",
      "type": "counter"
    },
    { "name": "Notes shuttled for alliance partners",
      "code": "nosh",
      "type": "counter"
    },
    { "name": "Defensive Player?",
      "code": "dp",
      "type": "bool"
    },
    { "name": "Defense locations",
      "code": "dloc",
      "type": "radio",
      "choices": {
        "sbs": "Shot block at speaker<br>",
        "nos": "Path block near source<br>",
        "ao": "All Over<br>",
        "oth": "Other",
        "n":"None"
      },
      "defaultValue":"n"
    },
    { "name": "# of Penalties",
      "code": "pe",
      "type": "counter"
    },
    { "name": "Travel through stage",
      "code": "ths",
      "type": "radio",
      "choices": {
        "rd": "Red<br>",
        "bl": "Blue<br>",
        "bh": "Both<br>",
        "n": "None<br>"
      },
      "defaultValue": "n"
    },
    { "name": "Paths - For Certain People Only!!! Otherwise ignore",
      "code": "ts",
      "type": "drawable_image",
      "filename": "2024/field_image.png",
      "clickRestriction": "zero",
      "allowableResponses": "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72",
      "shape": "circle 5 black red true",
      "path": "t"
    }
  ],
  "endgame": [
    { "name": "Parked?",
    "code": "p",
    "type": "bool"
  },
    { "name": "Onstage Status",
      "code": "os",
      "type":"radio",
      "choices": {
        "o": "Onstage<br>",
        "h": "Harmony<br>",
        "a": "Attempted but failed<br>",
        "x": "Not attempted"
      },
      "defaultValue": "x"
    },
    { "name": "Chain Position",
      "code": "cp",
      "type":"radio",
      "choices": {
        "mid": "Middle<br>",
        "side": "Side<br>",
        "n": "None<br>"
      },
      "defaultValue": "side"
    },
    { "name": "Note in Trap",
      "code": "nit",
      "type": "bool"
    }
  ],
  "postmatch": [
    { "name": "Died/Immobilized",
      "code": "die",
      "type": "bool"
    },
    { "name": "Damaged?",
      "code": "dam",
      "type": "bool"
    },
    { "name": "Note stuck in robot?",
      "code": "dn",
      "type": "bool"
    },
    { "name": "Comments",
      "code": "co",
      "type": "text",
      "size": 15,
      "maxSize": 55
    },
    { "name": "Drivetrain",
      "code": "td",
      "type": "radio",
      "choices": {
        "swv": "Swerve<br>",
        "oth": "Other<br>"
      },
      "defaultValue": "swv"
    }
  ]
}`;
