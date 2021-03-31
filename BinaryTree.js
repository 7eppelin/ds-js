class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    root = null
    size = 0

    constructor(arr) {
        this.root = this.fromArray(arr)
    }

    getHeight(node) {
        if (!node) return 0
        if (!node.left && !node.right) return 0

        const left = this.getHeight(node.left)
        const right = this.getHeight(node.right)
        return 1 + Math.max(left, right)
    }

    // is it a full binary tree? (every node has either 2 or 0 children)
    isFull(root = this.root) {
        if (!root) return true
        if (!root.left && !root.right) return true

        if (root.left && root.right) {
            return this.isFull(root.left) && this.isFull(root.right)
        }

        return false
    }

    // is it a perfect binary tree? (every node has 2 child nodes, all leaves are at the same level)
    isPerfect() {
        if (!this.root) return true
        const height = this.getHeight(this.root)
        // in a perfect BT the amount of nodes = 2 ** (tree's height + 1) - 1
        return this.size === 2**(height + 1) - 1
    }

    // a BT in which the height of the left and right subtree of any node differ by not more than 1
    isBalanced() {
        const left = this.getHeight(this.root.left);
        const right = this.getHeight(this.root.right);
        return Math.abs(left - right) <= 1
    }

    isComplete(root, index = 0) {
        if (!root) return true

        if (index >= this.size) return false

        // in complete binary trees every node's left child will always have
        // index = 2*parentIndex + 1, and the right node's index = 2*parentIndex + 2
        return this.isComplete(root.left, 2*index + 1) && 
            this.isComplete(root.right, 2*index + 2)
    }

    // create a complete binary tree from an array
    fromArray(arr, node, i = 0) {
        if (i < arr.length) {
            node = new Node(arr[i])
            this.size++
            node.left = this.fromArray(arr, node.left, 2 * i + 1)
            node.right = this.fromArray(arr, node.right, 2 * i + 2)
        }
        return node
    }
}



// TEST

const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32,
]

const tree = new BinaryTree(data)

console.log(tree.root)

console.log(tree.isFull())
console.log(tree.isPerfect())
console.log(tree.isBalanced())
console.log(tree.isComplete())
