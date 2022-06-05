import { check, willWin, bestChoice } from './utils';

/**
 * 0 -> 没有棋子
 * 1 -> O
 * 2 -> X
 */
let pattern = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
];

/**
 * 落子方
 * 默认 1 -> O
 */
let playX = 1;

// 落子
const move = (x: number, y: number) => {
	if (!pattern[y][x]) {
		pattern[y][x] = playX;
		if (check(pattern, playX)) {
			alert(playX == 2 ? 'X is winner!' : 'O is winner!');
			cleanBoard();
		}
		playX = 3 - playX;
		show(pattern);
		// if (willWin(pattern, playX)) {
		// 	//
		// 	console.log(playX == 2 ? 'X will winner!' : 'O will winner!');
		// }
		computerMove();
	}
};

// 渲染棋盘
const show = (pattern, size = 3) => {
	// 获取棋盘
	let board = document.getElementById('Board');
	board.innerHTML = '';
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			let cell = document.createElement('div');
			cell.classList.add('cell');
			cell.innerText = pattern[j][i] == 2 ? 'X' : pattern[j][i] == 1 ? 'O' : '';
			cell.addEventListener('click', () => move(i, j));
			board.appendChild(cell);
		}
		board.appendChild(document.createElement('br'));
	}
};

const computerMove = () => {
	let choice = bestChoice(pattern, playX, openings);
	if (choice.point) pattern[choice.point[1]][choice.point[0]] = playX;
	if (check(pattern, playX)) {
		alert(playX == 2 ? 'X is winner!' : 'O is winner!');
		cleanBoard();
	}
	playX = 3 - playX;
	show(pattern);
};

let openings = new Map();
openings.set(
	[
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	].toString() + playX,
	{
		point: [1, 1],
		result: 0
	}
);

// 清空棋盘
const cleanBoard = () => {
	pattern = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	show(pattern);
};

show(pattern);
document.querySelector('#clean').addEventListener('click', () => cleanBoard());
