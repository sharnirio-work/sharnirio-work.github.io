// Helper if element exist then call function
function iee(_el, _cb, ..._rest) {
	var elem = document.querySelector(_el);
	var rest = _rest;

	if(document.body.contains(elem)) {
		if (arguments.length <= 2) {
			_cb();
		}
		if (arguments.length == 3) {
			_cb(rest[0]);
		}
		if (arguments.length == 4) {
			_cb(rest[0], rest[1]);
		}
		if (arguments.length == 5) {
			_cb(rest[0], rest[1], rest[2]);
		}
	}
}
/* module diagonalLayouts */
// function on
jQuery(document).ready(function() {
	diagonalLayoutsInit();
});
// function init
function diagonalLayoutsInit() {}

/* module snowCanvas */
// function on
jQuery(document).ready(function() {
	snowCanvasInit();
});

// function init
// important this script uses lodash JavaScript utility library
function snowCanvasInit() {

	const Snow = (canvas, count, options) => {
		const ctx = canvas.getContext('2d');
		const snowflakes = [];
		const add = item => snowflakes.push(item(canvas));
		const update = () => _.forEach(snowflakes, el => el.update());
		const resize = () => {
			ctx.canvas.width = canvas.offsetWidth;
			ctx.canvas.height = canvas.offsetHeight;
			_.forEach(snowflakes, el => el.resized());
		};

		const draw = () => {
			ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
			_.forEach(snowflakes, el => el.draw());
		};

		const events = () => {
			window.addEventListener('resize', resize);
		};

		const loop = () => {
			draw();
			update();
			animFrame(loop);
		};

		const init = () => {
			_.times(count, () => add(canvas => SnowItem(canvas, null, options)));
			events();
			loop();
		};

		init(count);
		resize();
		return { add, resize };
	};

	const defaultOptions = {
		color: 'orange',
		radius: [0.5, 3.0],
		speed: [1, 3],
		wind: [-0.5, 3.0]
	};

	const SnowItem = (canvas, drawFn = null, opts) => {
		const options = { ...defaultOptions, ...opts };
		const { radius, speed, wind, color } = options;
		const params = {
			color,
			x: _.random(0, canvas.offsetWidth),
			y: _.random(-canvas.offsetHeight, 0),
			radius: _.random(...radius),
			speed: _.random(...speed),
			wind: _.random(...wind),
			isResized: false
		};

		const ctx = canvas.getContext('2d');
		const updateData = () => {
			params.x = _.random(0, canvas.offsetWidth);
			params.y = _.random(-canvas.offsetHeight, 0);
		};
		const resized = () => params.isResized = true;
		const drawDefault = () => {
			ctx.beginPath();
			ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
			ctx.fillStyle = params.color;
			ctx.fill();
			ctx.closePath();
		};
		const draw = drawFn ? () => drawFn(ctx, params) : drawDefault;
		const translate = () => {
			params.y += params.speed;
			params.x += params.wind;
		};
		const onDown = () => {
			if (params.y < canvas.offsetHeight) return;
			if (params.isResized) {
				updateData();
				params.isResized = false;
			} else {
				params.y = 0;
				params.x = _.random(0, canvas.offsetWidth);
			}
		};
		const update = () => {
			translate();
			onDown();
		};
		return {
			update,
			resized,
			draw
		};
	};

	const canvas = document.getElementById('snow');
	const animFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	Snow(canvas, 150, { color: 'gray' });
	// Snow script end
}