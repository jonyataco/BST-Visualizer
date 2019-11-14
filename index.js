import { BST } from './BST.js';

function generateRandomArray(min, max, size) {
	min = Math.ceil(min);
	max = Math.floor(max);
	let array = [];
	for (let i = 0; i < size; i++) {
		let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
		array.push(randomNum);
	}
	console.log(array);
}

let canvas = document.getElementById("app");
let ctx = canvas.getContext("2d");
let tree = new BST();
generateRandomArray(1, 100, 10);
tree.insertGivenTree();
tree.printLevelOrder();
tree.insert(5);
tree.printLevelOrder();
tree.drawTree(ctx);
