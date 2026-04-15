(function () {
	var bar = document.getElementById('loaderBar');
	var width = 0;
	var interval = setInterval(function () {
		width += 2;
		bar.style.width = width + '%';
		if (width >= 100) {
			clearInterval(interval);
			document.getElementById('loaderSection').style.display = 'none';
			document.getElementById('mainContent').style.display = 'block';
		}
	}, 40);
})();
