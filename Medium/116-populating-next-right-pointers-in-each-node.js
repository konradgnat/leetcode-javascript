/**
 * 116. Populating Next Right Pointers in Each Node
Medium


You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

 

Follow up:

You may only use constant extra space.
Recursive approach is fine, you may assume implicit stack space does not count as extra space for this problem.
 

Example 1:



Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
 

Constraints:

The number of nodes in the given tree is less than 4096.
-1000 <= node.val <= 1000
 */

 /**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * Not constant space, first attempt.
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    const levelsArr = [];
    let levelNum = 0;
    createLevelsArr(root, levelsArr, levelNum);
    levelsArr.forEach(level => {
      for (let i = 0, len = level.length; i < len; i++) {
        if (i === len - 1) {
          level[i].next = null;
        } else {
          level[i].next = level[i + 1];
        }
      }
    });
    return root;
};

const createLevelsArr = (root, arr, levelNum) => {
  if (!root) {
    return;
  }
  if (arr[levelNum]) {
    arr[levelNum].push(root);
  } else {
    arr[levelNum] = [root];
  }
  createLevelsArr(root.left, arr, levelNum + 1);
  createLevelsArr(root.right, arr, levelNum + 1);
}

/**
 * Time: O(n)
 * Space: O(1)
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  recursiveConnect(root);
  return root;
};

const recursiveConnect = root => {
  if (!root || !root.left) return;
  root.left.next = root.right;
  root.right.next = root.next ? root.next.left : null;

  recursiveConnect(root.left);
  recursiveConnect(root.right);
}
