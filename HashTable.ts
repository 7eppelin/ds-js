// utils

const HASH_PRIME = 31;

const hash = (entryKey: string, tableSize: number) => {
	let index = 0;

	for (let i = 0; i < entryKey.length; i++) {
		index += (entryKey.charCodeAt(i) * HASH_PRIME) ** (entryKey.length - i + 1);
	}

	return index % tableSize;
};

const isPrime = (num: number) => {
	for (let i = 3; i <= Math.ceil(num / 2); i++) {
		if (num % i === 0) {
			return false;
		}
	}

	return true;
};

const findNextPrime = (start: number) => {
	let num = start;

	// make sure to only iterate over odd numbers
	if (num % 2 === 0) {
		num += 1;
	}

	while (!isPrime(num)) {
		num += 2;
	}

	return num;
};

// hash table

type Entry = [string, string];
type Bucket = Entry[];
type Table = Bucket[];

const STARTING_TABLE_LENGTH = 13;

class HashTable {
	table: Table = new Array(STARTING_TABLE_LENGTH);
	#size = 0;

	#resize = () => {
		const newSize = findNextPrime(this.table.length * 2);
		const newTable = new Array(newSize);

		// rehash all existing elems
		this.table.forEach((bucket) => {
			for (const [key, val] of bucket) {
				const index = hash(key, newSize);

				if (!newTable[index]) {
					newTable[index] = [];
				}

				newTable[index].push([key, val]);
			}
		});

		this.table = newTable;
	};

	add(key: string, val: string) {
		if (this.#size > this.table.length) {
			this.#resize();
		}

		this.#size++;

		const index = hash(key, this.table.length);

		if (!this.table[index]) {
			this.table[index] = [];
		}

		this.table[index].push([key, val]);
	}

	del(key: string) {
		const index = hash(key, this.table.length);

		const bucket = this.table[index];
		bucket.filter((el) => key !== el[0]);

		this.#size--;
	}

	find(key: string) {
		const index = hash(key, this.table.length);

		const bucket = this.table[index];
		const item = bucket.find((el) => el[0] === key);

		return item ? item[1] : null;
	}

	get size() {
		return this.#size;
	}

	print() {
		console.log(this.table);
	}
}

// TEST

const table = new HashTable();

for (let i = 0; i < 200; i++) {
	const key = Math.random().toString(36).slice(4);
	const value = Math.random().toString(36).slice(4);

	table.add(key, value);
}

table.print();

console.log("table size: " + table.size);
