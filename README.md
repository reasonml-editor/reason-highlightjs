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

The exposed classes for css coloring are plainly written in `index.js`. Check for the `className: ...`parts.

## Contribution

`index.js` is the single source file. `yarn test` to check whether your modification caused `test/expected.html` to change. Do read the tests; they're simple.

### Tips

When a mode has `begin` but no `end`, as per the docs, `end` will default to anything. But this doesn't mean the mode stops immediately; it'll actually cycle through its `contains` until every sub-mode fails to match.

If you wanna do a big look-ahead in `begin` then come _back_ and highlight stuff in the region you've captured, through submodes (aka `contains`), you can't ordinarily, since the submodes matchings start right _after_ the captured `begin`; too late to highlight that region (except for `keywords`, which is kinda special-cased as a config, but disregard that)! Instead, you can use `returnBegin: true` that resets the lexing process back to `begin`, and then in `contains`, proceed as desired. Aka this is basically looking-ahead without skipping past the part you've looked. Careful though, since resetting the lexer back to beginning means you might get caught in infinite loops.

`contains`' order is significant. Top to bottom.
