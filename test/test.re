"aa";
'a';
[@bs.module "foo"] external foo: int = "bar";
let add = [%bs.raw "a + b"];
[%%%raw "a + b"];

exception Hello;

let foo = 1.;
let recordAccess = fooRecord.myName;
let recordAccessWithScope = fooRecord.ReasonReact.myName;

let [1, 2.2] = foo();
let [|c, [|a, [1], c|], 2.2|] = [|c, 1, "d", 'a', 1+2|];

type bla('a) = {
  a: int,
  ok: 'a
};

let getItem = (theList) =>
  if (callSomeFunctionThatThrows()) {
    /* return the found item here */
  } else {
    raise(Not_found)
  };

let result =
  try (getItem([1, 2, 3])) {
  | Not_found => 0 /* Default value if getItem throws */
  };

let getCenterCoordinates = (aBla, doHello, ~b=1, ~c, ()) => {
  let x = doSomeOperationsHere("a");
  let yy = doSomeMoreOperationsHere();
  let a = Foo;
  let a = `Foo;
  let a = `bar91(1);
  (x, y)
};

type profession = Teacher | Director;
/* test */

let person1 = Teacher;
let getProfession = (person) =>
  switch (person) {
  | [|Teacher|] => "A teacher"
  | Director => "A director"
  };

open Soup;
include {let a = 1;};
open Belt.Map;
include Belt.Map.Make();

Foo.Some(Bar);
Foo.Some(Bar());
Foo.make(Bar());
module Bla = Belt.Map.Make(Bar({type t; let a:b = "cc";}));
module SetOfIntPairs: Foo = MakeSet(IntPair);
module SetOfIntPairs = MakeSet(IntPair);
module SetOfIntPairs = MakeSet(IntPair({type t = Bar;}));

Foo: bla;

module Nested = (Foo: {}) => {
  module NestMore = Bla;
};
module type Bla = {
  include (module type of BaseComponent);
};
/* test */
module School = {
  type profession = Teacher | Director;
  /* test */

  let person1 = Teacher;
  let getProfession = (person) =>
    switch (person) {
    | Teacher => "A teacher"
    | Director => "A director"
    };
  module Nested = (
    Foo: Bar,
    {
      type a = Bar;
      let a = [|"1"|];
    }
  ) => {
    module NestMore =
      Bla;
    module NestMore = (Foo: {}) => Bla;
  };
  module Nested2 = (
    Foo: Bar,
    Bar: Baz,
  ) => List;
  module Nested = (Foo: Bar, {type a = Bar; let a = 1; } ) => {
    module NestMore = Bla;
    module NestMore: Foo = Bla;
    module NestMore: {type t = Bar} = Bla;
    module NestMore: {type t = Bar} = {
      type t = Variant;
      let a = ["hello"];
    };
    module NestMore = (Foo: {type t = Variant;}) => Bla;
    module NestMore: Bla = (Foo: {}) => Bla;
    module NestMore: {type t = Bar; let a: b = "cc"; module Foo = {};} = (Foo: {}) => Bla;
    module type NestMore = {}
    module NestMore = () => Bla.Qux;
  }
};

let p: School.School2.profession = School.getProfession(School.Foo);

let getAudience = (~excited) => excited ? "world!" : "world";
