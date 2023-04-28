// Добавляем favicon
const favicon = document.createElement('link');
favicon.setAttribute('rel', 'icon');
favicon.setAttribute('type', 'image/png');
favicon.setAttribute('href', 'keyboard.png');
document.head.append(favicon);

// Создаем link для css
const cssLink = document.createElement('link');
cssLink.setAttribute('rel', 'stylesheet');
cssLink.setAttribute('type', 'text/css');
cssLink.setAttribute('href', 'style.css');
document.head.append(cssLink);

// Создаем элемент div
const mainDiv = document.createElement('div');
const paragraph = document.createElement("p");
const text = document.createTextNode('Virtual keyboard');
paragraph.append(text);
paragraph.classList.add('title')
mainDiv.classList.add('wrapper');
mainDiv.append(paragraph);
document.body.append(mainDiv);

// Создаем div для textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('class', 'text-space');
textarea.setAttribute('name', 'myTextarea');
// document.body.append(textarea);
mainDiv.append(textarea);

// Создаем div keyboard
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
// keyboard.textContent = 'keyboard'
document.body.append(keyboard);

// Создаем массив кнопок клавиатуры

const englishKeys = [
	{ value: "`", shiftValue: "~", code: "Backquote" },
	{ value: "1", shiftValue: "!", code: "Digit1" },
	{ value: "2", shiftValue: "@", code: "Digit2" },
	{ value: "3", shiftValue: "#", code: "Digit3" },
	{ value: "4", shiftValue: "$", code: "Digit4" },
	{ value: "5", shiftValue: "%", code: "Digit5" },
	{ value: "6", shiftValue: "^", code: "Digit6" },
	{ value: "7", shiftValue: "&", code: "Digit7" },
	{ value: "8", shiftValue: "*", code: "Digit8" },
	{ value: "9", shiftValue: "(", code: "Digit9" },
	{ value: "0", shiftValue: ")", code: "Digit0" },
	{ value: "-", shiftValue: "_", code: "Minus" },
	{ value: "=", shiftValue: "+", code: "Equal" },
	{ value: "Del", shiftValue: "Delete", code: "Delete" },

	{ value: "Tab", shiftValue: "Tab", code: "Tab" },
	{ value: "q", shiftValue: "Q", code: "KeyQ" },
	{ value: "w", shiftValue: "W", code: "KeyW" },
	{ value: "e", shiftValue: "E", code: "KeyE" },
	{ value: "r", shiftValue: "R", code: "KeyR" },
	{ value: "t", shiftValue: "T", code: "KeyT" },
	{ value: "y", shiftValue: "Y", code: "KeyY" },
	{ value: "u", shiftValue: "U", code: "KeyU" },
	{ value: "i", shiftValue: "I", code: "KeyI" },
	{ value: "o", shiftValue: "O", code: "KeyO" },
	{ value: "p", shiftValue: "P", code: "KeyP" },
	{ value: "[", shiftValue: "{", code: "BracketLeft" },
	{ value: "]", shiftValue: "}", code: "BracketRight" },
	{ value: "\\", shiftValue: "|", code: "Backslash" },

	{ value: "CapsLock", shiftValue: "CapsLock", code: "CapsLock" },
	{ value: "a", shiftValue: "A", code: "KeyA" },
	{ value: "s", shiftValue: "S", code: "KeyS" },
	{ value: "d", shiftValue: "D", code: "KeyD" },
	{ value: "f", shiftValue: "F", code: "KeyF" },
	{ value: "g", shiftValue: "G", code: "KeyG" },
	{ value: "h", shiftValue: "H", code: "KeyH" },
	{ value: "j", shiftValue: "J", code: "KeyJ" },
	{ value: "k", shiftValue: "K", code: "KeyK" },
	{ value: "l", shiftValue: "L", code: "KeyL" },
	{ value: ";", shiftValue: ":", code: "Semicolon" },
	{ value: '"', shiftValue: "'", code: "Quote" },
	{ value: "Enter", shiftValue: "Enter", code: "Enter" },

	{ value: "Shift", shiftValue: "Shift", code: "ShiftLeft" },
	{ value: "z", shiftValue: "Z", code: "KeyZ" },
	{ value: "x", shiftValue: "X", code: "KeyX" },
	{ value: "c", shiftValue: "C", code: "KeyC" },
	{ value: "v", shiftValue: "V", code: "KeyV" },
	{ value: "b", shiftValue: "B", code: "KeyB" },
	{ value: "n", shiftValue: "N", code: "KeyN" },
	{ value: "m", shiftValue: "M", code: "KeyM" },
	{ value: ",", code: "Comma" },
	{ value: ".", code: "Period" },
	{ value: "/", code: "Slash" },
	{ value: "Shift", shiftValue: "Shift", code: "ShiftRight" },

	{ value: "fn", code: "Fn" },
	{ value: "control", shiftValue: "Control", code: "ControlLeft" },
	{ value: "option", code: "AltLeft" },
	{ value: "⌘", code: "MetaLeft" },
	{ value: "Space", code: "Space" },
	{ value: "⌘", code: "MetaRight" },
	{ value: "option", code: "AltRight" },
	{ value: "◀", shiftValue: "◀", code: "ArrowLeft" },
	{ value: "▲", shiftValue: "▲", code: "ArrowUp" },
	{ value: "▼", shiftValue: "▼", code: "ArrowDown" },
	{ value: "►", shiftValue: "►", code: "ArrowRight" }
];

function fillVirtualKeyboard() {
	let out = '';
	for (let i = 0; i < englishKeys.length; i++) {
		if (i == 14 || i == 28 || i == 41 || i == 53) {
			out += '<div class="clearfix"></div>';
		}
		out += '<div class="k-key" data="' + englishKeys[i].code + '">' + englishKeys[i].value + '</div>';
	}
	document.querySelector('.keyboard').innerHTML = out;
}
fillVirtualKeyboard();

// Находим кнопки для задания стилей
const delButton = document.querySelector('.k-key[data="Delete"]');
delButton.classList.add('del');
const tabButton = document.querySelector('.k-key[data="Tab"]');
tabButton.classList.add('tab');
const capsLockButton = document.querySelector('.k-key[data="CapsLock"]');
capsLockButton.classList.add('capsLock');
const enterButton = document.querySelector('.k-key[data="Enter"]');
enterButton.classList.add('enter');
const shiftLButton = document.querySelector('.k-key[data="ShiftLeft"]');
shiftLButton.classList.add('shift-left');
const shiftRButton = document.querySelector('.k-key[data="ShiftRight"]');
shiftRButton.classList.add('shift-right');
const cmdLButton = document.querySelector('.k-key[data="MetaLeft"]');
cmdLButton.classList.add('cmd-left');
const cmdRButton = document.querySelector('.k-key[data="MetaRight"]');
cmdRButton.classList.add('cmd-right');
const spaceButton = document.querySelector('.k-key[data="Space"]');
spaceButton.classList.add('space');
const arrowUpButton = document.querySelector('.k-key[data="ArrowUp"]');
arrowUpButton.classList.add('arrow-up');
const arrowDownButton = document.querySelector('.k-key[data="ArrowDown"]');
arrowDownButton.classList.add('arrow-down');
const arrowLeftButton = document.querySelector('.k-key[data="ArrowLeft"]');
arrowLeftButton.classList.add('arrow-left');
const arrowRightButton = document.querySelector('.k-key[data="ArrowRight"]');
arrowRightButton.classList.add('arrow-right');

// Добавляем/удаляем class 'active' по нажатию кнопки физ. клавиатуры
document.addEventListener('keydown', function (event) {
	console.log(event.code); // keyA
	document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
		element.classList.remove('active');
	});
	let key = document.querySelector('.keyboard .k-key[data="' + event.code + '"]');
	if (key !== null) {
		key.classList.add('active');
	}
})

// Добавляем/удаляем class 'active' по нажатию кнопки виртуальной клавиатуры
document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
	element.onclick = function (event) {
		document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
			element.classList.remove('active');
		});
		let code = this.getAttribute('data');
		this.classList.add('active');
		console.log(code);
	}
});