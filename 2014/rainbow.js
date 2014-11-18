function Rainbow (updataSeed) {

	var rgb = mkRGB(255, 0, 0);
	var rbThis = this;
	
	setInterval(function(){
		upColor(rgb);
	}, updataSeed);

	this.blend = function(imageData, preReplaceColor){
		var xrgb = rgb;
		var width = imageData.width*4;
		var i;
		for (var w = 0; w < width; w+=4) {
			for (var h = 0; h < imageData.height; h++) {
				i = width * h + w;
				if (imageData.data[i]==preReplaceColor[0] && imageData.data[i+1]==preReplaceColor[1] && imageData.data[i+2]==preReplaceColor[2] && imageData.data[i+3] != 0) {
					imageData.data[i] = xrgb[0];
					imageData.data[i+1] = xrgb[1];
					imageData.data[i+2] = xrgb[2];
				};
			};
			upColor(xrgb);
		};
	};

	this.blendFromCavctx = function(canvasContext, preReplaceColor) {
		var imgd = canvasContext.getImageData(0, 0, cav.width, cav.height);
		rbThis.blend(imgd, prc);
		canvasContext.putImageData(imgd, 0, 0);
	};
}

function upColor (preUpdateColor) {
	var next, up;
	for (var i = 0; i < 3; i++) {
		if(preUpdateColor[i]==255){
			switch(i){
				case 0:
					next = 1;
					up = 2;
				break;
				case 1:
					next = 2;
					up = 0;
				break;
				case 2:
					next = 0;
					up = 1;
			}

			if (preUpdateColor[up]>0) {
				preUpdateColor[up]=preUpdateColor[up]-5;
			} else {
				if (preUpdateColor[next]==255) {
					preUpdateColor[i]=preUpdateColor[i]-5;
				}else{
					preUpdateColor[next]=preUpdateColor[next]+5;
				};
			};
			return;
		};
	};
	
}

function mkRGB (r, g, b) {
	var rgb = new Uint8ClampedArray(3);
	rgb[0] = r;
	rgb[1] = g;
	rgb[2] = b;
	return rgb;
}