/**
 * Source code:
 * class A { foo: Bar=bar }
 */

exports.parse = () => ({
    "type": "Program",
    "start": 0,
    "end": 24,
    "loc": {
    "start": {
      "line": 1,
        "column": 0
    },
    "end": {
      "line": 1,
        "column": 24
    }
  },
    "range": [
    0,
    24
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
      "value": "Bar",
      "start": 15,
      "end": 18,
      "loc": {
        "start": {
          "line": 1,
          "column": 15
        },
        "end": {
          "line": 1,
          "column": 18
        }
      },
      "range": [
        15,
        18
      ]
    },
    {
      "type": "Punctuator",
      "value": "=",
      "start": 18,
      "end": 19,
      "loc": {
        "start": {
          "line": 1,
          "column": 18
        },
        "end": {
          "line": 1,
          "column": 19
        }
      },
      "range": [
        18,
        19
      ]
    },
    {
      "type": "Identifier",
      "value": "bar",
      "start": 19,
      "end": 22,
      "loc": {
        "start": {
          "line": 1,
          "column": 19
        },
        "end": {
          "line": 1,
          "column": 22
        }
      },
      "range": [
        19,
        22
      ]
    },
    {
      "type": "Punctuator",
      "value": "}",
      "start": 23,
      "end": 24,
      "loc": {
        "start": {
          "line": 1,
          "column": 23
        },
        "end": {
          "line": 1,
          "column": 24
        }
      },
      "range": [
        23,
        24
      ]
    }
  ],
    "sourceType": "script",
    "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 24,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 1,
          "column": 24
        }
      },
      "range": [
        0,
        24
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
        "end": 24,
        "loc": {
          "start": {
            "line": 1,
            "column": 8
          },
          "end": {
            "line": 1,
            "column": 24
          }
        },
        "range": [
          8,
          24
        ],
        "body": [
          {
            "type": "ClassProperty",
            "start": 10,
            "end": 22,
            "loc": {
              "start": {
                "line": 1,
                "column": 10
              },
              "end": {
                "line": 1,
                "column": 22
              }
            },
            "range": [
              10,
              22
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
              "end": 18,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 13
                },
                "end": {
                  "line": 1,
                  "column": 18
                }
              },
              "range": [
                13,
                18
              ],
              "typeAnnotation": {
                "type": "GenericTypeAnnotation",
                "start": 15,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 15
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "range": [
                  15,
                  18
                ],
                "typeParameters": null,
                "id": {
                  "type": "Identifier",
                  "start": 15,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    },
                    "identifierName": "Bar"
                  },
                  "range": [
                    15,
                    18
                  ],
                  "name": "Bar",
                  "_babelType": "Identifier"
                },
                "_babelType": "GenericTypeAnnotation"
              },
              "_babelType": "TypeAnnotation"
            },
            "value": {
              "type": "Identifier",
              "start": 19,
              "end": 22,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 19
                },
                "end": {
                  "line": 1,
                  "column": 22
                },
                "identifierName": "bar"
              },
              "range": [
                19,
                22
              ],
              "name": "bar",
              "_babelType": "Identifier"
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
