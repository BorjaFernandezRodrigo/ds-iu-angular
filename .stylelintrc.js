// stylelint.config.js
export default {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        // BEM
        'selector-class-pattern': [
            '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
            {
                message: 'Expected class selector to follow BEM methodology',
                resolveNestedSelectors: true,
            },
        ],
        'max-nesting-depth': 3,
        'selector-max-compound-selectors': 3,
        'selector-max-specificity': '0,4,0',
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'layer',
                    'config',
                    'plugin',
                    'use',
                    'forward',
                    'theme',
                    'mixin',
                    'extend',
                    'include',
                ],
            },
        ],
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'layer',
                    'config',
                    'plugin',
                    'use',
                    'forward',
                    'theme',
                    'mixin',
                    'extend',
                    'include',
                ],
            },
        ],
        'scss/dollar-variable-pattern': null,
        'scss/percent-placeholder-pattern': null,
        'scss/at-mixin-pattern': null,
        'scss/at-function-pattern': null,
        'scss/no-global-function-names': null,
        'scss/dollar-variable-empty-line-before': null,
        'font-family-name-quotes': null,
        'custom-property-pattern': null,
        'custom-property-empty-line-before': null,

        // Order
        'order/order': ['at-rules', 'custom-properties', 'declarations', 'rules'],

        // General
        'rule-empty-line-before': [
            'always',
            {
                except: ['first-nested'],
                ignore: ['after-comment'],
            },
        ],

        // conflicting rules
        'no-descending-specificity': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },

    ignoreFiles: ['dist/**/*', 'node_modules/**/*', '.angular/**/*', 'src/styles.scss'],
};
