"use strict";

var isWarnedForDeprecation = false;
module.exports = function() {
    return {
        Program() {
            if (isWarnedForDeprecation || /\=-(f|-format)=/.test(process.argv.join('='))) {
              return;
            }

            /* eslint-disable no-console */
            console.log('The babel/generator-star-spacing rule is deprecated. Please ' +
                        'use the built in generator-star-spacing rule instead.');
            /* eslint-enable no-console */
            isWarnedForDeprecation = true;
        }
    };
};

module.exports.schema = [
    {
        "oneOf": [
            {
                "enum": ["before", "after", "both", "neither"]
            },
            {
                "type": "object",
                "properties": {
                    "before": {"type": "boolean"},
                    "after": {"type": "boolean"}
                },
                "additionalProperties": false
            }
        ]
    }
];
