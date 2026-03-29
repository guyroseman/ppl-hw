import * as R from "ramda";

const stringToArray = R.split("");

/* Question 2.1 */
const vowels: string[] = ['a', 'e', 'i', 'o', 'u'];
export const countVowels: (s: string) => number = s => {
    // split to array
    const stringArr = stringToArray(s);
    
    // filter vowels
    const filteredString = stringArr.filter(c => R.includes(c.toLowerCase(), vowels));
    
    // return num of vowels
    return filteredString.length;
};

/* Question 2.2 */
export const isPalindrome = (text: string): boolean => {
    const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";

    // split to array
    const textArr = stringToArray(text.toLowerCase());

    // filter non letters / numbers 
    const letterNumArr = textArr.filter(c => R.includes(c, allowed));

    // use every() to check symmetry
    return letterNumArr.every((char, index) => {
        // Find the index of the character on the opposite side
        const mirrorIndex = letterNumArr.length - 1 - index;
        return char === letterNumArr[mirrorIndex];
    });
};
  
/* Question 2.3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence = (t: WordTree): string => {
    // recursively get the sentence strings from all children
    const childrenSentences = R.map(treeToSentence, t.children);

    // put the root at the FRONT of that array
    const fullList = R.prepend(t.root, childrenSentences);

    // join the entire list with a single space
    return R.join(" ", fullList);
};
