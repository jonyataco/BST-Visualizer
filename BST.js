import { BSTNode } from './BSTNode.js';
/**
 *  Class for the Binary Search Tree 
 */
class BST {
    static givenTree = [8,3,10,1,6,14,4,7,13];
	static radius = 25;

    constructor() {
        this.root = null;
    }

    /**
     * Inserts a given number into the BST.
     * @param {number} key - Data to be inserted in the BST
	 * @param {Object} canvas - The current canvas
     */
    insert(key, canvas) {
        if (this.root === null) {
            this.root = new BSTNode(key, canvas.width / 4, 40);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    
    /**
     * Helper function for insert in order to call recursively 
     * @param {Object} node - Node to call insertNode from
     * @param {number} key - Data to be inserted
	 * @param {number} modifier - Modifier that is used to change the visual
	 * 							  representation of BST
     */
    insertNode(node, key, modifier = 0) {
        if (key < node.key) {
            if (node.left === null) {
                node.left = new BSTNode(key, node.x - 100 + modifier, node.y + 100);
            }
            else {
				modifier += 20;
                this.insertNode(node.left, key, modifier);
            }
        }
        else {
            if (node.right === null) {
                node.right = new BSTNode(key, node.x + 100 - modifier, node.y + 100);
            }
            else {
				modifier += 20;
                this.insertNode(node.right, key, modifier);
            }
        }
    }


	/**
	 * Inserts a given array into the tree. By default it is the given tree
	 * from class
	 * @param {[]} array - Array to be inserted into array
	 * @param {Object} canvas - The current canvas
	 */
	insertGivenTree(array = BST.givenTree, canvas) {
        for (let data of array) {
            this.insert(data, canvas);
        }
    }

    /**
     * Searches for a given value recursively 
     * @param {Object} key - The node where to start searching from. 
	 * 						  By default, this will be the root of BST.
     * @param {Number} node - The data to search for.
     */
    search(key, ctx, canvas, node = this.root) {
		// This case only happens if the tree is empty
		if (node === null)
			return null;
	
		// Recursive search to find the key in the tree. Once it does it
		// returns the node
		if (key < node.key) {
			this.drawTreeWithCurrentNode(ctx, node);
			setTimeout(function() {
				ctx.clearRect(0,0, canvas.width, canvas.height)
				return this.search(key, ctx, canvas, node.left);
			}.bind(this), 1000);
		}
		else if (key > node.key) {
			this.drawTreeWithCurrentNode(ctx, node);
			setTimeout(function() {
				ctx.clearRect(0,0, canvas.width, canvas.height)
				return this.search(key, ctx, canvas, node.right);
			}.bind(this), 1000);
		}
		else {
			this.drawTreeWithCurrentNode(ctx, node);
			return node;
		}
    }

	searchKey(key, node = this.root) {
		if (node === null)
			return null;

		if (key < node.key) {
			return this.searchKey(key, node.left);
		}
		else if (key > node.key) {
			return this.searchKey(key, node.right);
		}
		else {
			return node;
		}
	}

    /**
     * Draws the tree on the given canvas context
     * @param {Object} ctx - Context from the canvas on the page
	 * @param {Number} node - Node to start drawing from
     */ 
    drawTree(ctx, node = this.root) {
		if (node === null) {
			return;
		}
		
		let fifoQueue = [];
		fifoQueue.push(node);

		while (fifoQueue.length > 0) {
			let frontQueue = fifoQueue[0];
			ctx.beginPath();
			ctx.arc(frontQueue.x, frontQueue.y, BST.radius, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.closePath();
			ctx.fillText(`${frontQueue.key}`, 
							frontQueue.x - 4,
				 			frontQueue.y + 4);
			if (frontQueue.left !== null) {
				ctx.beginPath();
				ctx.moveTo(frontQueue.x, frontQueue.y + BST.radius);
				ctx.lineTo(frontQueue.left.x, frontQueue.left.y - BST.radius);
				ctx.stroke();
				fifoQueue.push(frontQueue.left);
			}
			if (frontQueue.right !== null) {
				ctx.beginPath();
				ctx.moveTo(frontQueue.x, frontQueue.y + BST.radius);
				ctx.lineTo(frontQueue.right.x, frontQueue.right.y - BST.radius);
				ctx.stroke();
				fifoQueue.push(frontQueue.right);
			}

			let popped = fifoQueue.shift();
		}
    }

	/**
	 * Draws the tree with the currently selected node. Used for search
	 */
	drawTreeWithCurrentNode(ctx, currentNode, node = this.root) {
		if (node === null) {
			return;
		}
		
		let fifoQueue = [];
		fifoQueue.push(node);

		while (fifoQueue.length > 0) {
			let frontQueue = fifoQueue[0];
			if (frontQueue === currentNode) {
				ctx.beginPath();
				ctx.arc(frontQueue.x, frontQueue.y, BST.radius, 0, 2 * Math.PI);
				ctx.fillStyle = 'blue';
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
				ctx.fillStyle = 'white';
				ctx.strokeText(`${frontQueue.key}`, 
								frontQueue.x - 4,
								frontQueue.y + 4);
			}
			else {
				ctx.beginPath();
				ctx.arc(frontQueue.x, frontQueue.y, BST.radius, 0, 2 * Math.PI);
				ctx.stroke();
				ctx.closePath();
				ctx.fillStyle = 'black';
				ctx.fillText(`${frontQueue.key}`, 
								frontQueue.x - 4,
								frontQueue.y + 4);
			}

			if (frontQueue.left !== null) {
				ctx.beginPath();
				ctx.moveTo(frontQueue.x, frontQueue.y + BST.radius);
				ctx.lineTo(frontQueue.left.x, frontQueue.left.y - BST.radius);
				ctx.stroke();
				fifoQueue.push(frontQueue.left);
			}
			if (frontQueue.right !== null) {
				ctx.beginPath();
				ctx.moveTo(frontQueue.x, frontQueue.y + BST.radius);
				ctx.lineTo(frontQueue.right.x, frontQueue.right.y - BST.radius);
				ctx.stroke();
				fifoQueue.push(frontQueue.right);
			}

			let popped = fifoQueue.shift();
		}
	}

    /**
     * Prints the given tree in level order using a FIFO queue
     * @param {Object} node - The node to start print from.
     *                        By default it is the root of the root.
     */
    printLevelOrder(node = this.root) {
		if (node === null) {
			return;
		}

		let fifoQueue = [];
		fifoQueue.push(node);

		while (fifoQueue.length > 0) {
			// Make a copy of the front of the queue 
			let frontQueue = fifoQueue[0];
			console.log(frontQueue);

			if (frontQueue.left !== null) {
				fifoQueue.push(frontQueue.left);
			}
			if (frontQueue.right !== null) {
				fifoQueue.push(frontQueue.right);
			}

			let popped = fifoQueue.shift();
		}
    }


    /**
     * Returns the height of the given tree
     * @param {Object} node - The node to start calculating the height from.
     *                        By default it is the root of the tree.
     * @return {number} - Returns the height of the tree
     */
     height(node = this.root) {
        if (node === null) {
            return 0;
        }
        else {
            let lHeight = this.height(node.left);
            let rHeight = this.height(node.right);

            if (lHeight > rHeight) {
                return (lHeight + 1);
            }
            else {
                return (rHeight + 1);
            }
        }
     }

	/**
	 * Delete a given key
	 * @param {number} key - key to be deleted from tree
	 * @param {object} node - where to start delete process from. By default
	 * 						  it is root.
	 */
	delete(key, node = this.root) {
		if (node === null) {
			return null;
		}

		// Now trying to find the position of the node to delete
		if (key < node.key) {
			node.left = this.delete(key, node.left);
			return node;
		}
		else if (key > node.key) {
			node.right = this.delete(key, node.right);
			return node;
		}

		// Now that we have found the node
		
		// If the node has no children
		if (node.left === null && node.right === null) {
			node = null;
			return node;
		}

		// Deleting node with one child
		if (node.left === null) {
			node = node.right;
			return node;
		} else if (node.right === null) {
			node = node.left;
			return node;
		}

		// Deleting node with two children
		let minNode = this.findMin(node.right);
		node.key = minNode.key;

		node.right = this.delete(minNode.key, node.right);
		return node;
	}

	findMin(node) {
		if (node.left === null)
			return node;
		else 
			return this.findMin(node.left);
	}
}

export { BST };
