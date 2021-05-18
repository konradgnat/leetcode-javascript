/**
 * Queen's Attack II

You will be given a square chess board with one queen and a number of obstacles placed on it. Determine how many squares the queen can attack.

A queen is standing on an  chessboard. The chess board's rows are numbered from  to , going from bottom to top. Its columns are numbered from  to , going from left to right. Each square is referenced by a tuple, , describing the row, , and column, , where the square is located.

The queen is standing at position . In a single move, she can attack any square in any of the eight directions (left, right, up, down, and the four diagonals). In the diagram below, the green circles denote all the cells the queen can attack from :

image

There are obstacles on the chessboard, each preventing the queen from attacking any square beyond it on that path. For example, an obstacle at location  in the diagram above prevents the queen from attacking cells , , and :

image

Given the queen's position and the locations of all the obstacles, find and print the number of squares the queen can attack from her position at . In the board above, there are  such squares.

Function Description

Complete the queensAttack function in the editor below.

queensAttack has the following parameters:
- int n: the number of rows and columns in the board
- nt k: the number of obstacles on the board
- int r_q: the row number of the queen's position
- int c_q: the column number of the queen's position
- int obstacles[k][2]: each element is an array of  integers, the row and column of an obstacle

Returns
- int: the number of squares the queen can attack

Input Format

The first line contains two space-separated integers  and , the length of the board's sides and the number of obstacles.
The next line contains two space-separated integers  and , the queen's row and column position.
Each of the next  lines contains two space-separated integers  and , the row and column position of .

Constraints

A single cell may contain more than one obstacle.
There will never be an obstacle at the position where the queen is located.
Subtasks

For  of the maximum score:

For  of the maximum score:

Sample Input 0

4 0
4 4
Sample Output 0

9
Explanation 0

The queen is standing at position  on a  chessboard with no obstacles:

image

Sample Input 1

5 3
4 3
5 5
4 2
2 3
Sample Output 1

10
Explanation 1

The queen is standing at position  on a  chessboard with  obstacles:

image

The number of squares she can attack from that position is .

Sample Input 2

1 0
1 1
Sample Output 2

0
Explanation 2

Since there is only one square, and the queen is on it, the queen can move 0 squares.
 */

/*
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
  // get max possible queen moves
  let sumMoves = 0;
  // get moves on right
  let cellsRight = c_q - 1;
  // get moves on left
  let cellsLeft = n - c_q;
  // get moves above
  let cellsUp = n - r_q;
  // get moves below
  let cellsDown = r_q - 1;
  // get moves diagonal - up right
  sumMoves += Math.min(cellsRight, cellsUp);
  // get moves diagonal - down right
  sumMoves += Math.min(cellsRight, cellsDown);
  // get moves diagonal - up left
  sumMoves += Math.min(cellsLeft, cellsUp);
  // get moves diagonal - down left
  sumMoves += Math.min(cellsLeft, cellsDown);
  sumMoves += cellsRight + cellsLeft + cellsUp + cellsDown;

  let maxRowRight = 0;
  let maxRowLeft = 0;
  let maxColUp = 0;
  let maxColDown = 0;

  let maxUpRight = 0;
  let maxUpLeft = 0;
  let maxDownRight = 0;
  let maxDownLeft = 0;

  obstacles.forEach((ob) => {
    // ob = [r, c]
    if (ob[0] === r_q) {
      // obstacle is on the same row as queen
      if (ob[0] > r_q) {
        let squaresRemoved = n - ob[1] + 1;
        maxRowRight =
          squaresRemoved > maxRowRight ? squaresRemoved : maxRowRight;
      } else {
        let squaresRemoved = ob[1];
        maxRowLeft = squaresRemoved > maxRowLeft ? squaresRemoved : maxRowLeft;
      }
    } else if (ob[1] === c_q) {
      // obstacle is on the same column as queen
      if (ob[0] > r_q) {
        // if it is above queen
        let squaresRemoved = n - ob[0] + 1;
        maxColUp = squaresRemoved > maxColUp ? squaresRemoved : maxColUp;
      } else {
        // if it is below queen
        let squaresRemoved = ob[0];
        maxColDown = squaresRemoved > maxColDown ? squaresRemoved : maxColDown;
      }
    } else {
      // check if top right diagonal
      let rowDiff = Math.abs(r_q - ob[0]);
      let colDiff = Math.abs(c_q - ob[1]);
      if (rowDiff === colDiff) {
        // they are on the same diagonal
        let qCoordMin = Math.min(r_q, c_q);
        let obCoordMin = Math.min(ob[0], ob[1]);
        let squaresRemoved = Math.abs(qCoordMin - obCoordMin);
        if (ob[0] > r_q) {
          if (ob[1] > c_q) {
            // top right
            maxUpRight =
              squaresRemoved > maxUpRight ? squaresRemoved : maxUpRight;
          } else {
            // top left
            maxUpLeft = squaresRemoved > maxUpLeft ? squaresRemoved : maxUpLeft;
          }
        } else {
          if (ob[1] > c_q) {
            // down right
            maxDownRight =
              squaresRemoved > maxDownRight ? squaresRemoved : maxDownRight;
          } else {
            // down left
            maxDownLeft =
              squaresRemoved > maxDownLeft ? squaresRemoved : maxDownLeft;
          }
        }
      }
    }
  });
  sumMoves -= maxUpRight + maxUpLeft + maxDownRight + maxDownLeft;
  sumMoves -= maxRowRight + maxRowLeft + maxColUp + maxColDown;
  return sumMoves;
}
