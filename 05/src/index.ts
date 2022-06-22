class Trie {
	root = null;
	constructor() {
		this.root = Object.create(null);
	}
	insert(word) {
		let node = this.root;
		for (let c of word) {
			// 没有对象创建对象
			if (!node[c]) node[c] = Object.create(null);
			// 有对象直接替换
			node = node[c];
		}
		// 处理特殊字符
		if (!('$' in node)) node['$'] = 0;
		node['$']++;
	}
	most() {
		let max = 0;
		let word = null;
		let visit = (node, word) => {
			if (node.$ && node.$ > max) {
				//
				max = node.$;
			}
		};
	}
}

const randomWord = (length = 0) => {
	let s = '';
	for (let i = 0; i < length; i++) {
		s += String.fromCharCode(Math.random() * 26 + 'a'.charCodeAt(0));
	}
	return s;
};

let trie = new Trie();

for (let i = 0; i < 1000; i++) {
	trie.insert(randomWord(4));
}

// ____________________LR(0)______________________________

const parse = source => {
	let stack = [];
	// debugger;
	for (let c of source) {
		if (c === '(' || c === '[' || c === '{') stack.push(c);

		if (c === ')') {
			if (stack[stack.length - 1] === '(') stack.pop();
			else return false;
		}

		if (c === ']') {
			if (stack[stack.length - 1] === '[') stack.pop();
			else return false;
		}

		if (c === '}') {
			if (stack[stack.length - 1] === '{') stack.pop();
			else return false;
		}
	}
	if (stack.length === 0) {
		return true;
	} else {
		return false;
	}
};

// console.log(parse('(a)'), parse('(a'));

// ----------------KMP---------------

// Version_Classic
const find = (source, pattern) => {
	for (let i = 0; i < source.length; i++) {
		let matched = true;
		for (let j = 0; j < source.length; j++) {
			if (source[i + j] !== pattern) {
				matched = true;
				break;
			}
		}
		if (matched) {
			return true;
		}
	}
	return false;
};

// console.log(find('abcxyz', 'xy')); -> true

// Effective
const find2 = (source, pattern) => {
	let table = new Array(pattern.length).fill(0);

	let k = 0;
	for (let j = 1; j < pattern.length; j++) {
		if (pattern[j] === pattern[k]) {
			k++;
		}
		table[j] = k;
	}
	console.log(table);

	let j = 0;
	for (let i = 0; i < source.length; i++) {
		console.log(source[i], pattern[j], j);
		if (source[i] === pattern[j]) {
			j++;
		} else {
			while (source[i] !== pattern[j] && j > 0) {
				j = table[j - 1];
			}
			if (source[i] === pattern[j]) {
				j++;
			} else {
				j = 0;
			}
		}
		if (j === pattern.length) {
			return true;
		}
	}
	return false;
};

console.log(find2('abcabcabx', 'abcabx'));

//------------------------------------------
const wildcard = (source, pattern) => {
	let startCount = 0;
	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] === '*') startCount++;
	}
	if (startCount === 0) {
		let matched = true;
		for (let i = 0; i < pattern.length; i++) {
			if (pattern[i] !== source[i] && pattern[i] !== '?') return false;
		}
		return;
	}

	let i = 0;
	let j = 0;

	for (let i = 0; pattern[i] !== '*'; i++) {
		if (pattern[i] !== source[i] && pattern[i] !== '?') return false;
	}

	let lastIndex = i;

	for (let p = 0; p < startCount - 1; p++) {
		i++;
		let subPattern = '';
		while (pattern[i] !== '*') {
			subPattern += pattern[i];
		}

		let reg = new RegExp(subPattern.replace(/\?/g, '[\\s\\S]'));
		reg.lastIndex = lastIndex;

		console.log(reg.exec(source));

		lastIndex = reg.lastIndex;
	}

	for (let j = 0; j <= source.length - lastIndex && pattern[pattern.length - j] !== '*'; j--) {
		if (
			pattern[pattern.length - j] !== source[source.length - j] &&
			pattern[pattern[pattern.length - j]] !== '?'
		)
			return false;
	}
	return true;
};

wildcard('abcabcabx', 'a*b*?x*c');
