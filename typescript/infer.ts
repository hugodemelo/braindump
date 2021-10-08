// 00 - What is a call signature (just like any type but for a function)
type MyUnion = 'a' | 'b' | 'c';

// 01 - The different ways of declaring a call signature
type ShortSum = (a: number, b: number) => number;

type FullSum = {
  (a: number, b: number): number;
};

// 02 - How a call signature relates to a function
type Sum = (a: number, b: number) => number;

const myFunc: Sum = (a, b) => {
  return a + b;
};

// 03 - Declare our own call signature (for overloaded functions)
type ArrayGenerator = {
  (type: 'a'): number[];
  (type: 'b'): string[];
  (type: 'c'): boolean[];
  (type: 'd'): bigint[];
};

const generator: ArrayGenerator = (type: 'a' | 'b' | 'c' | 'd') => {
  switch (type) {
    case 'a':
      return [];
    case 'b':
      return [];
    case 'c':
      return [];
    case 'd':
      return [];
  }
}

// 04 - Use a conditional type to extract the return type of an overloaded function
type InferReturn<T> = T extends {
  (...args: any): infer R;
  (...args: any): infer R;
  (...args: any): infer R;
  (...args: any): infer R;
} ? R : T;

type Return = InferReturn<ArrayGenerator>; // number[] | boolean[] | string[] | bigint[]

(() => {
  // The moment you set properties, it becomes a type for an object NOT an overloaded function
  type Generator = {
    on(type: 'a'): number[],
    on(type: 'b'): boolean[],
  };

  // const d: Generator = (type: 'a' | 'b') => {
  //   switch(type) {
  //     case "a": return [];
  //     case "b": return [];
  //   }
  // };

  const d: Generator = {
    on(type: 'a' | 'b') {
      switch (type) {
        case "a":
          return [];
        case "b":
          return [];
      }
    }
  };

  d.on('a');
  d.on('b');
})();

(() => {
  class Person {
    constructor(public name: string) {
    }

    getAge(): number {
      return 67;
    }
  }

  function decorateWithType(clazz: new(...args: any[]) => Person) {
    return class extends clazz {
      getName() {
        return this.name;
      }
    }
  }

  const ClassWithType = decorateWithType(Person);
  const a = new ClassWithType();
  console.log(a.getName());

  function decorateWithGeneric<C extends new(...args: any[]) => Person>(clazz: C) {
    return class extends clazz {
      getName() {
        return this.name;
      }
    }
  }

  const ClassWithGeneric = decorateWithGeneric(Person);
  const b = new ClassWithGeneric('hugo');
  console.log(b.getName());

  function decorateWithCtor(clazz: new(name: string) => Person) {
    return class extends clazz {
      getName() {
        return this.name;
      }
    }
  }

  const ClassWithCtor = decorateWithCtor(Person);
  const c = new ClassWithCtor('hugo');
})();
