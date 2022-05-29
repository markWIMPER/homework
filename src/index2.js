// 获取DOM;
let R_Light = document.getElementById('R');
let Y_Light = document.getElementById('Y');
let G_Light = document.getElementById('G');

let time = 1700;
let LName = G_Light;

const onLight = name => {
	name.style.opacity = 1;
};

const offLight = name => {
	name.style.opacity = 0.5;
};

const sleep = t => {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, t);
	});
};

/**
 * Promise
 */
// const go = () => {
// 	offLight(R_Light);
// 	onLight(G_Light);
// 	sleep(1000)
// 		.then(() => {
// 			offLight(G_Light);
// 			onLight(Y_Light);
// 			return sleep(200);
// 		})
// 		.then(() => {
// 			offLight(Y_Light);
// 			onLight(R_Light);
// 			return sleep(500);
// 		})
// 		.then(go);
// };

// go();

/**
 * Original
 */
// setInterval(() => {
// 	setTimeout(() => {
// 		offLight(R_Light);
// 		onLight(G_Light);
// 	}, 1000);
// 	setTimeout(() => {
// 		offLight(G_Light);
// 		onLight(Y_Light);
// 	}, 1200);
// 	setTimeout(() => {
// 		offLight(Y_Light);
// 		onLight(R_Light);
// 	}),
// 		1700;
// }, time);

/**
 * async await
 */

const go = async () => {
	offLight(R_Light);
	onLight(G_Light);
	await sleep(10000);
	offLight(G_Light);
	onLight(Y_Light);
	await sleep(2000);
	offLight(Y_Light);
	onLight(R_Light);
	await sleep(5000);
	await go();
};

go();
