//////////////////////////////////////////////////////////////////////////////////////////
///
///  Cutback Stats v2.7
///  A JS Library to Debug TweenMax animations
///  Moxie Team
///  
///  Contact information: 
///  Juan Lara | skype:juanlaran
///
//////////////////////////////////////////////////////////////////////////////////////////

var stats = {
	intialize: function(){
		stats.buildStats();
		stats.addVariables();
		stats.addHoverEffects();
		stats.setTimeline();
	},
	setTimeline: function(){
		timelineStat = timelinesArray[0];
		stats.registerElementsAndFunctions();
		stats.tests()
		stats.updateTimeline();
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
		
		divStats.innerHTML = "<p id='currenttime' style='color:#666;font-size:30px;position:absolute;bottom:85px;left:14px;opacity:0.5;'>00.00</p><p id='totaltime' style='color:#666;font-size:20px;position:absolute;bottom:88px;left:101px;opacity:0.5;'>00.00</p><input id='slider-timeline' type='range' min='0' step='0.01' max='274' value='0' style='position:absolute;bottom:60px;width:274px;left:10px;'/><select id='flags' style='position:absolute;bottom:20px;right:14px;width:120px;'></select><select id='timelines' style='position:absolute;bottom:90px;right:14px;width:120px;'></select><span id='play' style='color:#fff;font-size:16px;position:absolute;bottom:10px;left:14px;cursor:pointer;background-color:#999;padding:10px 8px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;width:46px;text-align:center'>Play</span><span id='restart' style='color:#fff;font-size:16px;position:absolute;bottom:10px;left:84px;cursor:pointer;background-color: #999;padding:10px 8px;-webkit-border-radius:10px;-moz-border-radius:10px;border-radius:10px;'>Restart</span>";
	},
	addVariables: function(){
		statDiv = document.getElementById("stats");
		playButton = document.getElementById("play");
		restartButton = document.getElementById("restart");
		sliderTimeline = document.getElementById("slider-timeline");
		selectTimeline = document.getElementById("flags");
		selectTimelines = document.getElementById("timelines");
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
		
		restartButton.onmouseover = function(){
			this.style.backgroundColor = "#666666";
		};
		
		restartButton.onmouseout = function(){
			this.style.backgroundColor = "#999999";
		};
	},
	registerElementsAndFunctions: function(){
		statDiv.addEventListener("mousedown", updatePosition);
		playButton.addEventListener("click", playTimeline);
		restartButton.addEventListener("click", restartTimeline);
		flags.addEventListener("change", goToSelect);
		selectTimelines.addEventListener("change", goToTimeline);
		sliderTimeline.addEventListener("mousemove", goToSlider);
		sliderTimeline.addEventListener("change", goToSlider);
		
		function updatePosition(e){
			if(e.target != sliderTimeline){
				initX = this.offsetLeft;
				initY = this.offsetTop;
				mousePressX = event.clientX;
				mousePressY = event.clientY;

				this.addEventListener('mousemove', repositionElement, false);

				window.addEventListener('mouseup', function() {
				  statDiv.removeEventListener('mousemove', repositionElement, false);
				  statDiv.style.cursor = "default";
				}, false);
			}
		}

		function repositionElement(event) {
			statDiv.style.cursor = "move";
			this.style.left = initX + event.clientX - mousePressX + 'px';
			this.style.top = initY + event.clientY - mousePressY + 'px';
		}

		function playTimeline(){
			if (timelineStat.paused() == true){
				if(timelineStat.totalDuration() == timelineStat.time()){
					timelineStat.restart();
				}else{
					timelineStat.play();	
				}
				playButton.innerHTML = "Pause";
			}else{
				timelineStat.pause();
				playButton.innerHTML = "Play";
			}
		}

		function restartTimeline(){
			timelineStat.restart();
		}

		function goToSelect(){
			timelineStat.seek(flags.options[flags.selectedIndex].text).play();
		}

		function goToSlider(){
			timelineStat.seek(this.value);
			currenttimeTimeline.innerHTML = timelineStat.time().toFixed(2);
		}

		function goToTimeline(){
			timelineStat = timelinesArray[selectTimelines.options[selectTimelines.selectedIndex].value];
			stats.updateTimeline();
		}
	},
	tests: function(){
		var timelinesOptions;

		for (var i = 0; i < timelinesArray.length; i++) {
			timelinesOptions += '<option value="'+i+'">'+timelinesNameArray[i]+'</option>';
			timelinesArray[i].eventCallback("onStart", stats.updateCurrentTimeline);
		};

		selectTimelines.innerHTML = timelinesOptions;
	},
	updateTimeline: function(){
		var labels = timelineStat.getLabelsArray();
		var options;

		for (var i = 0; i < labels.length; i++) {
			options += '<option value="'+labels[i].time+'">'+labels[i].name+'</option>';
		};

		flags.innerHTML = options;

		currenttimeTimeline.innerHTML = timelineStat.time().toFixed(2);
		totalTimeTimeline.innerHTML = timelineStat.totalDuration().toFixed(2);
		sliderTimeline.max = timelineStat.totalDuration().toFixed(2);

		timelineStat.eventCallback("onUpdate", stats.updateCurrentTime);		
		timelineStat.eventCallback("onComplete", stats.updateCompleted);
	},
	updateCurrentTime: function(){
		currenttimeTimeline.innerHTML = timelineStat.time().toFixed(2);
		sliderTimeline.value = timelineStat.time().toFixed(2);

		playButton.innerHTML = "Pause";
	},
	updateCurrentTimeline: function() {
		timelineStat = this;

		selectTimelines.options[timelinesArray.indexOf(this)].selected = true;

		stats.updateTimeline();
	},
	updateCompleted: function(){
		playButton.innerHTML = "Play";
		timelineStat.pause();
	}
};

stats.intialize();