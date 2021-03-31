


class BinaryTree {
    root = null
    size = 0

    constructor(arr) {
        this.root = this.fromArray(arr)
    }

    getHeight(node) {
        if (!node) return 0
        //if (!node.left && !node.right) return 0

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

    // create a binary tree from an array
    fromArray(arr, node, i = 0) {
        if (i < arr.length) {
            node = { value: arr[i] }
            this.size++
            node.left = this.fromArray(arr, node.left, 2 * i + 1)
            node.right = this.fromArray(arr, node.right, 2 * i + 2)
        }
        return node
    }

    static isComplete(root, index = 0, size = this.getSize(root)) {
        if (!root) return true

        if (index >= size) return false

        // in complete binary trees the left child node will always have
        // index = 2*index + 1, where index is the index of the parent
        // and the right node's index = 2*index + 2
        return this.isComplete(root.left, 2*index + 1, size) && 
            this.isComplete(root.right, 2*index + 2, size)
    }

    static getSize(root) {
        if (!root) return 0;
        return 1 + this.getSize(root.left) + this.getSize(root.right)
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
console.log(BinaryTree.isComplete(tree.root))
