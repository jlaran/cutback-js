var fadedMask = {
	setMask : function(options){
		var destino = document.querySelector(options.container);

		var slicesQuantity;

		if(options.direction == "top-bottom" || options.direction == "bottom-top"){
			slicesQuantity = Math.floor(options.imageHeight/options.maskWidth);
		} else {
			slicesQuantity = Math.floor(options.imageWidth/options.maskWidth);
		}

		var divs = "";

		for (var i = 0; i < slicesQuantity; i++) {
			switch(options.direction){
				case "left-right":
						divs += '<div class="'+options.maskClass+'" style="background-image: url('+options.imageUrl+');background-repeat:none;background-position:'+(-options.maskWidth*i)+'px 0px;position:absolute;top:0px;left:'+(options.maskWidth*i)+'px;width:'+options.maskWidth+'px;height:'+options.imageHeight+'px;"></div>';
					break;
				case "right-left":
						divs += '<div class="'+options.maskClass+'" style="background-image: url('+options.imageUrl+');background-repeat:none;background-position:'+((options.maskWidth*(i+1)))+'px 0px;position:absolute;top:0px;left:'+(options.imageWidth-(options.maskWidth*(i+1)))+'px;width:'+options.maskWidth+'px;height:'+options.imageHeight+'px;"></div>';
					break;
				case "top-bottom":
						divs += '<div class="'+options.maskClass+'" style="background-image: url('+options.imageUrl+');background-repeat:none;background-position:0px '+(-options.maskWidth*i)+'px;position:absolute;top:'+(options.maskWidth*i)+'px;left:0px;width:'+options.imageWidth+'px;height:'+options.maskWidth+'px;"></div>';
					break;
				case "bottom-top":
						divs += '<div class="'+options.maskClass+'" style="background-image: url('+options.imageUrl+');background-repeat:none;background-position:0px '+(options.maskWidth*(i+1))+'px;position:absolute;top:'+(options.imageHeight-(options.maskWidth*(i+1)))+'px;left:0px;width:'+options.imageWidth+'px;height:'+options.maskWidth+'px;"></div>';
					break;
				default :
						divs += '<div class="'+options.maskClass+'" style="background-image: url('+options.imageUrl+');background-repeat:none;background-position:'+(-options.maskWidth*i)+'px 0px;position:absolute;top:0px;left:'+(options.maskWidth*i)+'px;width:'+options.maskWidth+'px;height:'+options.imageHeight+'px;"></div>';
					break;
			}
		}

		destino.innerHTML = divs;
	}
}

window.fadedMask = fadedMask;