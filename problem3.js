import { BST } from './BST.js';

// Searching for the key 6 in the given tree
let canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");
let tree = new BST();
tree.insertGivenTree(BST.givenTree, canvas);
console.log("The current tree printed in level order");
tree.printLevelOrder();
console.log("Now we are going to delete 6 from the tree");
tree.delete(6);
console.log("The new tree printed in level order is");
tree.printLevelOrder();
