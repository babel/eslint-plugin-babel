/**
 * Source code:
 * class A { foo: Bar = bar }
 */

exports.parse = () => ({
  "type": "Program",
  "start": 0,
  "end": 27,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 1,
      "column": 27
    }
  },
  "range": [
    0,
    27
  ],
  "comments": [],
  "tokens": [
    {
      "type": "Keyword",
      "value": "class",
      "start": 0,
      "end": 5,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 5
        }
      },
      "range": [
        0,
        5
      ]
    },
    {
      "type": "Identifier",
      "value": "A",
      "start": 6,
      "end": 7,
      "loc": {
        "start": {
          "line": 1,
          "column": 6
        },
        "end": {
          "line": 1,
          "column": 7
        }
      },
      "range": [
        6,
        7
      ]
    },
    {
      "type": "Punctuator",
      "value": "{",
      "start": 8,
      "end": 9,
      "loc": {
        "start": {
          "line": 1,
          "column": 8
        },
        "end": {
          "line": 1,
          "column": 9
        }
      },
      "range": [
        8,
        9
      ]
    },
    {
      "type": "Identifier",
      "value": "foo",
      "start": 10,
      "end": 13,
      "loc": {
        "start": {
          "line": 1,
          "column": 10
        },
        "end": {
          "line": 1,
          "column": 13
        }
      },
      "range": [
        10,
        13
      ]
    },
    {
      "type": "Punctuator",
      "value": ":",
      "start": 13,
      "end": 14,
      "loc": {
        "start": {
          "line": 1,
          "column": 13
        },
        "end": {
          "line": 1,
          "column": 14
        }
      },
      "range": [
        13,
        14
      ]
    },
    {
      "type": "Identifier",
      "value": "number",
      "start": 15,
      "end": 21,
      "loc": {
        "start": {
          "line": 1,
          "column": 15
        },
        "end": {
          "line": 1,
          "column": 21
        }
      },
      "range": [
        15,
        21
      ]
    },
    {
      "type": "Punctuator",
      "value": "=",
      "start": 22,
      "end": 23,
      "loc": {
        "start": {
          "line": 1,
          "column": 22
        },
        "end": {
          "line": 1,
          "column": 23
        }
      },
      "range": [
        22,
        23
      ]
    },
    {
      "type": "Numeric",
      "value": "1",
      "start": 24,
      "end": 25,
      "loc": {
        "start": {
          "line": 1,
          "column": 24
        },
        "end": {
          "line": 1,
          "column": 25
        }
      },
      "range": [
        24,
        25
      ]
    },
    {
      "type": "Punctuator",
      "value": "}",
      "start": 26,
      "end": 27,
      "loc": {
        "start": {
          "line": 1,
          "column": 26
        },
        "end": {
          "line": 1,
          "column": 27
        }
      },
      "range": [
        26,
        27
      ]
    }
  ],
  "sourceType": "script",
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 27,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 27
        }
      },
      "range": [
        0,
        27
      ],
      "id": {
        "type": "Identifier",
        "start": 6,
        "end": 7,
        "loc": {
          "start": {
            "line": 1,
            "column": 6
          },
          "end": {
            "line": 1,
            "column": 7
          },
          "identifierName": "A"
        },
        "range": [
          6,
          7
        ],
        "name": "A",
        "_babelType": "Identifier"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 27,
        "loc": {
          "start": {
            "line": 1,
            "column": 8
          },
          "end": {
            "line": 1,
            "column": 27
          }
        },
        "range": [
          8,
          27
        ],
        "body": [
          {
            "type": "ClassProperty",
            "start": 10,
            "end": 25,
            "loc": {
              "start": {
                "line": 1,
                "column": 10
              },
              "end": {
                "line": 1,
                "column": 25
              }
            },
            "range": [
              10,
              25
            ],
            "static": false,
            "key": {
              "type": "Identifier",
              "start": 10,
              "end": 13,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 10
                },
                "end": {
                  "line": 1,
                  "column": 13
                },
                "identifierName": "foo"
              },
              "range": [
                10,
                13
              ],
              "name": "foo",
              "_babelType": "Identifier"
            },
            "computed": false,
            "variance": null,
            "typeAnnotation": {
              "type": "TypeAnnotation",
              "start": 13,
              "end": 21,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 21
                }
              },
              "range": [
                13,
                21
              ],
              "typeAnnotation": {
                "type": "NumberTypeAnnotation",
                "start": 15,
                "end": 21,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 21
                  }
                },
                "range": [
                  15,
                  21
                ],
                "_babelType": "NumberTypeAnnotation"
              },
              "_babelType": "TypeAnnotation"
            },
            "value": {
              "type": "Literal",
              "start": 24,
              "end": 25,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 24
                },
                "end": {
                  "line": 1,
                  "column": 25
                }
              },
              "range": [
                24,
                25
              ],
              "value": 1,
              "raw": "1",
              "_babelType": "Literal"
            },
            "_babelType": "ClassProperty"
          }
        ],
        "_babelType": "ClassBody"
      },
      "_babelType": "ClassDeclaration"
    }
  ]
});
