function generateBar(i, target) {
	var step = (i % 20) / 5000;
	var base = i / 5;
	target.open = base;
	target.high = base * (1 + 2 * step);
	target.low = base * (1 - 2 * step);
	target.close = base * (1 + step);
}

function generateData() {
	var res = [];
	var time = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
	for (var i = 0; i < 500; ++i) {
		var item = {
			time: time.getTime() / 1000,
		};
		time.setUTCDate(time.getUTCDate() + 1);

		generateBar(i, item);
		res.push(item);
	}
	return res;
}

// eslint-disable-next-line no-unused-vars
function runTestCase(container) {
	var chart = LightweightCharts.createChart(container, {
		timeScale: {
			barSpacing: 20,
		},
	});

	var mainSeries = chart.addCandleSeries({
		drawBorder: true,
		borderColor: 'blue',
	});

	mainSeries.setData(generateData());

	// create canvas to draw screenshot
	chart.resize(240, 600, true);

	var screenshot = chart.takeScreenshot().toDataURL();

	var parent = container.parentNode;
	var img = document.createElement('img');
	img.src = screenshot;
	img.style.position = 'absolute';
	img.style.top = '260px';
	img.width = 600;
	img.height = 240;
	parent.appendChild(img);
}
