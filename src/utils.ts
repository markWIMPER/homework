// 输赢逻辑判断

/**
 * @description 八个方向进行判断
 */

export const check = (pattern, playX) => {
	{
		for (let i = 0; i < 3; i++) {
			let win = true;
			for (let j = 0; j < 3; j++) {
				if (pattern[i][j] !== playX) {
					win = false;
					break;
				}
			}
			if (win) {
				return true;
			}
		}
	}

	{
		for (let i = 0; i < 3; i++) {
			let win = true;
			for (let j = 0; j < 3; j++) {
				if (pattern[j][i] !== playX) {
					win = false;
					break;
				}
			}
			if (win) {
				return true;
			}
		}
	}

	{
		let win = true;
		for (let j = 0; j < 3; j++) {
			if (pattern[j][j] !== playX) {
				win = false;
				break;
			}
		}
		if (win) {
			return true;
		}
	}

	{
		let win = true;
		for (let j = 0; j < 3; j++) {
			if (pattern[j][2 - j] !== playX) {
				win = false;
				break;
			}
		}
		if (win) {
			return true;
		}
	}

	return false;
};

/*克隆*/
const clone = (pattern: number[][]) => {
	return JSON.parse(JSON.stringify(pattern));
};

export const willWin = (pattern: number[][], playX: number) => {
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (pattern[i][j]) continue;
			let tmp = clone(pattern);
			tmp[i][j] = playX;
			if (check(tmp, playX)) {
				return [j, i];
			}
			tmp[i][j] = 0;
		}
	}
	return null;
};

export const bestChoice = (pattern: number[][], playX: number, openings: Map<any, any>) => {
	if (openings.has(pattern.toString() + playX)) {
		return openings.get(pattern.toString() + playX);
	}

	let point = willWin(pattern, playX);
	if (point) {
		return {
			point: point,
			result: 1
		};
	}

	let result = -1;

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (pattern[i][j] !== 0) continue;
			let tmp = clone(pattern);
			tmp[i][j] = playX;
			let opp = bestChoice(tmp, 3 - playX, openings);
			if (-opp.result >= result) {
				point = [j, i];
				result = -opp.result;
			}
		}
	}

	return {
		point: point,
		result: point ? result : 0
	};
};
