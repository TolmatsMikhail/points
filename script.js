// window.addEventListener('load', function(e) {
// 	document.querySelector('#points').style.height = document.documentElement.clientHeight -80 + 'px';
// })
var overlay = document.querySelector('.overlay');
var c = document.getElementById("points");
var ctx = c.getContext("2d");
var points = [];
var counter = -1;
// Палитра цветов
var colors = document.querySelector('.colors');
var roundColor = 'orange'; 
// Размер круга
var roundSizeInput = document.querySelector('#round-size');

var realRoundSize = roundSizeInput.value;

document.querySelector('.size_real').innerHTML = realRoundSize;

colors.addEventListener('click', function(e) {
	if(e.target.classList.contains('colors__item')) {
		roundColor = e.target.classList.value.split(' ')[1].split('_')[3];
	} 
})

roundSizeInput.addEventListener('mouseup', function(e) {
	realRoundSize = this.value;
})

roundSizeInput.addEventListener('mousemove', function(e) {
	document.querySelector('.size_real').innerHTML = this.value;
})

c.addEventListener('click', paintCircle);

function paintCircle(e) {
	counter++;
	points.push({
		posX: e.clientX,
		posY: e.clientY
	})

	if (points.length < 3) {
		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, realRoundSize, 0, 2*Math.PI, false);
		ctx.fillStyle = roundColor;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = roundColor;
		ctx.stroke();

	} else {
		ctx.moveTo(e.clientX, e.clientY); // откуда
		ctx.fillStyle = roundColor;
		ctx.lineTo(points[counter-1].posX, points[counter-1].posY); // куда
		ctx.stroke();

		ctx.moveTo(e.clientX, e.clientY); // откуда
		ctx.fillStyle = roundColor;
		ctx.lineTo(points[counter-2].posX, points[counter-2].posY); // куда
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(e.clientX, e.clientY, realRoundSize, 0, 2*Math.PI, false);
		ctx.fillStyle = roundColor;
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = roundColor;
		ctx.stroke();
	}
}
