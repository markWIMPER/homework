// import { sleep } from '../common/utils';
const sleep = t => {
	return new Promise(resolve => {
		setTimeout(resolve, t);
	});
};

let map = localStorage.map ? JSON.parse(localStorage.map) : new Array(10000).fill(0);
// 画图;
let container: HTMLElement = document.getElementById('container');

for (let i = 0; i < 100; i++) {
	for (let j = 0; j < 100; j++) {
		let cell = document.createElement('div');
		cell.classList.add('cell');

		if (map[i * 100 + j] == 1) {
			cell.style.backgroundColor = 'black';
		}
		cell.addEventListener('mouseover', () => {
			if (mouse) {
				if (clear) {
					cell.style.backgroundColor = '';
					map[i * 100 + j] = 0;
				} else {
					cell.style.backgroundColor = 'black';
					map[i * 100 + j] = 1;
				}
			}
		});
		container.appendChild(cell);
	}
}
let mouse = false;
let clear = false;

document.addEventListener('mousedown', e => {
	mouse = true;
	clear = e.which === 3;
});

document.addEventListener('mouseup', () => (mouse = false));
document.addEventListener('contextmenu', e => e.preventDefault());

// 使用队列（广度）
// const findPath = async (map, start, end) => {
// 	map = map.slice();

// 	// distance
// 	const distance = ([x, y]) => {
// 		return (x - end[0]) ** 2 + (y - end[1]) ** 2; // 比较的情况下不需要开根号
// 	};

// 	let queue = [start];
// 	// let collection = new Sorted([start], (a, b) => distance(a) - distance(b));
// 	// 起点/终点标记
// 	(container.children[start[1] * 100 + start[0]] as HTMLElement).style.backgroundColor = '#EA68DB';
// 	(container.children[end[1] * 100 + end[0]] as HTMLElement).style.backgroundColor = '#00A1FF';

// 	const insert = async ([x, y], pre) => {
// 		/**
// 		 * 两种边界情况
// 		 * 1、没有走到的点
// 		 * 2、超过边界
// 		 */
// 		if (map[100 * y + x] !== 0) return;
// 		if (x < 0 || y < 0 || x >= 100 || y >= 100) return;
// 		map[100 * y + x] = pre; //标记
// 		(container.children[y * 100 + x] as HTMLElement).style.backgroundColor = 'tomato';
// 		await sleep(1);
// 		queue.push([x, y]);
// 	};

// 	while (queue.length) {
// 		// 队列 入队出队
// 		/**
// 		 *
// 		 * pop unshift / push shift
// 		 */
// 		let [x, y] = queue.shift();
// 		if (x === end[0] && y === end[1]) {
// 			let path = [];
// 			while (x !== start[0] || y !== start[1]) {
// 				path.push([x, y]);
// 				await sleep(30);
// 				(container.children[y * 100 + x] as HTMLElement).style.backgroundColor = '#FFD500';
// 				[x, y] = map[y * 100 + x];
// 			}
// 			return path;
// 		}
// 		// 将当前点的上下左右进行入队

// 		await insert([x - 1, y], [x, y]); //左 -> (x-1, y)
// 		await insert([x + 1, y], [x, y]); //右 -> (x+1, y)
// 		await insert([x, y - 1], [x, y]); //上 -> (x, y-1)
// 		await insert([x, y + 1], [x, y]); //下 -> (x, y+1)

// 		//再将斜线的情况考虑到
// 		await insert([x - 1, y - 1], [x, y]); //左上
// 		await insert([x + 1, y - 1], [x, y]); //右上
// 		await insert([x - 1, y + 1], [x, y]); //左下
// 		await insert([x + 1, y + 1], [x, y]); //右下
// 	}
// 	return null;
// };

// 使用栈(深度)
const findPath = async (map, start, end) => {
	map = map.slice();
	let stack = [start];

	const insert = async ([x, y]) => {
		/**
		 * 两种边界情况
		 * 1、没有走到的点
		 * 2、超过边界
		 */
		if (map[100 * y + x] !== 0) return;
		if (x < 0 || y < 0 || x >= 100 || y >= 100) return;
		map[100 * y + x] = 2; //标记
		(container.children[y * 100 + x] as HTMLElement).style.backgroundColor = 'tomato';
		await sleep(5);
		stack.push([x, y]);
	};

	while (stack.length) {
		// 队列 入队出队
		/**
		 *
		 * pop unshift / push shift
		 */
		let [x, y] = stack.pop();
		if (x === end[0] && y === end[1]) return true;
		// 将当前点的上下左右进行入队

		await insert([x, y - 1]); //上 -> (x, y-1)
		await insert([x, y + 1]); //下 -> (x, y+1)
		await insert([x - 1, y]); //左 -> (x-1, y)
		await insert([x + 1, y]); //右 -> (x+1, y)
	}
	return false;
};

// findPath(map, [0, 0], [50, 50]);

const findPathNew = async (map, start, end, type = 1) => {
	map = map.slice();

	function distance([x, y]) {
		return (x - end[0]) ** 2 + (y - end[1]) ** 2;
	}
	let queue: any = [];
	switch (type) {
		case 1:
			queue = [start];
		case 2:
			queue = new Sorted([start], (a, b) => distance(a) - distance(b));
		case 3:
			queue = new BinaryHeap([start], (a, b) => distance(a) - distance(b));
	}

	// let queue = new Sorted([start], (a, b) => distance(a) - distance(b));
	// let queue = new BinaryHeap([start], (a, b) => distance(a) - distance(b));

	(container.children[start[1] * 100 + start[0]] as HTMLElement).style.backgroundColor = 'green';
	(container.children[end[1] * 100 + end[0]] as HTMLElement).style.backgroundColor = 'tomato';

	async function insert([x, y], pre) {
		if (map[100 * y + x] !== 0) return;

		if (x < 0 || y < 0 || x >= 100 || y >= 100) return;

		map[100 * y + x] = pre;
		(container.children[y * 100 + x] as HTMLElement).style.backgroundColor = 'lightgreen';
		// await sleep(1);
		queue.insert([x, y]);
	}

	while (queue.length) {
		let [x, y] = queue.take() || queue.shift();
		if (x === end[0] && y === end[1]) {
			let path = [];
			while (x !== start[0] || y !== start[1]) {
				path.push([x, y]);
				await sleep(30);
				(container.children[y * 100 + x] as HTMLElement).style.backgroundColor = 'pink';
				[x, y] = map[100 * y + x];
			}
			return path;
		}
		await insert([x - 1, y], [x, y]);
		await insert([x + 1, y], [x, y]);
		await insert([x, y - 1], [x, y]);
		await insert([x, y + 1], [x, y]);

		await insert([x - 1, y - 1], [x, y]);
		await insert([x + 1, y - 1], [x, y]);
		await insert([x - 1, y + 1], [x, y]);
		await insert([x + 1, y + 1], [x, y]);
	}
	// 起点/终点标记
	return null;
};

// 排序类 （n）
class Sorted {
	data: Array<Number>;
	compare: Function;
	constructor(data, compare) {
		this.data = data;
		this.compare = compare;
	}

	take(): any {
		if (!this.data.length) return;
		let min = this.data[0];
		let minIndex = 0;

		for (let i = 1; i < this.data.length; i++) {
			if (this.compare(this.data[i], min) < 0) {
				min = this.data[i];
				minIndex = i;
			}
		}
		this.data[minIndex] = this.data[this.data.length - 1];
		this.data.pop();
		return min;
	}
	insert(v) {
		this.data.push(v);
	}
	get length(): number {
		return this.data.length;
	}
}

// 排序类 - 使用二叉树 （lg（n））
class BinaryHeap {
	data: Array<Number>;
	compare: Function;
	constructor(data, compare) {
		this.data = data;
		this.compare = compare;
	}

	take(): any {
		if (!this.data.length) return;

		let min = this.data[0];
		let i = 0;

		// fix heap

		/**
		 *  父子对应关系
		 *  [0] || [1]  [2] || [3] [4] [5] [6]
		 *   8      6    7      1   3   -   2
		 */
		while (i < this.data.length) {
			// 需要考虑边界
			if (i * 2 + 1 >= this.data.length) break; // 左节点没有，代表该节点是最小叶子节点，直接返回
			if (i * 2 + 2 >= this.data.length) {
				this.data[i] = this.data[i * 2 + 1];
				i = i * 2 + 1; // 右节点不存在，代表该节点是最小叶子节点，修改当前层级后返回
				break;
			}
			// 在此节点下，比较左右节点谁大
			if (this.compare(this.data[i * 2 + 1], this.data[i * 2 + 2]) < 0) {
				this.data[i] = this.data[i * 2 + 1];
				i = i * 2 + 1;
			} else {
				this.data[i] = this.data[i * 2 + 2];
				i = i * 2 + 2;
			}
		}

		if (i < this.data.length - 1) {
			this.insertAt(i, this.data.pop());
		} else {
			this.data.pop();
		}

		return min;
	}

	insertAt(i, v) {
		this.data[i] = v;
		// 如果大于自己的父元素
		while (i > 0 && this.compare(v, this.data[Math.floor((i - 1) / 2)]) < 0) {
			this.data[i] = this.data[Math.floor((i - 1) / 2)];
			this.data[Math.floor((i - 1) / 2)] = v;
			i = Math.floor((i - 1) / 2);
		}
	}

	insert(v) {
		this.insertAt(this.data.length, v);
	}

	get length(): number {
		return this.data.length;
	}
}

document
	.querySelector('#queue')
	.addEventListener('click', () => findPathNew(map, [0, 0], [50, 50], 1));
document.querySelector('#stack').addEventListener('click', () => findPath(map, [0, 0], [50, 50]));
document
	.querySelector('#sorted')
	.addEventListener('click', () => findPathNew(map, [0, 0], [50, 50], 2));
document
	.querySelector('#BinaryHeap')
	.addEventListener('click', () => findPathNew(map, [0, 0], [50, 50], 3));
