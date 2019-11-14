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
     */
    insert(key) {
        if (this.root === null) {
            this.root = new BSTNode(key, 400, 35);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    
    /**
     * Helper function for insert in order to call recursively 
     * @param {Object} node - Node to call insertNode from
     * @param {number} key - Data to be inserted
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

	insertGivenTree(array = BST.givenTree) {
        for (let data of array) {
            this.insert(data);
        }
    }

    /**
     * Searches for a given value recursively 
     * @param {Object} node - The node where to start searching from. 
	 * 						  By default, this will be the root of BST.
     * @param {Number} key - The data to search for.
     */
    search(node = this.root, key) {
        if (key === node.key || node === null) {
            return node;
        }
        else if (key > node.key) {
            this.search(node.right, key);
        }
        else if (key < node.key) {
            this.search(node.left, key);
        }
    }

    /**
     * Draws the tree on the given canvas context
     * @param {Object} ctx - Context from the canvas on the page
	 * @param {Number} offset - Offset in order to draw without overlap
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
     * Prints the given tree in level order using a FIFO queue
     * @param {Object node} - The node to start print from.
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
}

export { BST };
