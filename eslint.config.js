// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const importPlugin = require('eslint-plugin-import');
const boundariesPlugin = require('eslint-plugin-boundaries');

module.exports = tseslint.config(
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        plugins: {
            import: importPlugin,
            boundaries: boundariesPlugin,
        },
        processor: angular.processInlineTemplates,
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.app.json'],
                tsconfigRootDir: __dirname,
                createDefaultProgram: true,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                    project: './tsconfig.json',
                },
            },
            'boundaries/elements': [
                {
                    type: 'domain',
                    pattern: '**/domain/**',
                },
                {
                    type: 'application',
                    pattern: '**/application/**',
                },
                {
                    type: 'infrastructure',
                    pattern: '**/infrastructure/**',
                },
                {
                    type: 'shared',
                    pattern: '**/shared/**',
                },
                {
                    type: 'theme',
                    pattern: '**/theme/**',
                },
            ],
            'boundaries/ignore': ['**/*.spec.ts', '**/*.test.ts'],
        },
        rules: {
            // Reglas de arquitectura hexagonal - Violaciones específicas
            'boundaries/element-types': [
                'error',
                {
                    default: 'disallow',
                    rules: [
                        {
                            from: 'domain',
                            allow: ['domain', 'shared'],
                            message: 'Domain layer should only depend on other domain modules and shared utilities',
                        },
                        {
                            from: 'application',
                            allow: ['domain', 'application', 'shared'],
                            message: 'Application layer should not depend on infrastructure or theme layers',
                        },
                        {
                            from: 'infrastructure',
                            allow: ['domain', 'application', 'infrastructure', 'shared'],
                            message:
                                'Infrastructure layer can depend on domain, application, other infrastructure, and shared',
                        },
                        {
                            from: 'shared',
                            allow: ['shared'],
                            message: 'Shared layer should only depend on other shared modules',
                        },
                        {
                            from: 'theme',
                            allow: ['domain', 'application', 'infrastructure', 'shared', 'theme'],
                            message: 'Theme layer (presentation) can depend on all layers',
                        },
                    ],
                },
            ],

            // Reglas específicas para detectar violaciones comunes
            'import/no-restricted-paths': [
                'error',
                {
                    zones: [
                        {
                            target: '**/domain/**',
                            from: '**/infrastructure/**',
                            message: '🚫 VIOLATION: Domain layer cannot import from Infrastructure layer',
                        },
                        {
                            target: '**/domain/**',
                            from: '**/application/**',
                            message: '🚫 VIOLATION: Domain layer cannot import from Application layer',
                        },
                        {
                            target: '**/domain/**',
                            from: '**/theme/**',
                            message: '🚫 VIOLATION: Domain layer cannot import from Theme/Presentation layer',
                        },
                        {
                            target: '**/application/**',
                            from: '**/infrastructure/**',
                            message: '🚫 VIOLATION: Application layer cannot import from Infrastructure layer',
                        },
                        {
                            target: '**/application/**',
                            from: '**/theme/**',
                            message: '🚫 VIOLATION: Application layer cannot import from Theme/Presentation layer',
                        },
                    ],
                },
            ],

            // Reglas de importación - Orden personalizado para arquitectura hexagonal
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Node.js built-ins
                        'external', // Librerías externas (Angular, RxJS, etc.)
                        'internal', // Imports internos del proyecto
                        'parent', // Imports del directorio padre
                        'sibling', // Imports del mismo directorio
                        'index', // Imports de index files
                    ],
                    pathGroups: [
                        {
                            pattern: '@angular/**',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: 'rxjs/**',
                            group: 'external',
                            position: 'after',
                        },
                        {
                            pattern: '**/shared/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '**/domain/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '**/application/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '**/infrastructure/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin'],
                    'newlines-between': 'never', // Sin saltos de línea entre imports
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    warnOnUnassignedImports: true,
                },
            ],
            'import/no-cycle': 'error',
            'import/no-self-import': 'error',

            // Reglas de Angular
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: ['[A-Z]'],
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: ['[A-Z]'],
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
            '@angular-eslint/use-injectable-provided-in': 'error',
            '@angular-eslint/no-input-rename': 'error',
            '@angular-eslint/no-output-rename': 'error',

            // Reglas de TypeScript (con información de tipos)
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/prefer-readonly': 'warn', // Esta requiere información de tipos
            '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
            '@typescript-eslint/strict-boolean-expressions': 'off', // Opcional: muy estricta
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            // Reglas para control flow statements (@if, @for, @switch)
            '@angular-eslint/template/prefer-control-flow': 'error',
            '@angular-eslint/template/use-track-by-function': 'error',
            '@angular-eslint/template/no-any': 'warn',
            '@angular-eslint/template/conditional-complexity': ['error', { maxComplexity: 3 }],
            '@angular-eslint/template/cyclomatic-complexity': ['error', { maxComplexity: 5 }],
            '@angular-eslint/template/click-events-have-key-events': 'error',
            '@angular-eslint/template/mouse-events-have-key-events': 'error',
            '@angular-eslint/template/no-autofocus': 'error',
            '@angular-eslint/template/no-positive-tabindex': 'error',
        },
    }
);
