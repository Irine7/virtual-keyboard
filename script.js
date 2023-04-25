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
const keyboard = document.createElement('keyboard');
keyboard.classList.add('keyboard');
keyboard.textContent = 'keyboard'
document.body.append(keyboard);