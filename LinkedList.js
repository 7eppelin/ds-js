

// this is a circular doubly linked list


class LinkedList {
    // supports an arbitrary number of arguments
    // i.e. new LinkedList(2, 7, 5, ...) 
    // or new LinkedList(...someIterable)
    constructor(...values) {
        this.length = 0
        this.head = null
        this.tail = null

        this.push(...values)
    }

    unshift(...values) {
        this.addTo('head', ...values)
        return this
    }

    push(...values) {
        this.addTo('tail', ...values)
        return this
    }

    addTo(to, ...values) {
        values.forEach(value => {
            const node = this.#newNode(value)

            // if this is the first inserted elem
            if (!this.length) {
                if (to === 'head') {
                    this.tail = node
                } else if (to === 'tail') {
                    this.head = node
                }
                
            // otherwise update the tail.next and head.prev links
            } else {
                this.tail.next = node
                this.head.prev = node
            }

            this[to] = node;
            this.length++
        })
    }

    // removes the first elem
    shift() {
        return this.removeFrom('head')
    }

    // removes the last elem
    pop() {
        return this.removeFrom('tail')
    }

    removeFrom(from) {
        if (this.length === 0) return null

        // save the value so we'll be able to return it
        const el = this.head.value       

        // update this.tail link to the 2nd last elem
        if (from === 'head') {
            this.head = this.head.prev
        } else if (from === 'tail') {
            this.tail = this.tail.prev
        }

        // update the new head's prev link (it was pointing to the removed elem)
        this.head.prev = this.tail

        // update the tail's next link (it was pointing to the removed elem)
        this.tail.next = this.head

        this.length--
        return el
    }

    #newNode = value => ({
        prev: this.tail,
        value,
        next: this.head,
    });

    // enable it to be used as iterable 
    // e.g. in for..of loops
    [Symbol.iterator]() {
        const length = this.length
        let current = this.head
        let count = 0
        return {
            next() {
                if (count < length) {
                    const result = {
                        value: current.value,
                        done: false
                    }
                    current = current.next
                    count++
                    return result
                } else {
                    return { done: true }
                }
            }
        }
    }

    print() {
        let result = "LIST: ";
        let next
        for (let i = 0; i < this.length; i++) {
            if (i === 0) {
                result += `[ ${this.head.value} <=> `
                next = this.head.next

            } else if (i + 1 === this.length) {
                result += `${next.value} ]`

            } else {
                result += `${next.value} <=> `
                next = next.next
            }
        }
        console.log(result)
    }
}


// TEST

const list = new LinkedList(1)


list.unshift(2)
    .unshift(3, 4)
    .unshift(5, 6, 7, 8, 9, 10)

list.print()


const arr = [ ...list ]
console.log(arr)

list.push(666, 444, 222)
console.log(...list)
