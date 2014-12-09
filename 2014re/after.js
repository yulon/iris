function $After(){
	this.num = 0;

	this.mcb = function(){
		this.num++;
		var th1s = this;
		return function(){
			th1s.num--;
			if (th1s.num == 0) {
				if (th1s.lf) {
					th1s.lf();
				} else{
					th1s.num = -1457;
				};
			}
		};
	};

	this.last = function(f){
		if (this.num == -1457) {
			f();
		}else{
			this.lf = f;
		}
	};
}