import { Result, makeFailure, makeOk, bind, either } from "./lib/result";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
     // Find the first match without using loops
    const item = a.find(pred);

    // Return Ok if found, or Failure if nothing matched
    return item !== undefined ? makeOk(item) : makeFailure("No element found.");
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2 = (a: number[]): Result<number> => {
    // Chain the operations find the first even number, then square it.
    // 'bind' automatically handles the Failure case if no even number is found.
    return bind(findResult(x => x % 2 === 0, a), (x: number) => makeOk(x * x));
}

export const returnSquaredIfFoundEven_v3 = (a: number[]): number => {
    // Extract the value: square the number if the search was successful.
    // 'either' automatically handles the Failure case by returning our default of -1.
    return either(findResult(x => x % 2 === 0, a), (x: number) => (x*x), (x: String) => -1);
};

