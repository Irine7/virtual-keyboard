import {englishKeys, russianKeys} from './modules/dictionary.js';
import { createVirtualKeyboard } from './modules/keyboard-builder.js';
createVirtualKeyboard();

window.onload = function() {
	document.querySelector('.text-space').focus();
}

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

// Добавляем/удаляем class 'active' по нажатию кнопки физ. клавиатуры
document.addEventListener('keydown', function (event) {
	document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
		element.classList.remove('active');
	});
	let key = document.querySelector('.keyboard .k-key[data="' + event.code + '"]');
	if (key !== null) {
		key.classList.add('active');
		setTimeout(function() {
			key.classList.remove('active');
		}, 1000);
	}
});

// Добавляем/удаляем class 'active' по нажатию кнопки виртуальной клавиатуры
document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
	element.addEventListener('click', function (event) {
		document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
			element.classList.remove('active');
		});
		let code = this.getAttribute('data');
		this.classList.add('active');
		setTimeout(function() {
			element.classList.remove('active');
		}, 1000);
	});
});

// Объект, который хранит информацию о нажатых клавишах
let pressedKeys = {};

// Функция, которая обновляет статус клавиш в объекте pressedKeys и меняет язык при необходимости
function updatePressedKeysAndToggleLanguage(event) {
	const code = event.code;
	const isShiftPressed = pressedKeys['ShiftLeft'] || pressedKeys['ShiftRight'];
	const isCtrlPressed = pressedKeys['ControlLeft'] || pressedKeys['ControlRight'];

if (event.type === 'keydown') {
	pressedKeys[code] = true;

	if (isShiftPressed && isCtrlPressed) {
		toggleKeyboardLayout();
	}
} else if (event.type === 'keyup') {
	delete pressedKeys[code];
}

const keyboard = document.querySelector('.keyboard');
const isRussian = isShiftPressed && isCtrlPressed;
keyboard.setAttribute('data-language', isRussian ? 'ru' : 'en');

document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
	const key = element.getAttribute('data');
	const isPressed = pressedKeys[key];

	if (isPressed) {
		element.classList.add('active');
	} else {
		element.classList.remove('active');
	}
});
}

// Добавляем обработчики на клавиатуру
document.addEventListener('keydown', updatePressedKeysAndToggleLanguage);
document.addEventListener('keyup', updatePressedKeysAndToggleLanguage);

// Добавляем обработчик на кнопки виртуальной клавиатуры
document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
	element.addEventListener('mousedown', function (event) {
		pressedKeys[this.getAttribute('data')] = true;
		element.classList.add('active');
});

element.addEventListener('mouseup', function (event) {
	delete pressedKeys[this.getAttribute('data')];
	element.classList.remove('active');
});

element.addEventListener('mouseleave', function (event) {
	if (pressedKeys[this.getAttribute('data')]) {
		element.classList.remove('active');
	}
});
});


let isRussianKeyboard = false; // начальное значение - английская раскладка клавиатуры
let isLeftShiftPressed = false; // значение - не нажата левая клавиша shift
let isLeftControlPressed = false; // значение - не нажата левая клавиша control

// Функция для проверки нажатия левой клавиши shift и control
function checkModifierKeys() {
	return isLeftShiftPressed && isLeftControlPressed;
}

// Функция для переключения между русской и английской раскладками
function toggleKeyboardLayout() {
	const keyboard = document.querySelector('.keyboard');
	const keys = document.querySelectorAll('.keyboard .k-key');
	const currentLayout = isRussianKeyboard ? russianKeys : englishKeys;

	// Обновляем значения на кнопках
	for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const code = currentLayout[i].code;
			const value = isRussianKeyboard ? currentLayout[i].shiftValue : currentLayout[i].value;
			key.setAttribute('data', code);
			key.innerHTML = value;
	}

	// Меняем значение переменной isRussianKeyboard и добавляем/удаляем класс на клавиатуре
	isRussianKeyboard = !isRussianKeyboard;
	if (isRussianKeyboard) {
			keyboard.setAttribute('data-language', 'ru');
	} else {
			keyboard.setAttribute('data-language', 'en');
	}
}

// Добавляем обработчик на нажатие клавиш
document.addEventListener('keydown', function(event) {
	if (event.code === 'ShiftLeft') {
			isLeftShiftPressed = true;
	} else if (event.code === 'ControlLeft') {
			isLeftControlPressed = true;
	}

	if (checkModifierKeys()) {
		toggleKeyboardLayout();
	}
});

// Добавляем обработчик на отпускание клавиш
document.addEventListener('keyup', function(event) {
	if (event.code === 'ShiftLeft') {
			isLeftShiftPressed = false;
	} else if (event.code === 'ControlLeft') {
			isLeftControlPressed = false;
	}
});

// Добавляем ввод текста по клику мышкой
document.querySelectorAll('.keyboard .k-key').forEach(function (element) {
	element.addEventListener('click', function (event) {
		const code = event.target.textContent;
		const textarea = document.querySelector('.text-space');
		textarea.value += event.shiftKey ? code.toUpperCase() : code.toLowerCase();
		textarea.focus();
	});
});



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
const controlButton = document.querySelector('.k-key[data="ControlLeft"]');
controlButton.classList.add('control-left');