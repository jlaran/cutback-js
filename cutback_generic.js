//////////////////////////////////////////////////////////////////////////////////////////
///
///  Cutback Generic v3.4
///  A JS Library to easy build Generic Ad Banners
///  Moxie Team
///  
///  Contact information: 
///  Juan Lara | skype:juanlaran
///
//////////////////////////////////////////////////////////////////////////////////////////

(function(window, undefined){

	var	Banner = function(bannerConfig){
        var that = this;
        window.addEventListener("load", function(){
            that.initializeBanner(bannerConfig);
        }, false);
	}

	Banner.prototype = {
		setConfig : function(bannerConfig){
			//Set initial config

			//Banner Properties
			this.bannerType = bannerConfig.bannerType || "in-page";
	        this.expand = bannerConfig.expand || false;

			this.finalExpandSize = bannerConfig.finalExpandSize || [0,0,0,0];
	        this.startExpanded = bannerConfig.startExpanded || false;
			this.initialized = true;

			//Listeners
			this.elementsToRegister = bannerConfig.elementsToRegister || [];
			this.hotspotClose = bannerConfig.hotspotClose || [];
	        this.hotspotExpand = bannerConfig.hotspotExpand || [];

	        //Timelines
	        this.timelinesName = bannerConfig.timelinesName || [];
	        this.timelinesToRegister = bannerConfig.timelinesToRegister || {};
	        this.timelinesArray = [];
	        
            //Frames
	        this.animationFrames = bannerConfig.animationFrames || [];
		},
		initializeBanner : function(bannerConfig){
			if(!this.initialized){
				//Initialize banner config
				this.setConfig(bannerConfig);

                this.addListeners();
                this.registerTimelines();
			}
		},
        addListeners : function(){
            for (var i = 0; i < this.elementsToRegister.length; i++) {

                var elementToAdd,
                    functionToDO = this.elementsToRegister[i].functionToCall,
                    functionEval = eval(functionToDO);

                if (this.elementsToRegister[i].element.charAt(0) == "."){
                    elementToAdd = document.querySelectorAll(this.elementsToRegister[i].element);

                    for (var k = 0; k < elementToAdd.length; k++) {
                        elementToAdd[k].addEventListener(this.elementsToRegister[i].eventType, functionEval, false);
                    };

                } else {
                    elementToAdd = document.querySelector(this.elementsToRegister[i].element);                    
                    elementToAdd.addEventListener(this.elementsToRegister[i].eventType, functionEval, false);
                }   
            }

            if (this.expand == true){
                
                //Expand Hotspot
                if(this.hotspotExpand.length != 0){
                    var eventType = this.hotspotExpand[1] || "click";
                    document.querySelector(this.hotspotExpand[0]).addEventListener(eventType, this.expandEvent, false);
                }else{
                    alert("Please add the hotspotExpand");
                }

                if (this.type != "in-app"){
                    //Close Hotspot
                    if(this.hotspotClose.length != 0){
                        var eventType = this.hotspotExpand[1] || "click";
                        document.querySelector(this.hotspotClose[0]).addEventListener(eventType, this.collapseEvent, false);
                    }else{
                        alert("Please add the hotspotClose");
                    }
                }
            }
        },
        registerTimelines : function(callback){
            for (var i = 0; i < this.timelinesName.length; i++) {
                eval(this.timelinesName[i]+"= new TimelineMax()");
                this.timelinesArray.push(eval(this.timelinesName[i]));
            };

            this.timelinesToRegister.register();

            for (var i = 0; i < this.timelinesName.length; i++) {
                this.timelinesArray[i].pause();
            };

            this.executeAnimations();
        },
        executeAnimations : function(){
            this.animationFrames[0]();
        },
        collapseEvent : function(){
            if(banner.timelinesToRegister.collapseStartAnimation){
                eval(banner.timelinesToRegister.collapseStartAnimation());
            }
        },
        expandEvent : function(){
            if(banner.timelinesToRegister.expandStartAnimation){
                eval(banner.timelinesToRegister.expandStartAnimation());
            }
        },
        resetWhenCloseOrExit : function(){
            TweenMax.set(".banner > div", {clearProps:"all"});
            TweenMax.set(".banner > span", {clearProps:"all"});
            TweenMax.set(".banner > p", {clearProps:"all"});
            TweenMax.set(".banner > h1", {clearProps:"all"});
            TweenMax.set(".banner > h2", {clearProps:"all"});
            TweenMax.set(".banner > h3", {clearProps:"all"});
            TweenMax.set(".banner > h4", {clearProps:"all"});
            TweenMax.set(".banner > a", {clearProps:"all"});
            TweenMax.set(".banner > input", {clearProps:"all"});
            TweenMax.set(".banner > canvas", {clearProps:"all"});

            for (var i = 0; i < timelinesArray.length; i++) {
                this.timelinesArray[i].seek(0).pause();
            };
            
            this.executeAnimations();
        }
	}

	window.Banner = Banner;

})(window);