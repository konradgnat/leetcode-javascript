/**
Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Example 1:

Input: [1,3,4,2,2]
Output: 2
Example 2:

Input: [3,1,3,4,2]
Output: 3
Note:

You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.
 */

/**
 * Tortoise and the Hare soulution - the floyd circle algorithm
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  if (nums === null || nums.length < 1) return -1;
  let tortoise = nums[0];
  let hare = nums[0];
  do {
      tortoise = nums[tortoise];
      hare = nums[nums[hare]];
  } while (tortoise != hare);

  let ptr1 = nums[0];
  let ptr2 = tortoise;
  while (ptr1 !== ptr2) {
      ptr1 = nums[ptr1];
      ptr2 = nums[ptr2];
  }
  return ptr1;
};

/**
 * time O(n^2) space O(n) solution
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function(nums) {
  if (nums === null || nums.length < 1) return -1;
  for (let i = 0; i < nums.length; i++) {
      for (let j = 0; j < nums.length; j++) {
          if (i !== j && nums[i] === nums[j]) return nums[i];
      }
  }
};