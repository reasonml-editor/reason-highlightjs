/*
Language: ReasonML
Author: Gidi Meir Morris <oss@gidi.io>, Cheng Lou
Category: functional
*/
module.exports = function(hljs) {
  function orReValues(ops){
    return ops
    .map(function(op) {
      return op
        .split('')
        .map(function(char) {
          return '\\' + char;
        })
        .join('');
    })
    .join('|');
  }

  var RE_IDENT = '~?[a-z$_][0-9a-zA-Z$_]*';
  var RE_MODULE_IDENT = '[A-Z$_][0-9a-zA-Z$_]*';
  var RE_CONSTRUCTOR = '([A-Z][0-9a-zA-Z$_]*)|(`[a-zA-Z][0-9a-zA-Z$_]*)';

  var RE_PARAM_TYPEPARAM = '\'?[a-z$_][0-9a-z$_]*';
  var RE_PARAM_TYPE = '\s*:\s*[a-z$_][0-9a-z$_]*(\(\s*(' + RE_PARAM_TYPEPARAM + '\s*(,' + RE_PARAM_TYPEPARAM + ')*)?\s*\))?';
  var RE_PARAM = RE_IDENT + '(' + RE_PARAM_TYPE + ')?(' + RE_PARAM_TYPE + ')?';
  var RE_OPERATOR = "(" + orReValues(['->', '||', '&&', '++', '**', '+.', '+', '-.', '-', '*.', '*', '/.', '/', '...', '|>', '===', '==', '^', ':=', '!']) + ")";

  var KEYWORDS = {
    /* https://github.com/facebook/reason/blob/79e67d5334ef181fdb54bd57bd9e7729f9fe46e7/src/reason-parser/reason_lexer.mll#L94-L154 */
    keyword:
      'and as assert begin class constraint done downto exception external fun ' +
      'esfun function functor include inherit initializer lazy let pub mutable new nonrec ' +
      'object of open or pri rec then to type val virtual' +
      'try catch finally do else for if switch while import library export ' +
      'part of show hide is as ' +
      'module in',
    built_in:
      'array bool bytes char exn|5 float int int32 int64 list lazy_t|5 nativeint|5 ref string unit',
    literal:
      'true false'
  };

  const RE_NUMBER = '\\b(0[xX][a-fA-F0-9_]+[Lln]?|' +
    '0[oO][0-7_]+[Lln]?|' +
    '0[bB][01_]+[Lln]?|' +
    '[0-9][0-9_]*([Lln]|(\\.[0-9_]*)?([eE][-+]?[0-9_]+)?)?)';

  const STRING_MODE = {
    className: 'string',
    variants: [
      {
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE],
      },
      // {foo|bla|foo}
      {
        begin: '\\{(' + RE_IDENT + ')?\\|',
        end: '\\|(' + RE_IDENT + ')?\\}',
      },
    ]
  };

  const CHARACTER_MODE = {
    className: 'character',
    begin: '\'(\\\\[^\']+|[^\'])\'',
    illegal: '\\n',
    relevance: 0
  };

  const NUMBER_MODE = {
    className: 'number',
    relevance: 0,
    variants: [
      {
        begin: RE_NUMBER
      },
      {
        begin: '\\(\\-' + RE_NUMBER + '\\)'
      }
    ]
  };

  const OPERATOR_MODE = {
    className: 'operator',
    relevance: 0,
    begin: RE_OPERATOR
  };

  const ATTRIBUTE_MODE = {
    className: 'attribute',
    begin: "\\[@",
    end: "\\]",
    contains: [
      {
        begin: "[^\\]]+",
      },
    ]
  };

  // this definition is mutated below. Not complete
  let MODULE_ACCESS_CONTENTS = [
    STRING_MODE,
    OPERATOR_MODE,
    {
      className: 'module',
      begin: "\\b" + RE_MODULE_IDENT, returnBegin: true,
      end: "\.",
      contains: [
        {
          className: 'identifier',
          begin: RE_MODULE_IDENT,
          relevance: 0
        }
      ]
    }
  ];

  const PARAMS_CONTENTS = [
    {
      className: 'module',
      begin: "\\b" + RE_MODULE_IDENT, returnBegin: true,
      end: "\.",
      relevance: 0,
      contains: [
        {
          className: 'identifier',
          begin: RE_MODULE_IDENT,
          relevance: 0
        }
      ]
    }
  ];

  const PARAMS_MODE = {
    begin: RE_IDENT,
    end: '(,|\\n|\\))',
    relevance: 0,
    contains: [
      OPERATOR_MODE,
      {
        className: 'typing',
        begin: ':',
        end: '(,|\\n)',
        returnBegin: true,
        relevance: 0,
        contains: PARAMS_CONTENTS
      }
    ]
  };

  // TODO: unused right now. The arrow regex isn't accurate. Accidentally catches pattern match =>
  const FUNCTION_BLOCK_MODE = {
    className: 'function',
    relevance: 0,
    keywords: KEYWORDS,
    variants: [
      {
        begin: '\\s(\\(\\.?.*?\\)|' + RE_IDENT + ')\\s*=>',
        end: '\\s*=>',
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: 'params',
            variants: [
              {
                begin: RE_IDENT
              },
              {
                begin: RE_PARAM
              },
              {
                begin: /\(\s*\)/,
              }
            ]
          }
        ]
      },
      {
        begin: '\\s\\(\\.?[^;\\|]*\\)\\s*=>',
        end: '\\s=>',
        returnBegin: true,
        relevance: 0,
        contains: [
          {
            className: 'params',
            relevance: 0,
            variants: [
              PARAMS_MODE
            ]
          }
        ]
      },
      {
        begin: '\\(\\.\\s' + RE_IDENT + '\\)\\s*=>'
      }
    ]
  };
  MODULE_ACCESS_CONTENTS.push(FUNCTION_BLOCK_MODE);

  const CONSTRUCTOR_MODE = {
    className: 'constructor',
    begin: '\\b' + RE_CONSTRUCTOR,
    illegal: '\\n',
    keywords: KEYWORDS,
  };

  const arrayOrListContent = [
    CONSTRUCTOR_MODE,
    OPERATOR_MODE,
    STRING_MODE,
    CHARACTER_MODE,
    NUMBER_MODE
  ];
  const ARRAY_MODES = {
    className: 'literal',
    variants: [
      {
        begin: '\\[\\|',
      },
      {
        begin: '\\|\\]',
      },
    ]
  };
  const LIST_MODES = {
    className: 'literal',
    variants: [
      {
        begin: '\\[',
      },
      {
        begin: '\\]',
      },
    ]
  };

  const MODULE_ACCESS_MODE = {
    className: 'module-access',
    keywords: KEYWORDS,
    returnBegin: true,
    variants: [
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+" + RE_IDENT
      },
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+\\(",
        end: "\\)",
        returnBegin: true,
        contains: [
          FUNCTION_BLOCK_MODE,
          {
            begin: '\\(',
            end: '\\)',
          }
        ].concat(MODULE_ACCESS_CONTENTS)
      },
      {
        begin: "\\b(" + RE_MODULE_IDENT + "\\.)+{",
        end: "}"
      }
    ],
    contains: MODULE_ACCESS_CONTENTS
  };

  PARAMS_CONTENTS.push(MODULE_ACCESS_MODE);

  // we're gonna capture everything inside a functor param and ignore them. This
  // is so that we can disambiguate between constructors and module names. Our
  // solution: just don't recognize either inside param (the regex for
  // recursively detecting module declarations inside functor params is too
  // hard)

  // This is super complex; best test on test.re every time we change this. For
  // example, we don't support multi-line module type annotation well. Regexes...
  const FUNCTOR_DECLARATION_MODE = {
    className: 'functor-declaration',
    begin: "\\bmodule\\s+(type\\s*)?" + RE_MODULE_IDENT + "(\\s*:\\s*.+)?\\s*=.+" + "\\s*=>\\s*",
    // end: "\\)\\s*=>",
    // at least highlight the keywords in the params...
    keywords: KEYWORDS,
    returnBegin: true,
    contains: [
      {
        begin: "\\bmodule\\s+(type\\s*)?",
        keywords: KEYWORDS,
      },
      {
        begin: RE_MODULE_IDENT,
        className: 'identifier',
      },
      {
        begin: "(\\s*:\\s*.+)?\\s*=.+" + "\\s*=>\\s*",
        keywords: KEYWORDS,
      }
    ]
  };
  const MODULE_DECLARATION_MODE = {
    className: 'module-declaration',
    begin: "\\bmodule\\s+(type\\s*)?" + RE_MODULE_IDENT + "(\\s*:\\s*.+)?" + "\\s*=\\s*",
    // end: "\\)\\s*=>",
    // at least highlight the keywords in the params...
    keywords: KEYWORDS,
    returnBegin: true,
    contains: [
      {
        begin: "\\bmodule\\s+(type\\s*)?",
        keywords: KEYWORDS,
      },
      {
        begin: RE_MODULE_IDENT,
        className: 'identifier',
      },
      {
        begin: "(\\s*:\\s*.+)?" + "\\s*=\\s*",
        keywords: KEYWORDS,
      }
    ]
  };

  const OPEN_OR_INCLUDE_MODULE_MODE = {
    className: 'module-open',
    begin: "(open|include)\\s*" + RE_MODULE_IDENT,
    returnBegin: true,
    contains: [
      {
        begin: "(open|include)\\s*",
        keywords: KEYWORDS,
      },
      {
        begin: RE_MODULE_IDENT,
        className: 'identifier',
      },
    ]
  };

  const MODULE_TYPE_OF_MODE = {
    className: 'module-type-of',
    begin: "\\bmodule\\s*type\\s*of\\s*" + RE_MODULE_IDENT,
    returnBegin: true,
    contains: [
      {
        begin: "\\bmodule\\s*type\\s*of\\s*",
        keywords: KEYWORDS,
      },
      {
        begin: RE_MODULE_IDENT,
        className: 'identifier',
      },
    ]
  };

  const MODULE_ACCESS_MODE2 = {
    className: 'module-access',
    begin: RE_MODULE_IDENT + "\\.",
    returnBegin: true,
    contains: [
      {
        begin: RE_MODULE_IDENT,
        className: 'identifier',
      },
    ]
  };

  const JSX_MODE = {
    variants: [
      {
        begin: "<>",
      },
      {
        begin: "</>",
      },
      {
        begin: "/>",
      },
      {
        begin: "</",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: 'identifier',
          },
        ]
      },
      {
        begin: "<",
        contains: [
          {
            begin: RE_MODULE_IDENT,
            className: 'identifier',
          },
        ]
      },
    ]
  };

  return {
    aliases: ['re'],
    keywords: KEYWORDS,
    illegal: '(:\\-|:=|\\${|\\+=)',
    // most of the order here is important
    contains: [
      hljs.COMMENT('/\\*', '\\*/', { illegal: '^(\\#,\\/\\/)' }),
      CHARACTER_MODE,
      STRING_MODE,
      ATTRIBUTE_MODE,
      ARRAY_MODES,
      LIST_MODES,
      JSX_MODE,
      OPERATOR_MODE,
      NUMBER_MODE,
      hljs.C_LINE_COMMENT_MODE,
      // FUNCTION_BLOCK_MODE,
      FUNCTOR_DECLARATION_MODE,
      MODULE_DECLARATION_MODE,
      MODULE_TYPE_OF_MODE,
      OPEN_OR_INCLUDE_MODULE_MODE,
      MODULE_ACCESS_MODE2,
      CONSTRUCTOR_MODE,
    ]
  };
}
