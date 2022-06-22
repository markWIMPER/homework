let regexp = /([0-9\.]+)|([  ])|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g;

let dictionary = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/'];

const tokenize = source => {
	let result = null;
	let lastIndex = 0;

	do {
		lastIndex = regexp.lastIndex;
		result = regexp.exec(source); //索引从1开始
		if (!result) break;

		for (let i = 0; i < dictionary.length; i++) {
			if (result[i + 1]) console.log(dictionary[i]);
		}
		console.log(result[0]);
	} while (result);
};

// tokenize('1024 + 10 * 25');

// ------------------------------------------------------------------------------
/**
 * [
    "abc",
    "b"
]
*/

let regexp2 = /a(b)c/;
// console.log(regexp2.exec('abc'));

/**
 * [
    "abc"
  ]
*/

let regexp3 = /a(?:b)c/;
// console.log(regexp3.exec('abc'));

// -------------------------使用异步编程------------------------------
/**
 * {type: 'Number', value: '1024'}
 * {type: 'Whitespace', value: ' '}
 * {type: '+', value: '+'}
 * {type: 'Whitespace', value: ' '}
 * {type: 'Number', value: '10'}
 * {type: 'Whitespace', value: ' '}
 * {type: '*', value: '*'}
 * {type: 'Number', value: '25'}
 */

function* tokenize2(source) {
	let result = null;
	let lastIndex = 0;

	while (true) {
		// 匹配
		lastIndex = regexp.lastIndex;
		result = regexp.exec(source); //索引从1开始

		// 判断
		if (!result) break;

		// 在识别字符以外
		if (regexp.lastIndex - lastIndex > result[0].length)
			throw new Error(
				'Unexpected token"' +
					source.slice(lastIndex, regexp.lastIndex - lastIndex - result[0].length) +
					'"!'
			);

		// 生成token
		let token = {
			type: null,
			value: null
		};

		for (let i = 0; i < dictionary.length; i++) {
			if (result[i + 1]) token.type = dictionary[i];
		}

		token.value = result[0];
		yield token;
	}

	yield { type: 'EOF' };
}

// for (let token of tokenize2('1024 + 10 * 25')) {
// 	console.log(token);
// }

const Expression = source => {
	//
};

const AdditiveExpression = source => {
	if (source[0].type === 'Number') {
		MultiplicativeExpression(source);
		return AdditiveExpression(source);
	}
	if (source[0].type === 'MultiplicativeExpression') {
		let node = {
			type: 'AdditiveExpression',
			children: [source.shift()]
		};
		source.unshift(node);
		return AdditiveExpression(source);
	}
	if (source[0].type === 'AdditiveExpression' && source.length > 1 && source[1].type === '+') {
		let node = {
			type: 'AdditiveExpression',
			children: [source.shift(), source.shift()]
		};
		MultiplicativeExpression(source);
		node.children.push(source.shift());
		source.unshift(node);
		return AdditiveExpression(source);
	}

	if (source[0].type === 'AdditiveExpression' && source.length > 1 && source[1].type === '-') {
		let node = {
			type: 'AdditiveExpression',
			children: [source.shift(), source.shift()]
		};
		MultiplicativeExpression(source);
		node.children.push(source.shift());
		source.unshift(node);
		return AdditiveExpression(source);
	}

	if (source[0].type === 'AdditiveExpression') {
		return source[0];
	}
};

const MultiplicativeExpression = source => {
	if (source[0].type === 'Number') {
		let node = {
			type: 'MultiplicativeExpression',
			children: source.shift()
		};
		source.unshift(node);
		return MultiplicativeExpression(source);
	}

	if (
		source[0].type === 'MultiplicativeExpression' &&
		source.length > 1 &&
		source[1].type === '*'
	) {
		let node = {
			type: 'MultiplicativeExpression',
			children: [source.shift(), source.shift(), source.shift()]
		};
		source.unshift(node);
		return MultiplicativeExpression(source);
	}

	if (
		source[0].type === 'MultiplicativeExpression' &&
		source.length > 1 &&
		source[1].type === '/'
	) {
		let node = {
			type: 'MultiplicativeExpression',
			children: [source.shift(), source.shift(), source.shift()]
		};
		source.unshift(node);
		return MultiplicativeExpression(source);
	}

	if (source[0].type === 'MultiplicativeExpression') {
		return source[0];
	}
};

let source = [];

for (let token of tokenize2('5 + 1024 * 2')) {
	if (token.type !== 'Whitespace' && token.type !== 'LineTerminator') source.push(token);
}
console.log(AdditiveExpression(source));
