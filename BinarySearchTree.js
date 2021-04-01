

// in a Binary Search Tree
// all nodes of the root's left subtree are less than the root
// all nodes of the root's right subtree are greater than the root
// this applies to every internal node of a tree


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


class BinarySearchTree {
    #count = 0

    constructor(arr) {
        arr.forEach(el => this.insertRecursively(el))
    }

    get size() { 
        return this.#count 
    }

    insert(val) {
        const node = new Node(val);

        // special case, if inserting the 1st element
        if (!this.root) {
            this.root = node
            return this // enable chaining
        }

        let current = this.root

        while(true) {
            // go right
            if (val > current.value) {
                if (current.right) {
                    // if the right node exists, go deeper
                    current = current.right;
                    continue
                } else {
                    // if there's none, finish
                    current.right = node
                    return this
                }
            }

            // go left
            if (val < current.value) {
                if (current.left) {
                    // if the left node exists, go deeper
                    current = current.left
                } else {
                    // otherwise finish
                    current.left = node
                    return this
                }
            }
        }
    }

    insertRecursively(val, node = this.root) {
        if (!this.root) {
            this.root = new Node(val)
            this.#count++
            return this
        }

        if (!node) {
            this.#count++
            return new Node(val)
        }
        
        if (val > node.value) {
            node.right = this.insertRecursively(val, node.right)
        } else if (val < node.value) {
            node.left = this.insertRecursively(val, node.left)
        }

        if (node === this.root) return this // enable chaining
        return node
    }

    remove(val) {

    }

    search(val) {
        let node = this.root

        while (node) {
            if (node.value === val) return node

            if (val > node.value) {
                node = node.right
            } else {
                node = node.left
            }
        }
        return null
    }

    searchRecursively(val, node = this.root) {
        if (!node) return null
        if (val === node.value) return node

        if (val > node.value) {
            return this.search(val, node.right)
        } else {
            return this.search(val, node.left)
        }
    }

    printPath(val) {
        let node = this.root
        let path = ''

        while (true) {
            if (node === null) {
                path = 'not found'
                break
            }

            path += ` => ${node.value}`;

            if (val > node.value) {
                node = node.right;
            } else if (val < node.value) {
                node = node.left;
            } else break
        }
        console.log(path)
    }
}


// TEST


const data = [8, 3, 10, 6, 1, 14, 4, 7]
const tree = new BinarySearchTree(data)

/*
           8
        3    10
      1   6     14
         4  7
*/

tree.insert(9)
    .insertRecursively(2)

/*
           8
       3       10
    1     6   9  14
     2   4 7
*/

tree.printPath(2)      // 8 => 3 => 1 => 2
tree.printPath(4)       // 8 => 3 => 6 => 4
tree.printPath(9)       // 8 => 10 => 9
tree.printPath(777777)  // not found
