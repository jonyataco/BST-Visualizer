import { BST } from './BST.js';

// Setup for canvas
const headerElement = document.getElementById("header");
let canvas = document.getElementById("app");
let viewportHeight = window.innerHeight - headerElement.scrollHeight;
let viewportWidth = headerElement.scrollWidth;
canvas.width = viewportWidth * 2;
canvas.height = viewportHeight * 2;
canvas.style.width = viewportWidth + "px";
canvas.style.height = viewportHeight + "px";
let ctx = canvas.getContext("2d");
canvas.getContext('2d').scale(window.devicePixelRatio, window.devicePixelRatio);

// Setting up the binary tree
let tree = new BST();
tree.insertGivenTree(BST.givenTree, canvas);

function resizeCanvas() {
	let newHeight = window.innerHeight - headerElement.scrollHeight;
	let newWidth = headerElement.scrollWidth;
	canvas.width = newWidth * 2;
	canvas.height = newHeight * 2;
	canvas.style.width = newWidth + "px";
	canvas.style.height = newHeight + "px";
}

document.getElementById("problem1").addEventListener("click", function (){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	console.log("clicking problem 1!");
	tree.search(6, ctx, canvas);
});

document.getElementById("problem2").addEventListener("click", function (){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tree.insert(5, canvas);
	tree.drawTree(ctx);
});

document.getElementById("problem3").addEventListener("click", function (){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	tree.delete(6);
	tree.drawTree(ctx);
});

tree.drawTree(ctx);

window.onresize = resizeCanvas;
