# Reason [highlight.js](https://github.com/highlightjs/highlight.js)

This is the source of truth for Reason's highlight.js integration.

## Installation

```sh
yarn add reason-highlightjs
```

In your code:

```js
let reasonHighlightJs = require('reason-highlightjs');
hljs.registerLanguage('reason', reasonHighlightJs)
```

## Contribution

`index.js` is the single source file. `test.re` is a bunch of tests.

Syntax highlighting using regular expressions is tricky; highlight.js is more of a tokenizer than full-blown parser, so we try not to overengineer it (though to be fair, Reason's highlightjs integration is one of the best out there).

As a rule of thumb, try not to "wrap" around a region. E.g. for array, just detect start and end and color the braces; don't try to search for array boundary then mark the whole content as array, then list a bunch of things in said array mode's `contains`. There's not much point in doing so and this might cause some complicated recursion that might even infinite loop in some piece of code.

The big complexity of the highlighter is to distinguish Reason's module vs constructor, since they're both upper-cased. We've found in practice that newcomers often confuse the two, so being able to distinguish and color them differently has big value. In order to achieve this, the highlight logic has to do a bunch of lookahead for modules and use some heuristics to determine whether a particular upper-cased token is a module or constructor. This logic is best-effort (and we're violating the rule of thumb above: try not to "wrap" around a region. We kinda do for `MODULE_DECLARATION_MODE`, `FUNCTOR_DECLARATION_MODE`, etc.).
