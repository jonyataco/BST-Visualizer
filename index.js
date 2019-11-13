import { BST } from './BST.js';

let canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");
let tree = new BST();
tree.insertGivenTree();
tree.printLevelOrder();
tree.drawTree(ctx);
/*
ctx.beginPath();
ctx.arc(400, 35, 30, 0, 2 * Math.PI);
ctx.stroke();
ctx.closePath();
ctx.beginPath();
ctx.arc(330, 135, 30, 0, 2 * Math.PI);
ctx.stroke();
*/
