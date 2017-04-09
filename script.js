
var c = document.getElementById("points");
var ctx = c.getContext("2d");
// Массив с будущими точками
var points = [];
// Счетчик точек
var counter = -1;
// Палитра цветов
var colors = document.querySelector('.colors');
// Цвет по умолчанию пусть оранжевый.
var roundColor = 'orange'; 
// Размер круга - инпут для выбора
var roundSizeInput = document.querySelector('#round-size');
// Значение размера круга.
var realRoundSize = roundSizeInput.value;

// Значение реального размера для пользователя. 
document.querySelector('.size_real').innerHTML = realRoundSize;
// Клик на палитру цветов. Выбираем текущий цвет. 
colors.addEventListener('click', function(e) {
	if(e.target.classList.contains('colors__item')) {
		// Берем цвет из имени класса
		roundColor = e.target.classList.value.split(' ')[1].split('_')[3];
	} 
})
// Когда отпускаем мышку от инпута выбора размера, то устанавливаем значение размера
roundSizeInput.addEventListener('mouseup', function(e) {
	realRoundSize = this.value;
})
// Движение мышки по инпуту.
roundSizeInput.addEventListener('mousemove', function(e) {
	document.querySelector('.size_real').innerHTML = this.value;
})
// Input ввода числа соединяемых линий
var linesNumberInput = document.querySelector('#line__numbers');

// Установим в начальным моент времени значения максимума и минимума на ноль
linesNumberInput.setAttribute('max', 0);
linesNumberInput.setAttribute('min', 0);
// Значение инпута пусть либо введенное, либо два (по умолчанию)
var linesNumber = document.querySelector('#line__numbers').value;

linesNumberInput.addEventListener('keyup', function(e) {
	e.target.value = '';
})
// Клик на холст - запуск функции.ё
c.addEventListener('click', paintCircle);

function paintCircle(e) {
	counter++;
	points.push({
		posX: e.clientX,
		posY: e.clientY
	})

	linesNumberInput.setAttribute('max', points.length);
	linesNumber = linesNumberInput.value;
	// Установим цвет
	ctx.fillStyle = roundColor;

	switch (points.length) {
		// Если одна точка - рисуем круг
		case 1:
			makeRound(realRoundSize, e.clientX, e.clientY)

			break;
		// Если две точки, то рисуем линию и круг. 
		case 2:
			makeRound(realRoundSize, e.clientX, e.clientY);
			ctx.moveTo(e.clientX, e.clientY);
			ctx.lineTo(points[counter-1].posX, points[counter-1].posY);
			ctx.stroke();

			break;
		// Если больше двух точек
		default: 
			linesNumber = linesNumber || 2;
			makeLine(e.clientX, e.clientY, linesNumber);
			makeRound(realRoundSize, e.clientX, e.clientY);

			break;
	}
}

// Рисуем круг в заданной позиции, заданного размера
function makeRound(realRoundSize, posX, posY) {
	ctx.beginPath();
	ctx.arc(posX, posY, realRoundSize, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = roundColor;
	ctx.stroke();
}
// Рисовалка линий
function makeLine(x, y , howMuchLines) {
	for(var i = points.length; i >= points.length - howMuchLines; i--) {
		ctx.moveTo(x, y);
		ctx.lineTo(points[i-1].posX, points[i-1].posY);
		ctx.stroke();
	}
}