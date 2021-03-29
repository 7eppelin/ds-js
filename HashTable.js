

// utils

const hash = (key, size) => {
    let index = 0
    for (let i = 0; i < key.length; i++) {
        index += (key.charCodeAt(i) * 31) ** (key.length - i + 1)
    }
    return index % size
}

const isPrime = num => {
    for (let i = 3; i <= Math.ceil(num / 2); i++) {
        if (num % i === 0) return false
    }
    return true
}

const findNextPrime = start => {
    let num = start
    // make sure to only iterate over odd numbers
    if (num % 2 === 0) num++
    while (!isPrime(num)) {
        num += 2
    }
    return num
}


/* I will use chaining to resolve collisions
an array will represent the hash table
each element in the array will either be undefined or an array,
that will hold the data in the format [ ['key', 'value'], [...], ]
so the structure will look like this:

table: [
    0: [ ["key", "value"], ["key", "value"] ],
    1: undefined,
    2: [ ["key", "value"] ],
    3: undefined,
    ...
]

*/

class HashTable {
    // create an array of fixed lenght. Start with 13 because why not.
    table = new Array(13)
    #size = 0

    #resize = () => {
        const newSize = findNextPrime(this.table.length * 2)
        const newTable = new Array(newSize)

        // rehash all elems
        this.table.forEach(bucket => {
            for (let [key, val] of bucket) {
                const index = hash(key, newSize)
                if (!newTable[index]) newTable[index] = []
                newTable[index].push([key, val])
            }
        })
        this.table = newTable
    }

    add(key, val) {
        // resize the table if needed
        if (this.#size > this.table.length) {
            this.#resize()
        }

        this.#size++

        const index = hash(key, this.table.length)
        if (!this.table[index]) this.table[index] = []
        this.table[index].push([key, val])
    }

    del(key) {
        const index = hash(key, this.table.length)
        const bucket = this.table[index]
        bucket.filter(el => key !== el[0]) // el = [ "key", "value" ]
        this.#size--
    }

    find(key) {
        const index = hash(key, this.table.length)
        const bucket = this.table[index]
        const item = bucket.find(el => el[0] === key)
        return item ? item[1] : null
    }

    get size() {
        return this.#size
    }

    print() {
        console.log(this.table)
    }
}


// TEST

const table = new HashTable()

for (let i = 0; i < 200; i++) {
    const key = Math.random().toString(36).slice(2);
    const value = Math.random().toString(36).slice(2);
    table.add(key, value)
}

table.print()

console.log('table size: ' + table.size)
console.log('length: ' + table.table.length)