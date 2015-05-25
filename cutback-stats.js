var stats = {
	intialize: function(){	
		stats.buildStats();
		stats.addVariables();
		stats.addHoverEffects();
	},
	setTimeline: function(timeline){
		timelineStat = timeline;
		stats.registerElementsAndFunctions();
		stats.tests()
	},
	buildStats: function(){
		var firstBanner = document.getElementsByClassName("banner")[0];
		var divStats = document.createElement("div");
			divStats.id = "stats";
			divStats.style.width = "300px";
			divStats.style.height = "130px";
			divStats.style.backgroundColor = "#ccc";
			divStats.style.position = "fixed";
			divStats.style.bottom = 0;
			divStats.style.right = 0;
			divStats.style.opacity = 0.5;
			divStats.style.borderRadius = "10px";

		firstBanner.parentNode.insertBefore(divStats, firstBanner.nextSibling);

		divStats.onmouseover = function(){
			this.style.opacity = 1;
		};

		divStats.onmouseout = function(){
			this.style.opacity = 0.5
		};
		
		divStats.innerHTML = "<p id='currenttime' style='color:#666;font-size:30px;position:absolute;bottom:85px;left:14px;opacity:0.5;'>00.00</p><p id='totaltime' style='color:#666;font-size:20px;position:absolute;bottom:85px;left:101px;opacity:0.5;'>00.00</p><input id='slider-timeline' type='range' min='0' step='0.01' max='274' value='0' style='position:absolute;bottom:60px;width:274px;left:10px;'/><select id='flags' style='position:absolute;bottom:90px;right:14px;width:120px;'></select><span id='play' style='color:#fff;font-size:16px;position:absolute;bottom:10px;left:14px;cursor:pointer;background-color: #999;padding:10px 12px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;'>Play</span><span id='pause' style='color:#fff;font-size:16px;position:absolute;bottom:10px;left:105px;cursor:pointer;background-color: #999;padding:10px 12px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;'>Pause</span><span id='restart' style='color:#fff;font-size:16px;position:absolute;bottom:10px;left:210px;cursor:pointer;background-color: #999;padding:10px 12px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;'>Restart</span>";
	},
	addVariables: function(){
		playButton = document.getElementById("play");
		pauseButton = document.getElementById("pause");
		restartButton = document.getElementById("restart");
		sliderTimeline = document.getElementById("slider-timeline");
		selectTimeline = document.getElementById("flags");
		totalTimeTimeline = document.getElementById("totaltime");
		currenttimeTimeline = document.getElementById("currenttime");
	},
	addHoverEffects: function(){
		playButton.onmouseover = function(){
			this.style.backgroundColor = "#666666";
		};
		
		playButton.onmouseout = function(){
			this.style.backgroundColor = "#999999";
		};

		pauseButton.onmouseover = function(){
			this.style.backgroundColor = "#666666";
		};

		pauseButton.onmouseout = function(){
			this.style.backgroundColor = "#999999";
		};
		
		restartButton.onmouseover = function(){
			this.style.backgroundColor = "#666666";
		};
		
		restartButton.onmouseout = function(){
			this.style.backgroundColor = "#999999";
		};
	},
	registerElementsAndFunctions: function(){
		playButton.addEventListener("click", playTimeline);
		pauseButton.addEventListener("click", pauseTimeline);
		restartButton.addEventListener("click", restartTimeline);
		flags.addEventListener("change", goToSelect);
		sliderTimeline.addEventListener("mousemove", goToSlider);
		sliderTimeline.addEventListener("change", goToSlider);
		
		function playTimeline(){
			timelineStat.play();
		}

		function pauseTimeline(){
			timelineStat.pause();
		}

		function restartTimeline(){
			timelineStat.restart();
		}

		function goToSelect(){
			timelineStat.seek(flags.options[flags.selectedIndex].text);
		}

		function goToSlider(){
			timelineStat.seek(this.value);
			currenttimeTimeline.innerHTML = timelineStat.time().toFixed(2);
		}
	},
	tests: function(){
		var labels = timelineStat.getLabelsArray();
		var options;
		for (var i = 0; i < labels.length; i++) {
			options += '<option value="'+labels[i].time+'">'+labels[i].name+'</option>';
		};
		flags.innerHTML = options;
		totalTimeTimeline.innerHTML = timelineStat.totalDuration().toFixed(2);
		sliderTimeline.max = timelineStat.totalDuration().toFixed(2);
		timelineStat.eventCallback("onUpdate", stats.updateCurrentTime);
	},
	updateCurrentTime: function(){
		currenttimeTimeline.innerHTML = timelineStat.time().toFixed(2);
		sliderTimeline.value = timelineStat.time().toFixed(2);
	}
};

stats.intialize();