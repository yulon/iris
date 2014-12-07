var j5 = {};

j5.After = function(){
	this.num = 0;

	this.callback = function(){
		this.num++;
		return function(){
			this.num--;
			if (this.num == 0) {
				if (this.lf) {
					this.lf();
				} else{
					this.num = -1457;
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
};