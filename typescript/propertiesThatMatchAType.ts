(() => {
  type Person = {
    name: string;
    age: number;
    doMath: (...numbers: number[]) => number;
    doCSS: (tree: Document) => Document;
    timeToLive: Date;
  };

  /**
   * Get all the properties that match a specified type, example:
   *
   * GetProperty<Person, Date> => timeToLive
   * GetProperty<Person, (doc: Document) => Document => doCSS
   */
  type GetProperty<T, U> = {
    [key in keyof T]: (T[key] extends U ? key : never)
  }[keyof T];

  type A = GetProperty<Person, (s: Document) => Document>; // 'doCSS'
  type B = GetProperty<Person, Date>; // 'timeToLive'
  type C = GetProperty<Person, string | number>;  // 'name' | 'age'
  type D = GetProperty<Person, (...args: any[]) => any>;  // 'doMath' | 'doCSS'
})();
