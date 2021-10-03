(() => {
  type Person = {
    [friends: string]: { name: string; age: number };
  }

  // You can get the type of an index signature by using the indexed access type
  type Friends = Person[string]; // { name: string, age: number }


  // Since 'arrays' also make use of index signatures (number), you can get the type of an array.
  type Strings = string[][number];  // string
  type Objects = { name: string }[][number]; // { name: string }
})();
