//////////////////////////////////////////////////////////////////////////////////////////
///
///  Cutback v3.4
///  A JS Library to easy build Doubleclick Ad Banners
///  Moxie Team
///  
///  Contact information: 
///  Juan Lara | skype:juanlaran - Gabriel Aguilar | skype:gab.webdesign
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
			this.doubleClickTraking = bannerConfig.doubleClickTraking || true;
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

				//Check if doubleClickTraking is needed
				if (this.doubleClickTraking == true){
					this.initializeDoubleClick();
				    this.registerTimelines();
				} else {
                    this.addListeners();
                    this.registerTimelines();
                    this.executeAnimations();
				}

			} else {
				console.log("Already initialized");
			}
		},
        initializeDoubleClick : function(){
        	var that = this;

            if(!Enabler.isInitialized()){
                Enabler.addEventListener(studio.events.StudioEvent.INIT, function(){
                	that.functionsWhenInit(that);
                });
            } 

            if(!Enabler.isPageLoaded()){
                Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, function(){
                	that.functionsWhenPageLoaded(that);
                });
            }

            if(this.expand == true){
                if (this.bannerType != "in-app"){
                    if (this.finalExpandSize[0] == 0 && this.finalExpandSize[1] == 0 && this.finalExpandSize[2] == 0 || this.finalExpandSize[3] == 0){
                        alert("Please add final expand size banner");
                    } else {
                        Enabler.setExpandingPixelOffsets(this.finalExpandSize[0], this.finalExpandSize[1], this.finalExpandSize[2], this.finalExpandSize[3], false, false);
                    }
                }

                Enabler.setStartExpanded(this.startExpanded);

                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_START, function(){
                    if(this.timelinesToRegister.expandStartAnimation){
                        eval(this.timelinesToRegister.expandStartAnimation());
                    }
                    Enabler.finishExpand()
                });

                Enabler.addEventListener( studio.events.StudioEvent.EXPAND_FINISH, function(){
                    if(this.timelinesToRegister.expandFinishAnimation){
                        eval(this.timelinesToRegister.expandFinishAnimation()); 
                    }
                });

                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_START, function(){
                    if(this.timelinesToRegister.collapseStartAnimation){
                        eval(this.timelinesToRegister.collapseStartAnimation());
                    }
                    Enabler.finishCollapse()
                });

                Enabler.addEventListener( studio.events.StudioEvent.COLLAPSE_FINISH, function(){
                    if(this.timelinesToRegister.collapseFinishAnimation){
                        eval(this.timelinesToRegister.collapseFinishAnimation()); 
                    }
                });

                //Initial orientation
                document.getElementsByTagName("body")[0].className = Enabler.getOrientation().getMode();

                Enabler.addEventListener(studio.events.StudioEvent.ORIENTATION, function(){
                    document.getElementsByTagName("body")[0].className = Enabler.getOrientation().getMode();
                });
            }
        },
        functionsWhenInit : function(that){
			that.addListeners();
        },
        functionsWhenPageLoaded : function(that){
            if (!Enabler.isVisible()) {
                Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, function(){
                    that.executeAnimations();
                });
            } else {
                that.executeAnimations();
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
        },
        executeAnimations : function(){
            this.animationFrames[0]();
        },
        collapseEvent : function(){
            Enabler.reportManualClose();
            Enabler.requestCollapse();
        },
        expandEvent : function(){
            Enabler.requestExpand();
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