/**
 * 119. Pascal's Triangle II
Easy

Given a non-negative index k where k ≤ 33, return the kth index row of the Pascal's triangle.

Note that the row index starts from 0.


In Pascal's triangle, each number is the sum of the two numbers directly above it.

Example:

Input: 3
Output: [1,3,3,1]
Follow up:

Could you optimize your algorithm to use only O(k) extra space?
 */

 /**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  const row = [1];
  
  for (let i = 0; i <= rowIndex; i++) {
      for (let j = i; j > 0; j--) {
          if (i === j) {
              row.push(1);
          } else {
              row[j] = row[j] + row[j - 1]
          }
      }
  }
  return row;
};