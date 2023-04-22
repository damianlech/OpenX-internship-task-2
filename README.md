# OpenX-internship-task-2
Solution for OpenX internship task 2

Task 2
Using data from links below:
Users: https://fakestoreapi.com/users
Carts: https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07
Products: https://fakestoreapi.com/products
Implement a program which:
1. Retrieves user, product and shopping cart data
2. Creates a data structure containing all available product categories and the total value of
products of a given category
3. Finds a cart with the highest value, determines its value and full name of its owner
4. Finds the two users living furthest away from each other
A desirable part of a given solution is also a set of tests to verify its correctness.

------------------------------------------------------------------------------------------------------------

1. Program uses async IIFE function to retrieve the data from APIs and run functions to calculate the results
2. Iterate over products and save each category with sum of value in the prodcutList array
3. For every cart calculate total value and if its higher then value saved in highestValueCart - update it
4. Iterate trough every pair of users to find out the distance between them, Save users id, their fullname and the distance if it's highest yet

For tests, every calculating function inlcudes a number of assertions, as well as the main funciton throwing and error in the case of error during data fetch.

To Run:
----> node index.js <----
