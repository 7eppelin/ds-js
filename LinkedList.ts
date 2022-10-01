// circular doubly linked list

type ListNode<T> = {
	prev: ListNode<T>;
	value: T;
	next: ListNode<T>;
};

enum ListEnd {
	Head = "head",
	Tail = "tail",
}

type NonEmptyLinkedList<T> = LinkedList<T> & {
	head: ListNode<T>;
	tail: ListNode<T>;
};

class LinkedList<T> {
	length = 0;
	head: ListNode<T> | null = null;
	tail: ListNode<T> | null = null;

	constructor(...values: T[]) {
		this.push(...values);
	}

	isPopulated(): this is NonEmptyLinkedList<T> {
		return this.length > 0;
	}

	unshift(...values: T[]) {
		this.addTo(ListEnd.Head, ...values);
		return this;
	}

	push(...values: T[]) {
		this.addTo(ListEnd.Tail, ...values);
		return this;
	}

	addTo(end: ListEnd, ...values: T[]) {
		values.forEach((value) => {
			const node = {
				prev: this.tail as ListNode<T>,
				value,
				next: this.head as ListNode<T>,
			};

			if (this.isPopulated()) {
				this.tail.next = node;
				this.head.prev = node;
				this[end] = node;
			} else {
				this.tail = node;
				this.head = node;
			}

			this.length++;
		});
	}

	shift() {
		return this.removeFrom(ListEnd.Head);
	}

	pop() {
		return this.removeFrom(ListEnd.Tail);
	}

	removeFrom(end: ListEnd) {
		if (!this.isPopulated()) {
			return null;
		}

		// save the value so we'll be able to return it
		const deleted = this[end].value;

		if (end === ListEnd.Head) {
			this.head = this.head.next;
		} else {
			this.tail = this.tail.prev;
		}

		this.head.prev = this.tail;
		this.tail.next = this.head;

		this.length--;
		return deleted;
	}

	// enable the list to be used as iterable
	[Symbol.iterator]() {
		if (!this.isPopulated()) {
			return {
				next: () => ({
					done: true,
					value: "make ts happy",
				}),
			};
		}

		const length = this.length;
		let current = this.head;
		let count = 0;

		return {
			next() {
				if (count < length) {
					const result = { value: current.value };
					current = current.next;
					count++;
					return result;
				} else {
					return {
						done: true,
						value: "make ts happy",
					};
				}
			},
		};
	}
}

// TEST

const list = new LinkedList<number | string>("first");

list.unshift(1).push(5, 6, 7, 8, 9, 10).unshift(1, 1);

console.log(...list);

console.log(list.pop());
list.pop();
list.pop();
list.shift();
list.shift();
console.log(list.shift());

console.log(...list);
