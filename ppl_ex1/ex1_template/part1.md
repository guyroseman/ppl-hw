## Part 1: Theoretical Questions

Submit the solution to this part as `part1.md`.

### [25 points] Question 1.1

1. Explain in simple words the following programming paradigms:
   1. [5 points] Imperative
   **Answer:** In this paradigm, a program is structured as a precise sequence of commands. As a programmer, you are directly instructing the computer exactly how to perform tasks, executing them step-by-step, one command after the other.

   1. [5 points] Object Oriented
   **Answer:** This paradigm organizes code around "objects," which bundle both data (attributes) and behavior (methods) into a single, cohesive unit.

   1. [5 points] Functional
   **Answer:** Functional Programming treats code like math equations using 'pure' functions. We declare what we want instead of changing data step-by-step. Since it has no side effects - the same input always gives the exact same output without secretly altering other variables

1. [5 points] How does the object oriented paradigm improve over the imperative paradigm?
**Answer:** OOP takes over the imperative pardigam primarily by providing better organization and modularity for larger projects.

Imperative programming relies on variables and standalone functions - which can easily tangle into long and complex code as the system grows. On the other hand OOP is able to bundle data and its related methods together into secure objects. This protects the internal state from accidental changes and makes the code much easier to manage, reuse, and scale.


1. [5 points] How does the functional paradigm improve over the object oriented paradigm?
**Answer:** The Functional paradigm improves upon OOP primarily by eliminating shared mutable state.

In OOP, objects frequently change their internal data, which can cause unpredictable bugs, especially in multi-threading (Race Conditions). Functional programming solves this by using immutability (data cannot be changed after creation) and pure functions. This makes the code much more reliable, easier to test, and inherently safe for parallel processing.

### [10 points] Question 1.2

Consider the following TypeScript function, which calculates the average price of all discounted products in a given inventory.

```ts
type Product = {
  name: string;
  price: number;
  discounted: boolean;
};

const getDiscountedProductAveragePrice = (inventory: Product[]): number => {
  let discountedPriceSum = 0;
  let discountedProductsCount = 0;

  for (const product of inventory) {
    if (product.discounted) {
      discountedPriceSum += product.price;
      discountedProductsCount++;
    }
  }

  if (discountedProductsCount === 0) {
    return 0;
  }

  return discountedPriceSum / discountedProductsCount;
};
```

This function uses an imperative approach with loops and conditional statements.

Refactor the function `getDiscountedProductAveragePrice` to adhere to the Functional Programming paradigm. Utilize the built-in array methods `map`, `filter`, and `reduce` to achieve the same functionality without explicit iteration and conditional checks.
Write the new function under the name `getDiscountedProductAveragePriceFP`.

**Important**: the new function should have the same signature.

**Note**: there are no tests for this question, and it will not be executed. The task here is to write the code in a functional way.

**Answer:**
```ts
type Product = {
  name: string;
  price: number;
  discounted: boolean;
};

const getDiscountedProductAveragePrice = (inventory: Product[]): number => {
  // Filter the discounted products
  const discountedProducts = inventory.filter(product => product.discounted);
  // Calculate the sum of the prices of the discounted products
  const sum = discountedProducts.reduce((acc, cur) => acc + cur.price, 0);
  // Return the average price, handling the case where there are no discounted products
  if (discountedProducts.length === 0) {
    return 0; 
  }
  return sum/ discountedProducts.length;
}
```


### [18 points] Question 1.3

Write the most general type for each expression, using type variables where applicable.
Guidelines:

- Arrays must be homogeneous.
- Arithmetic operations must be performed on numbers.
- Use generics where possible.
- Avoid using `any`.

1. [3 points] `(x, y) => x.some(y)`
**Answer:** <T>(x: T[] , y: (item: T) => boolean) => boolean

2. [3 points] `x => x.map(y => y * 2)`
**Answer:** (x: number[]) => number[]

3. [3 points] `(x, y) => x.filter(y)`
**Answer:** <T>(x: T[], y: (item: T) => boolean) => T[]

4. [3 points] `x => x.reduce((acc, cur) => acc + cur, 0)`
**Answer:**  (x: number[]) => number

5. [3 points] `(x, y) => x ? y[0] : y[1]`
**Answer:** (x: boolean, <T>(y: T[])) => T
<T, U>(x: U, y: T[]) => T

6. [3 points] `(f,g) => x => f(g(x+1))`
**Answer:** <T, U>(f: (y: T) => U, g: (x: number) => T) => (x: number) => U

