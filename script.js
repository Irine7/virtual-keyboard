import englishKeys from './modules/dictionary.js';
import { createVirtualKeyboard } from './modules/keyboard-builder.js';
createVirtualKeyboard();

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