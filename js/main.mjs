const canvas = document.querySelector("main");
const boxes = Array.from(canvas.querySelectorAll(".box"));
const popup = document.querySelector("#popup");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");
const content = document.querySelector(".content");
const oNum = document.querySelector(".oNum");
const xNum = document.querySelector(".xNum");
const resetBtn = document.querySelector(".scoreResetBtn");

// .box div 박스 안에 모든 div
// .box > div 박스 안 바로 밑에 있는 div
// .box + div 박스 그 다음 div

let clickAble = true;
let xCheck = false;
let oScore = 0;
let xScore = 0;
let winCheck = "o";

console.log(typeof oScore);

boxes.forEach((box) => {
	const div = box.querySelector("div");

	div.addEventListener("click", (e) => {
		if (clickAble == false) return; //바로 걸러버려!

		if (xCheck == false && div.classList.contains("uC")) {
			div.classList.add("O");
			div.classList.remove("uC");
			box.classList.add("1");
			xCheck = true;
			winCheck = "o";
		} else if (xCheck == true && div.classList.contains("uC")) {
			div.classList.add("X");
			div.classList.remove("uC");
			box.classList.add("2");
			xCheck = false;
			winCheck = "x";
		}

		draw();

		if (oHasWin()) {
			clickAble = false;
			setTimeout(() => {
				popup.style.display = "block";
				overlay.style.display = "block";
				oScore += 1;
				oNum.textContent = oScore;
				content.textContent = "O Has Won!";
			}, 500);
		} else if (xHasWin()) {
			clickAble = false;
			setTimeout(() => {
				popup.style.display = "block";
				overlay.style.display = "block";
				xScore += 1;
				xNum.textContent = xScore;
				content.textContent = "X Has Won!";
			}, 500);
		}
	});
});

function oHasWin() {
	if (hasWin("1")) return true;
	return false;
}

function xHasWin() {
	if (hasWin("2")) return true;
	return false;
}

const winningIndexes = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function hasWin(side) {
	for (let winningIndex of winningIndexes) {
		if (
			boxes[winningIndex[0]].classList.contains(side) &&
			boxes[winningIndex[1]].classList.contains(side) &&
			boxes[winningIndex[2]].classList.contains(side)
		)
			return true;
	}
	return false;
}

function draw() {
	let drawCheck = 0;
	boxes.forEach((box) => {
		if (box.classList.length > 1) {
			drawCheck++;
		}

		if (drawCheck == 9 && oHasWin() == false && xHasWin() == false) {
			setTimeout(() => {
				popup.style.display = "block";
				overlay.style.display = "block";
				content.textContent = "DRAW";
			}, 500);
		}
	});
}

function reset() {
	boxes.forEach((box) => {
		const div = box.querySelector("div");
		div.classList.add("uC");
		div.classList.remove("O");
		div.classList.remove("X");
		box.classList.remove("1");
		box.classList.remove("2");
	});

	clickAble = true;

	if (winCheck == "o") {
		xCheck = true;
	} else if (winCheck == "x") {
		xCheck = false;
	}
}

close.addEventListener("click", (e) => {
	popup.style.display = "none";
	overlay.style.display = "none";
	reset();
});

resetBtn.addEventListener("click", (e) => {
	oScore = 0;
	xScore = 0;
	oNum.textContent = oScore;
	xNum.textContent = xScore;
	popup.style.display = "block";
	overlay.style.display = "block";
	content.textContent = "Scores Reset";
	winCheck = "x";
});
