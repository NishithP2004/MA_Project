/*
    19MAT102 - Matrix Algebra Project
    Finding the Solution of a Matrix using Gauss Seidel Method
    Nishith P
    BL.EN.U4CSE22138
*/

// Importing the in-built 'fs' library to read the input matrix file - "input.txt" from the File System.
const fs = require('fs');

// Module to read and parse the "input.txt" file to get the input matrices - A, B and X and return them as a JavaScript Object.
function getInputMatrix() {
    let input = fs.readFileSync("input.txt", 'utf-8').split("\r\n");

    let A = [],
        B = [],
        X = [];
    input.forEach(line => {
        let elem = line.trim().split(" ");
        B.push(parseInt(elem.slice(elem.indexOf(":") + 1)[0]))
        elem = elem.slice(0, elem.indexOf(":")).map(e => parseInt(e));
        A.push(elem)
        X.push(0)
    })
    return {
        A,
        B,
        X
    }
}

// Read-only variable to store the Matrix Object returned by getInputMatrix() module.
const matrix = getInputMatrix();
// Read-only Function to take the three matrices - A, B, X as its input along with an optional input variable "N" 
// (number of iterations) to calculate the solution for the given matrix A by Gauss Seidel method.
const seidel = (A, B, X, N = 5) => {
    while (N > 0) {
        for (let i = 0; i < A.length; i++) {
            let exp = B[i];

            for (let j = 0; j < A[i].length; j++) {
                if (j == i)
                    continue;
                else {
                    exp -= (A[i][j] * X[j])
                }
            }
            exp /= A[i][i];
            X[i] = exp;
        }
        N--;
    }
    return X
}
// Obtaining the values of matrices A, B and X from the getInputMatrix() function where,
// Matrix X denotes the solution matrix which is initially a null matrix
var {
    A,
    B,
    X
} = matrix
// Obtaining the updated solution matrix from the seidel() function after "N" iterations
X = seidel(A, B, X, 1);
console.log("The solution for the inputed Matrix is: \n------------\n")
// Printing the elements of the solution matrix - X in a desired format.
let i = 0;
X.forEach(soln => {
    console.log(`x${++i}=${soln}`)
})