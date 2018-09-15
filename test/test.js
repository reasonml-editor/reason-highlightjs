const hljs = require('highlight.js');
const fs = require('fs');
const path = require('path');
const reasonHighlightjs = require('../index');

hljs.registerLanguage('reason', reasonHighlightjs);
const test = fs.readFileSync(path.join(__dirname, 'test.re'), {encoding: 'utf-8'});
const result = hljs.highlight('reason', test);

const firstPart = `
<head>
  <link rel="stylesheet" type="text/css" href="../node_modules/highlight.js/styles/atom-one-light.css">
  <style>
    .hljs-operator {
      color: #a626a4;
    }
    .hljs-character {
      color: #50a14f;
    }
    .hljs-module-identifier {
      color: #4078f2;
    }
    .hljs-constructor {
      color: #e45649;
    }
  </style>
</head>
<body>
  <pre class="hljs">
`;
const lastPart = `
  </pre>
</body>
`
fs.writeFileSync(path.join(__dirname, 'expected.html'), firstPart + result.value + lastPart, {encoding: 'utf-8'})

