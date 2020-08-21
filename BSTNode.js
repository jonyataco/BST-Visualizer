/**
 * Class that describes a node in the BST
 */
class BSTNode {
	/***
	 * Construction for a node.
	 * @param {number} key - Value for each node.
	 * @param {number} x - X value for each node to draw on canvas
	 * @param {number} y - V value for each node to draw on canvas
	 */
	constructor(data, x, y) {
		this.key = data;
		this.left = null;
		this.right = null;
		this.x = x;
		this.y = y;
	}
}

export { BSTNode }
