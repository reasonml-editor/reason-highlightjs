/* Some of these might not highlight correctly */
"a";
'a';
[@bs.module hello] external foo: int = "bar";

let bla = 1.;

let [1, 2.2] = foo();
let [|c, [|a, [1], c|], 2.2|] = [|c, 1, "d", 'a', 1+2|];

type bla('a) = {
  a: int,
  ok: 'a
};

let getCenterCoordinates = (aBla, doHello, ~b=1, ~c, ()) => {
  let x = doSomeOperationsHere("a");
  let y = doSomeMoreOperationsHere();
  let a = Foo;
  let a = `Foo;
  let a = `bar91(1);
  (x, y)
};

Foo: bla;

type profession = Teacher | Director;
/* test */

let person1 = Teacher;
let getProfession = (person) =>
  switch (person) {
  | [|Teacher|] => "A teacher"
  | Director => "A director"
  };
module Nested = (Foo: {}) => {
  module NestMore = Bla;
}
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
  ) => List;
  module Nested = (Foo: Bar, {type a = Bar; let a = 1; } ) => {
    module NestMore = Bla;
    module NestMore: Foo = Bla;
    module NestMore: {type t = Bar} = Bla;
    module NestMore: {type t = Bar} = {
      type t = Variant
    };
    module NestMore = (Foo: {}) => Bla;
    module NestMore: Bla = (Foo: {}) => Bla;
    module NestMore: {type t = Bar} = (Foo: {}) => Bla;
    module type NestMore = {}
  }
};

let p: School.School2.profession = School.getProfession(School.Foo);

let getAudience = (~excited) => excited ? "world!" : "world";
Foo.Make(Bar);
Foo.Make(Bar());
Foo.make(Bar());
Foo.Make(Bar({type t;}));
