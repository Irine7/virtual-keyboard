import {englishKeys, russianKeys} from './modules/dictionary.js';
import { createVirtualKeyboard } from './modules/keyboard-builder.js';
createVirtualKeyboard();

window.addEventListener('load', function() {
	document.querySelector('.text-space').focus();
	const language = localStorage.getItem('language') || 'en';
	toggleKeyboardLayout(language);
});


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
	const { code, type } = event;

	// Добавляем или удаляем клавишу из pressedKeys
	if (type === 'keydown') {
		pressedKeys[code] = true;
	} else if (type === 'keyup') {
		delete pressedKeys[code];
	}

	let language = localStorage.getItem('language') || 'en';

	// Проверяем, нужно ли переключать язык
	const isControlPressed = pressedKeys['ControlLeft'] || pressedKeys['ControlRight'];
	const isShiftPressed = pressedKeys['ShiftLeft'] || pressedKeys['ShiftRight'];
	if (isControlPressed && isShiftPressed) {
		if (language === 'en') {
			language = 'ru';
			localStorage.setItem('language', language);
		} else {
			language = 'en';
			localStorage.setItem('language', language);
		}
		toggleKeyboardLayout();
	}
	let pressedKeys = JSON.parse(localStorage.getItem('pressedKeys')) || {};

// сохранение pressedKeys в localStorage
	saveToLocalStorage();
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

	// Меняем значение переменной language и добавляем/удаляем класс на клавиатуре
	isRussianKeyboard = !isRussianKeyboard;
	if (isRussianKeyboard) {
		keyboard.setAttribute('data-language', 'ru');
		language = 'ru';
} else {
		keyboard.setAttribute('data-language', 'en');
		language = 'en';
}
// Сохраняем language в localStorage
localStorage.setItem('language', language);
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
		const code = event.target.getAttribute('data');
		const textarea = document.querySelector('.text-space');

		// проверяем, является ли клавиша служебной
		if (code === 'Backspace') {
			textarea.value = textarea.value.slice(0, -1); // удаляем последний символ
		} else if (code === 'Enter') {
			textarea.value += '\n'; // добавляем символ перевода строки
		} else if (code === 'Tab') {
			textarea.value += '\t'; // добавляем табуляцию
		} else if (code === 'CapsLock' || code === 'Shift' || code === 'Ctrl' || code === 'Alt') {
			// ничего не делаем при нажатии этих клавиш
		} else {
			textarea.value += event.shiftKey ? this.textContent.toUpperCase() : this.textContent.toLowerCase(); // добавляем значение клавиши
		}
		textarea.focus();
	});
});

// Обработчик нажатия клавиш на физической клавиатуре
document.addEventListener('keydown', function(event) {
	const textarea = document.querySelector('.text-space');

	if (event.key === 'Tab') {
			event.preventDefault(); // Отменяем стандартное поведение браузера
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const indent = '    '; // отступ в четыре пробела
			textarea.value = textarea.value.substring(0, start) + indent + textarea.value.substring(end);
			textarea.selectionStart = textarea.selectionEnd = start + indent.length;
			textarea.focus();
	}
});

// сохранение языка раскладки в localStorage
localStorage.setItem('language', 'ru');
// получение языка раскладки из localStorage
console.log(localStorage.getItem('language'));

const language = localStorage.getItem('language');

function saveToLocalStorage() {
	localStorage.setItem('pressedKeys', JSON.stringify(pressedKeys));
}

document.addEventListener('DOMContentLoaded', function() {
	const currentLanguage = language || 'ru';

	isRussianKeyboard = localStorage.getItem('isRussianKeyboard') === 'true';
	pressedKeys = JSON.parse(localStorage.getItem('pressedKeys')) || {};

	toggleKeyboardLayout();
	updatePressedKeysAndToggleLanguage({ code: '' }, currentLanguage);
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