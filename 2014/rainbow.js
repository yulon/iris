function Rainbow () {

	var rbColor = mkColor(255, 0, 0);
	var rbThis = this;

	this.blend = function(imageData, alpha){
		var cColor = mkColor(rbColor[0], rbColor[1], rbColor[2]);
		var a = alpha/255;
		var pWidth = imageData.width*4;
		var i;
		for (var w = 0; w < pWidth; w+=4) {
			for (var h = 0; h < imageData.height; h++) {
				i = pWidth * h + w;
				if (imageData.data[i+3] != 0) {
					imageData.data[i]=a*cColor[0] + (1-a)*imageData.data[i]
					imageData.data[i+1]=a*cColor[1] + (1-a)*imageData.data[i+1]
					imageData.data[i+2]=a*cColor[2] + (1-a)*imageData.data[i+2]
				};
			};
			upColor(cColor, 2);
		};
	};

	this.upStartColor = function(n) {
		for (var i = 0; i < n; i++) {
			upColor(rbColor, n);
		};
	};

}

function upColor (preUpdateColor, n) {
	var next, last;
	for (var i = 0; i < 3; i++) {
		if(preUpdateColor[i]==255){
			switch(i){
				case 0:
					next = 1;
					last = 2;
				break;
				case 1:
					next = 2;
					last = 0;
				break;
				case 2:
					next = 0;
					last = 1;
			}

			if (preUpdateColor[last]>0) {
				preUpdateColor[last]=preUpdateColor[last]-n;
			} else {
				if (preUpdateColor[next]==255) {
					preUpdateColor[i]=preUpdateColor[i]-n;
				}else{
					preUpdateColor[next]=preUpdateColor[next]+n;
				};
			};
			return;
		};
	};
	
}

function mkColor(r, g, b) {
	var c = new Uint8ClampedArray(3);
	c[0] = r;
	c[1] = g;
	c[2] = b;
	return c;
}