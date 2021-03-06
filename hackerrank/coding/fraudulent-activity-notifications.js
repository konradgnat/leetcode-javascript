/**
 * HackerLand National Bank has a simple policy for warning clients about possible fraudulent account activity. If the amount spent by a client on a particular day is greater than or equal to  the client's median spending for a trailing number of days, they send the client a notification about potential fraud. The bank doesn't send the client any notifications until they have at least that trailing number of prior days' transaction data.

Given the number of trailing days  and a client's total daily expenditures for a period of  days, find and print the number of times the client will receive a notification over all  days.

For example,  and . On the first three days, they just collect spending data. At day , we have trailing expenditures of . The median is  and the day's expenditure is . Because , there will be a notice. The next day, our trailing expenditures are  and the expenditures are . This is less than  so no notice will be sent. Over the period, there was one notice sent.

Note: The median of a list of numbers can be found by arranging all the numbers from smallest to greatest. If there is an odd number of numbers, the middle one is picked. If there is an even number of numbers, median is then defined to be the average of the two middle values. (Wikipedia)

Function Description

Complete the function activityNotifications in the editor below. It must return an integer representing the number of client notifications.

activityNotifications has the following parameter(s):

expenditure: an array of integers representing daily expenditures
d: an integer, the lookback days for median spending
Input Format

The first line contains two space-separated integers  and , the number of days of transaction data, and the number of trailing days' data used to calculate median spending. 
The second line contains  space-separated non-negative integers where each integer  denotes .

Constraints

Output Format

Print an integer denoting the total number of times the client receives a notification over a period of  days.

Sample Input 0

9 5
2 3 4 2 3 6 8 4 5
Sample Output 0

2
Explanation 0

We must determine the total number of  the client receives over a period of  days. For the first five days, the customer receives no notifications because the bank has insufficient transaction data: .

On the sixth day, the bank has  days of prior transaction data, , and  dollars. The client spends dollars, which triggers a notification because : .

On the seventh day, the bank has  days of prior transaction data, , and  dollars. The client spends  dollars, which triggers a notification because : .

On the eighth day, the bank has  days of prior transaction data, , and  dollars. The client spends dollars, which does not trigger a notification because : .

On the ninth day, the bank has  days of prior transaction data, , and a transaction median of  dollars. The client spends  dollars, which does not trigger a notification because : .

Sample Input 1

5 4
1 2 3 4 4
Sample Output 1

0
There are  days of data required so the first day a notice might go out is day . Our trailing expenditures are  with a median of  The client spends  which is less than  so no notification is sent.
 */

 
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function activityNotifications(expenditure, d) {
    // since any single expenditure[i] is <= 200, create array to track by index
    const exp = new Array(201).fill(0);
    let n = 0, i = 0, l = expenditure.length
    // since d could be even or odd, get the median alwasy the same way
    // by this method, if d is odd, med1 and med2 are the same, so getting average
    // of the two results in same number, if d is even, return two numbers
    // to get avarage of
    const med1 = Math.floor((d - 1) / 2), med2 = Math.ceil((d - 1) / 2);
    // fill exp array with first d numbers
    while (i < d) {
        exp[expenditure[i]]++;
        i++;
    }
    // iterate over expenditures array
    for (i; i < l; i++) {
        // get the median number
        let c = (getMedVal(exp, med1) + getMedVal(exp, med2)) / 2;
        // check if notice is made
        if (expenditure[i] >= c * 2) n++;
        // remove last expenditure from exp array, add new one
        exp[expenditure[i-d]]--;
        exp[expenditure[i]]++;
    }
    return n;
}
/**
 * {Int[]} exp array where index is the expenditure, value is the frequency
 * {Int} m one of the median indices of the current array under consideration
 */
function getMedVal(exp, m) {
    let j = 0, k = 0;
    for (j, k; k <= m; j++) {
        // increment k by number of seen expenditures
        // when k is equal to given m 'median' index
        // return the current index, minus one for the loop
        // increment
        k += exp[j];
    }
    return j-1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nd = readLine().split(' ');

    const n = parseInt(nd[0], 10);

    const d = parseInt(nd[1], 10);

    const expenditure = readLine().split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    let result = activityNotifications(expenditure, d);

    ws.write(result + "\n");

    ws.end();
}
