// LIBRARIES

/* Copyright (c) 2010-2011 Marcus Westin */
var lstore=function(){var b={},e=window,g=e.document,c;b.disabled=false;b.set=function(){};b.get=function(){};b.remove=function(){};b.clear=function(){};b.transact=function(a,d){var f=b.get(a);if(typeof f=="undefined")f={};d(f);b.set(a,f)};b.serialize=function(a){return JSON.stringify(a)};b.deserialize=function(a){if(typeof a=="string")return JSON.parse(a)};var h;try{h="localStorage"in e&&e.localStorage}catch(k){h=false}if(h){c=e.localStorage;b.set=function(a,d){c.setItem(a,b.serialize(d))};b.get=
function(a){return b.deserialize(c.getItem(a))};b.remove=function(a){c.removeItem(a)};b.clear=function(){c.clear()}}else{var i;try{i="globalStorage"in e&&e.globalStorage&&e.globalStorage[e.location.hostname]}catch(l){i=false}if(i){c=e.globalStorage[e.location.hostname];b.set=function(a,d){c[a]=b.serialize(d)};b.get=function(a){return b.deserialize(c[a]&&c[a].value)};b.remove=function(a){delete c[a]};b.clear=function(){for(var a in c)delete c[a]}}else if(g.documentElement.addBehavior){c=g.createElement("div");
e=function(a){return function(){var d=Array.prototype.slice.call(arguments,0);d.unshift(c);g.body.appendChild(c);c.addBehavior("#default#userData");c.load("localStorage");d=a.apply(b,d);g.body.removeChild(c);return d}};b.set=e(function(a,d,f){a.setAttribute(d,b.serialize(f));a.save("localStorage")});b.get=e(function(a,d){return b.deserialize(a.getAttribute(d))});b.remove=e(function(a,d){a.removeAttribute(d);a.save("localStorage")});b.clear=e(function(a){var d=a.XMLDocument.documentElement.attributes;
a.load("localStorage");for(var f=0,j;j=d[f];f++)a.removeAttribute(j.name);a.save("localStorage")})}}try{b.set("__storejs__","__storejs__");if(b.get("__storejs__")!="__storejs__")b.disabled=true;b.remove("__storejs__")}catch(m){b.disabled=true}return b}();

// END LIBRARIES

window.TTX = null;
(function(){
    TTX = function(){

// GLOBALS
	var PANEL_PADDING = 5; // pad by 5 px
	var PANEL_WIDTH = 265; // default width for a panel
	var IDLE_MAX = 15*60*1000;
	var SYMBOLS = {
		heart: '<img width="14" src="http://turntablex.com/images/heart.png">',
		up: '<img width="14" src="http://turntablex.com/images/up.png">',
		down: '<img width="14" src="http://turntablex.com/images/down.png">',
		computer: '<img width="15" src="http://turntablex.com/images/computer.png">'
	};
	var ICONS = {
		mod: '<div class="mod icon" title="Moderator"></div>',
		up: '<div class="upvote icon" title="Awesomed" style="background-image:url(http://turntablex.com/images/up.png); background-size: 15px auto; width: 15px;"></div>',
		down: '<div class="downvote icon" title="Lamed" style="background-image:url(http://turntablex.com/images/down.png); background-size: 15px auto; width: 15px;"></div>',
		heart: '<div class="heart icon" title="Snagged" style="background-image:url(http://turntablex.com/images/heart.png); background-size: 15px auto; width: 15px;"></div>',
		superuser: '<div class="superuser icon" title="Superuser"></div>',
		fanned: '<div class="fanned icon" title="Fanned"></div>'
	};
	var STICKER_MAP = {
		'4f873b32af173a2903816e52': {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/reddit.png",
			height: 125,
			width: 90,
			name: 'reddit'
		},
		'4f86febfe77989117e00000a': {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/twitter.png",
			height: 77,
			width: 103,
			name: 'twitter'
		},
		"4f86fd27e77989117e000000": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/codecademy.png",
			height: 46,
			width: 186,
			name: 'codecademy'
		},
		"4f86fd3ee77989117e000002": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/facebook.png",
			height: 65,
			width: 67,
			name: 'facebook'
		},
		"4f86fe5de77989117e000007": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/stackoverflow.png",
			height: 66,
			width: 226,
			name: 'stackoverflow'
		},
		"4f86fd32e77989117e000001": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/etsy.png",
			height: 65,
			width: 110,
			name: 'etsy'
		},
		"4f86fe06e77989117e000004": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/github.png",
			height: 122,
			width: 135,
			name: 'github'
		},
		"4f86fe33e77989117e000006": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/pinterest.png",
			height: 49,
			width: 165,
			name: 'pinterest'
		},
		"4f86fea8e77989117e000009": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/turntable.png",
			height: 89,
			width: 139,
			name: 'turntable'
		},
		"4f86fe84e77989117e000008": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/stickybits.png",
			height: 53,
			width: 167,
			name: 'stickybits'
		},
		"4f86fe15e77989117e000005": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/meetup.png",
			height: 75,
			width: 104,
			name: 'meetup'
		},
		"4f86fdede77989117e000003": {
			url: "https://s3.amazonaws.com/static.turntable.fm/roommanager_assets/stickers/foursquare.png",
			height: 56,
			width: 176,
			name: 'foursquare'
		}
	
	};
	var _modalHijack = {
		type: '', // laptop | notifications | advanced
		action: '', // new | edit
		index: 0 // laptop index
	};


        // global state
	var self = this;
	var _premiumIDs = null; // IDs to check against for premium access
        var _premium = null; // enable premium access
        var _turntable = window.turntable; // handle to the turntable object
        
	// room state
	var _id = null; // current user ID
        var _room = null; // handle to the room object
	var _manager = null; // handle to the room manager
        var _location = null; // room URL location
        var _mods = null; // list of moderator IDs for the current room
	var _songHistory = null; // history of objects that look like _currentSong
	var _idleTimers = null; // idle timers of all users
	var _usernames = null; // mapping of username to id
	var _users = null; // mapping of id to username

	// song state
	var _currentSong = null; // info about the current song, formatted as {artist: 'blah',title: 'blah',dj: '', upvotes: 5, downvotes: 0, hearts: 1}
	var _upvoters = null; // ID of upvoters
	var _downvoters = null; // ID of downvoters
	var _hearts = null; // ID of users who <3 the song
	var _djs = null; // user ids of djs

	// user settings
	var settings;
	var defaultSettings = {
		notifications: {
			DJup: {
				chat: false,
				desktop: false
			},
			DJdown: {
				chat: false,
				desktop: false
			},
			songEnd: {
				chat: false,
				desktop: false
			},
			songBegins: {
				chat: false,
				desktop: false
			},
			userChat: {
				chat: false,
				desktop: false
			},
			userMention: {
				chat: false,
				desktop: false
			},
			userVote: {
				chat: false,
				desktop: false
			},
			userHeart: {
				chat: false,
				desktop: false
			},
			userJoin: {
				chat: false,
				desktop: false
			},
			userLeave: {
				chat: false,
				desktop: false
			},
			userPM: {
				chat: false,
				desktop: false
			}
			
		},
		panels:{
			
			'scene':{
				type: 'docked',
				index: 1,
				width: 'full',
				left: 0,
				top: 0,
				height: '100%',
				header: false,
				header: false
			},
			'queue':{
			
				type: 'docked',
				index: 2,
				width: 'auto',
				left: 0,
				top: 0,
				height: '100%',
				header: true,
				hidden: true
			},
			'room':{
			
				type: 'docked',
				index: 0,
				width: 'auto',
				left: 0,
				top: 0,
				height: '100%',
				header: true,
				hidden:false
			},
			'chat':{
				type: 'docked',
				index: 3,
				left: 0,
				top: 0,
				width: 'auto',
				height: '100%',
				header: true,
				hidden:true			
			}
		},
		autoDJ: false,
		autoAwesome: false,
		laptop: {
			type: 'default',
			stickers: {
				selected: 'Blinking X',
				animations: { //  sticker animations
					'Blinking X': {
						name: 'Blinking X',
						speed: 0,
						type: 'text',
						text: {
							display: ' x ',
							colors: 'pb',
							colorEachLetter: true,
							tick: 3
						},
						frames: [[]]
					},
					'Custom sample' : {
						name: 'Custom sample',
						speed: 500,
						type: 'custom',
						text: {
							display: '',
							colors: '',
							colorEachLetter: true,
							tick: 1
						},
						frames: [[]]
					}
				}
			}
		}
	};
// END GLOBALS

	log('Turntable X loaded');

// MAIN
	// load the settings
	loadSettings();
	
	// reset the room
        resetRoom(function(){
	    checkPremium(); // check premium status
	    initializeUI(); // initialize UI elements
	    resetMods(); // new mods
	    resetDJs(); // new DJs
	    resetUsers(); // new users
	    updateGuests(); // update guest list 
	    updateHeader(); // update header
	    initializeListeners(); // create DOM and Turntable event handlers
        });

// END MAIN

// SETTINGS

        // get settings from local storage and merge with defaults
	function loadSettings(){
		settings = lstore.get('ttx-settings');
                             
		if (!settings) {
			settings = defaultSettings;
			lstore.set('ttx-settings', settings);
		} else {
			// merge config with defaults to ensure no missing params
			settings = $.extend(true, {}, defaultSettings, settings);
			settings = defaultSettings;
			saveSettings();
		}

	}
	function saveSettings(){
		lstore.set('ttx-settings',settings);
	}

// END SETTINGS

// STATE

	// reset the state of the room
        function resetRoom(callback){
            _room = null;
	    _manager = null;
            _id = null;
            _location = window.location.pathname; 
            for (var o in _turntable){
                if (_turntable[o] !== null && _turntable[o].roomId){
                    _room = _turntable[o];
                    
 		    _id = _turntable.user.id;
		    
		    break;
                }
            }
            if (_room){ // found turntable room
                for (var o in _room){
			if (_room[o] !== null && typeof(_room[o]) !== 'undefined' && _room[o].roomData){
				_manager = _room[o];
				break;
			}
		}
                if (_manager && isSceneReady()){
		    $(window).unbind('resize').bind('resize',onResize).resize();
		    log('Entering room: ' + _location);
		    log(_room);
		    log('Found manager');
		    log(_manager);
		    log('Room id: ' + _room.roomId);
		    log('User id: ' + _id);
		 
		    newSong();
		    callback();

                }
                else{
                    // try again
                    setTimeout(function(){ resetRoom(callback); }, 250);
                }
            }
            else{
                // try again
                setTimeout(function(){ resetRoom(callback); },250);
            }
        }

	// called every time there is a song change
	function resetSong(){
		_currentSong = {};
		_currentSong.title = _room.currentSong.metadata.song;
		_currentSong.artist = _room.currentSong.metadata.artist;
		_upvoters = {};
		for (var i = 0; i < _room.upvoters.length; i++){
			_upvoters[_room.upvoters[i]] = 1;
		}
		_downvoters = {};
		_hearts = {};
		_currentSong.upvotes = _room.upvoters.length;
		_currentSong.downvotes = 0; // unknown
		_currentSong.hearts = 0; // unknown
		_currentSong.dj = _room.currentSong.djid;

	}
	// called every time there is a DJ change
	function resetDJs(){
		_djs = {};
		for (var i=0;i<_room.roomData.metadata.djs.length;i++){
			_djs[_room.roomData.metadata.djs[i]] = 1;
		}
	}
	// called when there is a room change
	function resetUsers(){
		var users = _room.users;
		var now = new Date().getTime();
		_usernames = {};
		_users = {};
		_idleTimers = {};
		for (var i in users) {
			// map names to ids
			if (typeof _usernames[ users[i].name ] == 'undefined'){
				_usernames[ users[i].name ] = i;
				_users[ i ] = users[i].name;
				_idleTimers[ i ] = now; // last action
			}
		}
	}
	// called when there is a room change
	function resetMods(){
		_mods = {};
		for (var i=0;i<_room.roomData.metadata.moderator_id.length;i++){
			_mods[_room.roomData.metadata.moderator_id[i]] = 1;
		}
	}

	

	// reset the state of premium access
        function checkPremium(){
            if (_premiumIDs === null || $.inArray(_id,_premiumIDs) >= 0){
                _premium = true;
                log('Premium features enabled');
            }
	    else{
	    	_premium = false;
	    }
        }
	function isMod(id){
		return typeof _mods[id] !== 'undefined';
	}
	function isDJ(id){
		return typeof _djs[id] !== 'undefined';
	}
	function isCurrentDJ(id){
		return id === _currentSong.dj;
	}
	function isUpvoter(id){
		return typeof _upvoters[id] !== 'undefined';
	}
	function isDownvoter(id){
		return typeof _downvoters[id] !== 'undefined';
	}
	function isHearter(id){
		return typeof _hearts[id] !== 'undefined';
	}
	function isBuddy(id){
		return (_turntable.user.buddies.indexOf(id) > -1);
	}
	function isFanOf(id){
		return (_turntable.user.fanOf.indexOf(id) > -1);
	}

// END STATE


// LISTENERS

	// initialize event handlers; this should only be done once
        function initializeListeners(){
            _turntable.addEventListener('message',onMessage);
	    $(document).bind('DOMNodeInserted',onDOM);
        }

	// new user is added
	function onRegistered(e){
		var now = new Date().getTime();
		for (var i in e.user) {
			var id = e.user[i].userid;
			
			var name = e.user[i].name;
			if (typeof _usernames[name] === 'undefined'){
				_usernames[name] = id;
				_users[id] = name;
				_idleTimers[id] = now;
			}
		}
	}

	// new user leaves the room
	function onDeregistered(e){
		for (var i in e.user){
			var id = e.user[i].userid;
			var name = e.user[i].name;
			if (typeof _users[id] !== 'undefined'){
				delete _users[id];
				delete _usernames[name];
				delete _idleTimers[id];
			}
			
		}
	}
	function newSong(){
		var votelog = _room.roomData.metadata.votelog;
		var currentSong = _room.roomData.metadata.current_song;
		var downvotes = _room.roomData.metadata.downvotes;
		var upvotes = _room.roomData.metadata.upvotes;
		_currentSong = {};
		_currentSong.hearts = 0;
		_currentSong.downvotes = downvotes;
		_currentSong.upvotes = upvotes;
		_currentSong.artist = currentSong.metadata.artist;
		_currentSong.title = currentSong.metadata.song;
		_currentSong.dj = currentSong.djid;
		
		_upvoters = {};
		_downvoters = {};
		_hearts = {};
		for (var i=0; i<votelog.length; i++){
			var vote = votelog[i];
			if (vote[1] === 'up'){
				_upvoters[vote[0]] = 1;
			}
			else{
				_downvoters[vote[0]] = 1;
			}
		}
	}
	function scrollChat(){
			
		var messages= $('#chat .messages');
		messages.scrollTop(messages.prop('scrollHeight'));
	}
	function onDOM(e){
		var $element = $(e.target);
		
		if ($element.hasClass('message')){
			var messages = $element.parent();
			var scrollHeight = messages.prop('scrollHeight');
			var height = messages.height();
			if (scrollHeight - messages.scrollTop() - height < 100){
				messages.scrollTop(scrollHeight);
			}
		}
		// hook to display custom modals
		else if ($element.hasClass('modalContainer') ){
			if (_modalHijack.type === 'settings'){
				_modalHijack.type = '';
				$element.find('.title').text('Advanced Settings');
				var fields = $element.find('.field.settings');
				$('button.submit').unbind('click').bind('click',function(){
					if($('#ttxSettingsAutoBop').is(':checked')){
						settings.autoAwesome = true;
					}
					else{
						settings.autoAwesome = false;
					}
					saveSettings();
					$element.find('.close-x').click();
				});
				fields.html('<div style="display:inline-block;font-size:14px;margin-right:10px">Auto Awesome: </div><input type="checkbox" id="ttxSettingsAutoBop" '+ (settings.autoAwesome === true ? 'checked="checked"' : '') + '/>');
				
			}
			else if (_modalHijack.type === 'laptop'){
				if (_modalHijack.action === 'new'){
					newLaptopAnimation = {
						name: '',
						type: 'custom',
						speed: 500,
						text: {
							display: '',
							colors: '',
							colorEachLetter: true,
							tick: 1
						},
						frames: [[]] // one frame with no stickers
					};
					$element.find('.title').text('Create a New Laptop');
				}
				else{ // edit
					newLaptopAnimation = $.extend(true,{},settings.laptop.stickers.animations[_modalHijack.index]);
					$element.find('.title').text('Edit Your Laptop');
				}
				newLaptopAnimation.selected = 1;
				_modalHijack.type = '';
				
				// save important elements
				var laptop = $element.find('#laptop');
				var frameCounter = $element.find('h3:contains("Your Stickers")');
				var picker = $element.find('#picker');
				var laptopView = $element.find('#laptopView');
				var boundingBox = laptop.find('.boundingBox');
				// add general laptop settings
				laptop.before('<div id="ttxLaptopSettings" style="width:100%; padding-bottom:10px">\
						<div><div style="display:inline-block; margin: 8px; width:80px">Name:</div><input style="width: 300px; height:10px; position:relative; top: 9px;" id="ttxLaptopName" type="text" value="'+newLaptopAnimation.name+'"/></div>\
						<div><div style="display:inline-block; margin: 8px; width:80px">Speed:</div><div style="display: inline-block; width:320px; height: 10px;" id="ttxLaptopSpeed"/></div>\
						<div><div style="display:inline-block; margin: 8px; width:80px">Animation:</div><input name="ttxLaptopAnimation" style="margin-right:5px" type="radio" value="text" '+(newLaptopAnimation.type === 'text' ? 'checked':'')+'/>text<input name="ttxLaptopAnimation" type="radio" style="margin-left:12px; margin-right:5px" value="custom" '+(newLaptopAnimation.type === 'custom' ? 'checked':'')+'/>custom</div>\
						</div>');
				$('#ttxLaptopSpeed').slider(); // create slider for animation speed
				
				// add laptop scroll buttons (for custom laptop)
				$('<div id="ttxLaptopScrollLeft" class="inactive"></div>').appendTo(laptop);
				$('<div id="ttxLaptopScrollRight"></div>').appendTo(laptop);
				
				$element.find('.buttons').hide(); // hide the default save button
				
				// add laptop text settings
				picker.before('<div id="ttxLaptopTextSettings" style="display:none; margin-bottom:10px; width:100%; padding-top:10px;">\
						<div><div style="display:inline-block; margin: 8px; width:80px">Text:</div><input style="width: 300px; height:10px; position:relative; top: 9px; margin-right:10px" id="ttxLaptopText" type="text" value="'+newLaptopAnimation.text.display+'"/>tick number: <input type="text" id="ttxLaptopTicks" style="width:30px;height:10px;position:relative;top:9px;" value="'+ newLaptopAnimation.text.tick +'"/></div>\
						<div><div style="display:inline-block; margin: 8px; width:80px">Colors:</div><input style="width: 300px; height:10px; position:relative; top: 9px; margin-right:10px" id="ttxLaptopColors" type="text" value="'+newLaptopAnimation.text.colors+'"/>each letter: <input type="checkbox" id="ttxLaptopColorEach" '+ (newLaptopAnimation.text.colorEachLetter ? 'checked="checked"':'') + '</div>\
						</div>');
						
				// add save and preview buttons
				picker.after('<div id="ttxLaptopButtons" style="text-align:center; width:100%; margin-top: 5px;">\
									<button id="ttxLaptopPreview" style="position:relative; top:0px;right:0px;" class="ttxSubmit">Preview</button>\
									<button id="ttxLaptopSave" style="position:relative; top:0px;right:0px;" class="submit">Save</button>\
								   </div>');
			
				$('#ttxLaptopPreview').click(function(){
					if (newLaptopAnimation.type === 'custom'){
						saveStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1);
						newLaptopAnimation.selected = 1;
						renderStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1);
						frameCounter.text('Frame ' + newLaptopAnimation.selected +' of '+newLaptopAnimation.frames.length);
						previewStickers();
					}
				});
				$('#ttxLaptopSave').click(function(){
					settings.laptop.stickers.animations[$('#ttxLaptopName').val()] = newLaptopAnimation;
					updateLaptops();
					$element.find('.close-x').click(); // close the modal
					
				});
				if (newLaptopAnimation.type === 'text'){ // hide the custom-only items
					$('#picker').hide();
					$('#remainingCount').hide();
					$('#ttxLaptopScrollLeft').hide();
					$('#ttxLaptopScrollRight').hide();
					frameCounter.hide();
				}
				else{ // hide the text-only items
					$('#ttxLaptopTextSettings').hide();
				}
				
				$('input[name="ttxLaptopAnimation"]',$('#ttxLaptopSettings')).change(function(e){
					var new_type = $(this).val();
					newLaptopAnimation.type = new_type;
					if (new_type === 'text'){
						$('#picker').hide();
						$('#remainingCount').hide();
						$('#ttxLaptopScrollLeft').hide();
						$('#ttxLaptopScrollRight').hide();
						frameCounter.hide();
						
						$('#ttxLaptopTextSettings').show();
					}
					else{
						$('#picker').show();
						$('#remainingCount').show();
						$('#ttxLaptopScrollLeft').show();
						$('#ttxLaptopScrollRight').show();
						frameCounter.show();
						
						$('#ttxLaptopTextSettings').hide();
					}
				});
				$('#ttxLaptopScrollRight').click(function(e){ // add a new frame / move to the right
					saveStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1); // save the stickers to the current frame
					newLaptopAnimation.selected += 1; // update the current frame counter
					if (newLaptopAnimation.selected > newLaptopAnimation.frames.length){ // add new frame if necessary
						newLaptopAnimation.frames.push([]);
					}
					renderStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1); // remove old stickers and render new stickers
					
					frameCounter.text('Frame '+ newLaptopAnimation.selected +' of '+newLaptopAnimation.frames.length); // update frame counter
					$('#ttxLaptopScrollLeft').removeClass('inactive'); // enable left scroller since we just moved up a frame
					
				
				}).mouseover(function(){ boundingBox.hide(); });
				$('#ttxLaptopScrollLeft').click(function(e){
					if ($(this).hasClass('inactive')){
						return;
					}
					saveStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1);
					newLaptopAnimation.selected -= 1;
					renderStickers(laptopView,newLaptopAnimation,newLaptopAnimation.selected-1);
					
					if (newLaptopAnimation.selected === 1){
						$(this).addClass('inactive'); // disable left scroller, this is the first frame
					}
					frameCounter.text('Frame ' + newLaptopAnimation.selected+' of '+newLaptopAnimation.frames.length); // update frame counter
					
				
				}).mouseover(function(){ boundingBox.hide(); });
				// update the text for the frame counter
			        frameCounter.text('Frame ' + newLaptopAnimation.selected +' of '+newLaptopAnimation.frames.length);
			}
		}
	}
	function onVote(e){
		var data = e.room.metadata.votelog[0];
		var id = data[0];
		var vote = data[1];
		var now = new Date().getTime();
		if (id === ''){
			log('Vote ID unknown: ' + vote);
			if (vote === 'up'){
				_currentSong.upvotes = _currentSong.upvotes + 1;
			}
			else{
				_currentSong.downvotes = _currentSong.downvotes + 1;
			}
			return;
		}
		var name = _users[id];
		_idleTimers[id] = now;
		if (vote === 'up'){
			if ( typeof(_upvoters[id]) === 'undefined' ){ // new upvote
				_upvoters[id] = 1;
				_currentSong.upvotes = _currentSong.upvotes + 1;
			}
			if ( typeof(_downvoters[id]) !== 'undefined' ){ // .. used to be a downvote
				delete(_downvoters[id]);
				_currentSong.downvotes = _currentSong.downvotes - 1;
			}
		}
		else{
			if ( typeof(_downvoters[id]) === 'undefined' ){ // new downvote
				_downvoters[id] = 1;
				_currentSong.downvotes = _currentSong.downvotes + 1;
			}
			if ( typeof(_upvoters[id]) !== 'undefined' ){ // .. used to be an upvote
				delete(_upvoters[id]);
				_currentSong.upvotes = _currentSong.upvotes - 1;
			}
		}

	
	}
	
	function onHeart(e){
		var now = new Date().getTime();
		if (typeof _hearts[e.userid] === 'undefined'){ // new heart
			_hearts[e.userid] = 1;
			_currentSong.hearts = _currentSong.hearts + 1;
		}
		_idleTimers[e.userid] = now;
		var name = _users[e.userid];
		addChatMessage('http://turntablex.com/images/heart.png',name,'saved this song');
	}
	function onChat(e){
		var now = new Date().getTime();
		_idleTimers[e.userid] = now;
	}
	function onRemoveDJ(e){
		resetDJs();
	}
	function onAddDJ(e){
		resetDJs();
	}
	function onNewSong(e){
		resetSong();
		autoVote(e);
	}
        function onMessage(e){
            if (e.hasOwnProperty('msgid')) {
    		return;
	    }
	    log('Command: ' + e.command);
	    if (e.command == 'rem_dj') {
		onRemoveDJ(e); // reset djs
	    } else if (e.command == 'add_dj') {
		onAddDJ(e); // reset djs
	    } else if (e.command == 'speak' && e.userid) {
		onChat(e);
	    } else if (e.command == 'newsong') {
		onNewSong(e);
		updateHeader(); // reflect change in header
	    } else if (e.command == 'update_votes') {
		onVote(e);
		updateHeader(); // reflect vote change in header
	    } else if (e.command == 'update_user') {
	    }
	    else if (e.command == 'registered') {
		if( _location !== window.location.pathname ){ // room change
			resetRoom(function(){
				checkPremium(); // check premium status
	    			initializeUI(); // initialize UI elements
	    			resetMods(); // new mods
	    			resetDJs(); // new DJs
	    			resetUsers(); // new users
	    			updateGuests(); // update guest list 
				updateHeader(); // update header
			});
		}
		else{
			onRegistered(e);
		}
	    } else if (e.command == 'snagged') {
            	onHeart(e);
		updateHeader();
	    } else if (e.command == 'pmmed') {
            } else if (e.command == 'deregistered'){
		onDeregistered(e);
	    }
	    updateGuests(); // update guest list every time something happens
        }
	function onResize(){
		var width = 0;
		$('#ttx-panels .ttx-panel').each(function(){
			if ($(this).hasClass('full') === false){
				width += ($(this).width()+PANEL_PADDING);
			}
		});
		var sceneWidth = $('#ttx-panels').width() - width - PANEL_PADDING - 25;
		
		$('#ttx-panels-scene').css({width: sceneWidth+'px'});
		$('#scene').css({width:'1468px',height:'100%',left:'auto',right:'50%',top:'50%',marginTop:'-300px',marginLeft:'0px',marginRight:'-734px'})
	}
	// docking a floating panel back into the dock
	function onPanelDock(e){
		var panelName, panel = $(this).parents('.ttx-panel');
		if(panel.attr('id') === 'right-panel'){
			panelName = 'chat';
		}
		else{
			panelName = panel.attr('id').replace('ttx-panels-','');
		}
		panel.removeClass('float').draggable('destroy').resizable('destroy').resizable(dockedPanelResizable).css({'height':'100%','position':'relative','top':'0px','bottom':'0px','left':'0px','right':'0px'});
		
		// fix settings
		settings.panels[panelName].type = 'docked'
		settings.panels[panelName].height = '100%'
		settings.panels[panelName].left = 0
		settings.panels[panelName].right = 0
		
		// push it into the dock
		var stop = false;
		$('#ttx-panels .ttx-panel').each(function(){
			if (!stop && $(this).offset().left > panel.offset().left){
				$(this).before(panel.detach());
				stop = true;	
			} 	
		});
		if (!stop){ // add it into the dock at the end
			panel.appendTo($('#ttx-panels'));
		}
		
		// remove from float manager
		delete _panels.float[panelName];
		// reset dock manager
		_panels.dock = [];
		$('#ttx-panels .ttx-panel').each(function(){
			var name;
			if ($(this).attr('id')==='right-panel'){
				name = 'chat';
			}
			else{
				name = $(this).attr('id').replace('ttx-panels-','');
			}
			_panels.dock.push(name);
		});
		$(window).resize();
		saveSettings();
	}
	function onPanelMinimize(e){
		e.preventDefault();
		e.stopPropagation();

		var panelName, panel = $(this).parents('.ttx-panel');
		if(panel.attr('id') === 'right-panel'){
			panelName = 'chat';
		}
		else{
			panelName = panel.attr('id').replace('ttx-panels-','');
		}


		// add panel entry to the dock
		$('#ttx-dock-menu').append($('<li class="option">'+panelName+'</li>').click(onPanelMaximize));
		var fixDock = false;
		if (panelName in _panels.float){ // float panel
			delete _panels.float[panelName];
		}
		else{
			fixDock = true;
		}
		if(panelName === 'chat'){
			$('#right-panel').addClass('hidden').detach().appendTo($('.roomView'));
		}
		else{
			$('#ttx-panels-'+panelName).addClass('hidden').detach().appendTo($('.roomView'));
		}
		$(window).resize();
		
		settings.panels[panelName].hidden = true;
		_panels.hidden[panelName] = 1;
		var hiddens = 0;
		for (var i in _panels.hidden){
			if (_panels.hidden.hasOwnProperty(i)){
				hiddens += 1;
			}
		}
		if (fixDock){
			_panels.dock = [];
			$('#ttx-panels .ttx-panel').each(function(){
				var name;
				if ($(this).attr('id')==='right-panel'){
					name = 'chat';
				}
				else{
					name = $(this).attr('id').replace('ttx-panels-','');
				}
				_panels.dock.push(name);
			});
		}
	
		$('.ttx-dock-count').css('color','#F0D438');
		$('#ttx-dock-menu').css('visibility','visible');
		$('.ttx-dock-count').text(hiddens);
		saveSettings();
	}
	var floatingPanelDraggable = { handle:'.floating-panel-tab', stop: onFloatingPanelDrag };
	var floatingPanelResizable = { minWidth:PANEL_WIDTH,minHeight:PANEL_WIDTH,handles:'n, e, w, s, ne, sw, se, nw',stop: onFloatingPanelResize };
	var dockedPanelResizable = {stop: onDockedPanelResize, handles:'e',minWidth:PANEL_WIDTH};
	
	function onFloatingPanelDrag(event,ui){
		var name, id = $(this).attr('id');
		if (id === 'right-panel'){
			name = 'chat';
			scrollChat();
		}
		else{
			name = id.replace('ttx-panels-','');
		}
		settings.panels[name].top = ui.offset.top;
		settings.panels[name].left = ui.offset.left;
		saveSettings();
	}
	function onFloatingPanelResize(event,ui){ 
		var name, id = $(this).attr('id');
		if (id === 'right-panel'){
			name = 'chat';
			scrollChat();
		}
		else{
			name = id.replace('ttx-panels-','');
		}
		settings.panels[name].width = ui.size.width;
		settings.panels[name].height = ui.size.height + 'px';
		settings.panels[name].top = $(this).offset().top;
		settings.panels[name].left = $(this).offset().left;
		saveSettings();
	}
	function onDockedPanelResize(event,ui){
		var name, id = $(this).attr('id');
		if (id === 'right-panel'){
			name = 'chat';
		}
		else{
			name = id.replace('ttx-panels-','');
		}
		$(this).css({'height':'100%','bottom':'0px','top':'0px'});
		settings.panels[name].width = ui.size.width;
		saveSettings();
	}
	
	function onPanelStop(event,ui){
		if (ui.item.parent().attr('id') !== 'ttx-panels'){ // dock -> floating
			ui.item.addClass('float').css({top:ui.placeholder.css('top'),left:ui.placeholder.css('left'),position:'absolute',width:ui.placeholder.width()+'px',height:'300px'}).draggable(floatingPanelDraggable).resizable('destroy').resizable(floatingPanelResizable);
			var id = ui.item.attr('id');
			var name;
			if (id === 'right-panel'){
				name = 'chat';
			}
			else{
				name = id.replace('ttx-panels-','');
			}
			_panels.float[name] = 1;
			// reset dock
			_panels.dock = [];
			var docked = $('#ttx-panels > *');
			for (var i=0;i<docked.length;i++){
				var panel_name;
				if (docked[i].id === 'right-panel'){
					panel_name = 'chat';
				}
				else{
					panel_name = docked[i].id.replace('ttx-panels-','');
				}
				_panels.dock.push(panel_name);
			}	
			settings.panels[name].left = parseInt(ui.item.css('left'));
			settings.panels[name].top = parseInt(ui.item.css('top'));
			settings.panels[name].type = 'float';
			settings.panels[name].height = '300px';
			settings.panels[name].width = ui.item.width();
			saveSettings();
		}
		
		$(window).resize();
	}
	function onPanelMove(event,ui){
		if (ui.offset.top > 0.25 * $('#ttx-panels').height()){
			ui.helper.data('originalHeight',ui.helper.height());
			ui.helper.css('height','300px');
			var placeholder = $(this).find('.placeholder');
			if (placeholder.length){
				placeholder.detach().appendTo('.roomView');
				placeholder.css({position:'absolute',left:ui.offset.left,top:ui.offset.top});
			}
			else{
				placeholder = $('.roomView .placeholder');
				placeholder.css({left:ui.offset.left,top:ui.offset.top});
			}
			ui.helper.detach().appendTo('.roomView');
	
			$(this).sortable('refresh');
			
		}
		else{
			ui.helper.css('height','100%').detach().appendTo('#ttx-panels');
			ui.placeholder.css({left:'0px',top:'0px',position:'relative'});
		}
		$(window).resize();
	}
	function onPanelReorder(event,ui){
		var new_dock = [];
		if (ui.item.attr('id')==='right-panel'){
			scrollChat();
		}
		$(this).children().each(function(){
			var name;
			if($(this).attr('id') === 'right-panel'){
				name = 'chat';
			}
			else{
				name = $(this).attr('id').replace('ttx-panels-','');
			}
			settings.panels[name].index = $(this).index(); // update the index
			new_dock.push(name);
		});
		_panels.dock = new_dock;
		saveSettings();
	}

// END LISTENERS

// INTERFACE
		// update guest list (UI)
	var guestsTimer = null;
	function updateGuests(){
		if (typeof guestsTimer == "number") {
			clearTimeout(guestsTimer);
			guestsTimer = null;
		}

		// attempt to repaint the DOM in 50 ms unless cancelled
		guestsTimer = setTimeout(function() {
			// get the current time
			var now = new Date().getTime();

			// update the chat box
			var guest_container = $('.guest-list-container .guests');
			var guests = $('.guest-list-container .guest');
			var hasBuddies = false;
			guests.each(function() {
				var $this = $(this);
				var $name = $this.find('.guestName');
				var username = $name.text();
				if (typeof _usernames[username] != 'undefined') {
					var user_id = _usernames[username];
					// update extra classes and idle time
					var icons = '';
					var extrasClass = ' ';
					if (isMod(user_id)){
						extrasClass = extrasClass + ' isMod';
						icons = icons + ICONS.mod;
					}
					if ($this.find('.icon.superuser').length){
						extrasClass = extrasClass + ' isSuper';
						icons = icons + ICONS.superuser;
					}
					if (isDJ(user_id)){
						extrasClass = extrasClass + ' isDJ'; 
					}
					if (isCurrentDJ(user_id)){
						extrasClass = extrasClass + ' isCurrentDJ';
					}
					if (isBuddy(user_id)){
						if (extrasClass === ' '){
							hasBuddies = true;
						}
						extrasClass = extrasClass + ' isBuddy'; // mutual fans
						
					}
					if (isHearter(user_id)){
						extrasClass = extrasClass + ' isHearter';
						icons = icons + ICONS.heart;
					}
					if (isUpvoter(user_id)){
						extrasClass = extrasClass + ' isUpvoter';
						icons = icons + ICONS.up;
					}
					if (isDownvoter(user_id)){
						extrasClass = extrasClass + ' isDownvoter';
						icons = icons + ICONS.down;
					}
					
					if (isFanOf(user_id)){
						extrasClass = extrasClass + ' isFanOf'; // you are a fan of
						icons = icons + ICONS.fanned;
					}
					if (now - _idleTimers[user_id] > IDLE_MAX){
						$this.find('.guest-avatar').css('-webkit-filter','grayscale(100%)');
						extrasClass = extrasClass + ' isIdle';
					}
					else{
						$this.find('.guest-avatar').css('-webkit-filter','grayscale(0%)');
					}
					var iconDiv = $this.find('.icons');
					iconDiv.html(icons);
					
					var idle = $this.find('.guestIdle');
					var idleText = formatTimeDelta(_idleTimers[user_id]);
					if (idle.length){
						idle.html(idleText);
					}
					else{
						$name.after('<div class="guestIdle" style="position: absolute; bottom: 0px; right: 5px; width: 50px; height: 24px; line-height: 24px; color: #bbb; overflow: hidden; text-align: right">' + idleText + '</div>');
					}
					$this.removeClass('isDJ isMod isSuper isUpvoter isDownvoter isHearter isIdle isCurrentDJ').addClass(extrasClass);
				}
			});
			//guests.filter('.isDownvoter').prependTo(guest_container); // then downvoters
			//guests.filter('.isUpvoter').prependTo(guest_container); // then upvoters
			//guests.filter('.isHearter').prependTo(guest_container); // then hearters
			
			guests.filter('.isIdle').appendTo(guest_container); 
			
			//$('.guest-list-container .separator').filter(function(x){
			//	return $(this).find('.text')[0].innerHTML === 'Audience';
			//}).prependTo(guest_container);
			
			//guests.filter('.isFanOf').prependTo(guest_container);
			//if ($('#ttxGuestsFanOfSeparator').length===0){
			//	$('<div class="separator" id="ttxGuestsFanOfSeparator"><div class="text">Idols</div></div>').prependTo(guest_container);
			//}
			//else{
			//	$('#ttxGuestsFanOfSeparator').prependTo(guest_container);
			//}
			
			//guests.filter('.isBuddy').prependTo(guest_container);
			//if ($('#ttxGuestsBuddiesSeparator').length===0){
			//('<div class="separator" id="ttxGuestsBuddiesSeparator"><div class="text">Buddies</div></div>').prependTo(guest_container);
			//
			//se{
			//('#ttxGuestsBuddiesSeparator').prependTo(guest_container);
			//
			// (hasBuddies === false){
			//('#ttxGuestsBuddiesSeparator').hide();
			//
			//e{
			//	$('#ttxGuestsBuddiesSeparator').show();
			//}
			
			//guests.filter('.isMod').prependTo(guest_container); 
			//guests.filter('.isSuper').prependTo(guest_container);
			//$('.guest-list-container .separator').filter(function(x){
			//	return $(this).find('.text')[0].innerHTML === 'Moderators';
			//}).prependTo(guest_container);

			//if ($('#ttxGuestsModSeparator').length===0){
			//	$('<div class="separator" id="ttxGuestsModSeparator"><div class="text">Mods</div></div>').prependTo(guest_container);
			//}
			//else{
			//	$('#ttxGuestsModSeparator').prependTo(guest_container);
			//}

			
			
		        //guests.filter('.isDJ').prependTo(guest_container); 
			//$('.guest-list-container .separator').filter(function(x){
		//		return $(this).find('.text')[0].innerHTML === 'DJs';
		//	}).prependTo(guest_container);
		
			}, 50);
	}
	// update header (UI)
	function updateHeader(){
		var header = $('.room .name');
		var song_bar = header.find('#ttx-songbar');
		var text = '(' + _currentSong.upvotes + SYMBOLS.up + ','+ _currentSong.downvotes + SYMBOLS.down + ',' + _currentSong.hearts + SYMBOLS.heart + ') ' + _currentSong.title+' by <b>'+_currentSong.artist+'</b>';
		if (song_bar.length){
			song_bar.html(text);
		}
		else{
			header.text(header.text()+': ');
			$('<span id="ttx-songbar" style="font-size:14px; font-weight:normal">' + text + '</span>').appendTo(header);
		}
	}
	function updatePanels(){
           
        }

	function addWidescreen(){
	    // make everything widescreen
	    $('#maindiv').css({minWidth:'1200px'});
	    $('#outer').css({width:'100%',maxWidth:'100%',maxHeight:'100%'});
	    $('#turntable').css({maxHeight:'100%',width:'100%',maxWidth:'100%',height:'auto',top:'0px',bottom:'0px',position:'absolute'});
	    $('#header').css({width:'98%',left:'5px'});
	    $('#header .name').css({right:'100px'});
	    $('#song-search-input').css({width:'auto',right:'10px'});
	}
	var _panels;
	function onPanelMaximize(){
		var name = $(this).text();
		var type = settings.panels[name].type;
		var container;
		var panel;

		if(name === 'chat'){
			panel = $('#right-panel');	
		}
		else{
			panel = $('#ttx-panels-'+name);
		}

		settings.panels[name].hidden = false;
		if (type === 'docked'){
			container = $('#ttx-panels');
			var index = settings.panels[name].index;
			log('index is ' + index + ' dock len is ' + _panels.dock.length);
			if (index >= _panels.dock.length){ // append to the end
				
				$('#ttx-panels').children().last().after(panel.detach());
				log('detaching panel!');
				settings.panels[name].index = _panels.dock.length;
			}
			else { // put it in place and increment the others
				container.find('.ttx-panel').each(function(){
					var panel_name;
					if ($(this).attr('id')==='right-panel'){
						panel_name = 'chat';
					}
					else{
						panel_name = $(this).attr('id').replace('ttx-panels-','');
					}
					var my_index = $(this).index();
					if (my_index === index){
						$(this).before(panel.detach());
						settings.panels[name].index = my_index;
						my_index += 1; // incremenet by 1 
					}
					settings.panels[panel_name].index = my_index;
				});
			}
			panel.removeClass('hidden').mousedown().mouseup();

			// refresh the dock
			_panels.dock = [];
			$('#ttx-panels > *').each(function(){
				var panel_name;
				if ($(this).attr('id') === 'right-panel'){
					panel_name = 'chat';
				}
				else{
					panel_name = $(this).attr('id').replace('ttx-panels-','');
				}
				_panels.dock.push(panel_name);
			});
			
			
			$(window).resize();
		}
		else{ 
			container = $('.roomView');
			_panels.float[name] = 1;
			panel.removeClass('hidden').appendTo(container).mousedown().mouseup();
		}
		if (name === 'chat'){
			scrollChat();
		}
		
		delete _panels.hidden[name];
		var hiddens = 0;
		for (var i in _panels.hidden){
			if (_panels.hidden.hasOwnProperty(i)){
				hiddens += 1;
			}
		}
		if (hiddens === 0){
			$('.ttx-dock-count').css('color','#000');
			$('#ttx-dock-menu').css('visibility','hidden');
		}
		else{
			$('#ttx-dock-menu').css('visibility','visible');
		}
		$('.ttx-dock-count').text(hiddens);
		saveSettings();
		
		$('#ttx-dock-').removeClass('hover');
		$(this).remove();
	}
	var dockhover;
	function addPanels(){
	     $('#ding-menu').css('z-index',999);
	     _panels = { dock: [], float: {}, hidden: {}};
	     hiddens = 0;
		for (var i in settings.panels){
			if(!settings.panels.hasOwnProperty(i)){
				continue;
			}
			if (settings.panels[i].hidden === true){
				_panels.hidden[i] = 1;
				hiddens += 1;
			}
			else if (settings.panels[i].type === 'docked'){
				
				_panels.dock.push({index:settings.panels[i].index, name:i});
			}
			else{
				_panels.float[i] = 1;
			}
		}
		_panels.dock.sort(function(a,b){
			return a.index >= b.index;
		});
		for (var i=0;i<_panels.dock.length;i++){
			_panels.dock[i] = _panels.dock[i].name;
		}

 	    // add dock area in header
	    $('#header .info').css('left','160px');
	    $('#header .logo').after('<div id="ttx-dock-">\
	    <div class="dropdown-container" id="ttx-dock-container">\
		<div id="ttx-dock">\
			<span class="ttx-dock-count">1</span>\
		</div>\
		<ul class="floating-menu down" id="ttx-dock-menu">\
		</ul>\
	    </div>\
	    </div>');
	    $('#ttx-dock').mouseover(function(){
			$(this).find('.ttx-dock-count').addClass('hover');
		}).mouseout(function(){
			$(this).find('.ttx-dock-count').removeClass('hover');
		}).css('cursor','pointer');

	    $('#ttx-dock-').mouseover(function(){
			if (dockhover){
				clearTimeout(dockhover);
				dockhover = null;
			}
			$(this).addClass('hover');
		}).mouseout(function(){
			var self = $(this);
			dockhover = setTimeout(function(){ self.removeClass('hover'); },600);
		});
	    if (hiddens > 0){
	
	    	for (var i in _panels.hidden){
	    		if(_panels.hidden.hasOwnProperty(i)){
	    			$('<li class="option">'+i+'</li>').click(onPanelMaximize).appendTo('#ttx-dock-menu');
	    		}
		}
		$('#ttx-dock-menu').css('visibility','visible');
	    }
	    else{
		$('.ttx-dock-count').css('color','#000');
	    	$('#ttx-dock-menu').css('visibility','hidden');
	    }
	    $('.ttx-dock-count').text(hiddens);

		// fix up chat
	    var rightPanel = $('#right-panel').css({right:'auto',top:settings.panels.chat.top+'px',bottom:'0px',height:settings.panels.chat.height,marginLeft:'5px',width:(settings.panels.chat.width === 'auto' ? PANEL_WIDTH : settings.panels.chat.width)+'px',left:settings.panels.chat.left+'px',float:'left',position:(settings.panels.chat.type==='docked'? 'relative':'absolute'),marginRight:'0px'}).addClass('ttx-panel');
	    $('#chat-input').css({width:'auto',right:'5px'});
	    $('.chat-container').addClass('selected').css({width:'100%'}).unbind('click')
	    .find('.tab-icon').css('background-position','0px 0px');
	    
	    $('#left-panel').hide();

	    // add a panel around the scene
	    if ($('#ttx-panels-scene').length===0){
	    	rightPanel.before('<div id="ttx-panels-scene" class="ttx-panel full no-header" style="position:relative;margin-left:5px;overflow:hidden;float:left;height:100%;width:100px;"></div>');
	    }

	    $('#scene').css({width:'1468px',height:'100%',left:'auto',right:'50%',top:'50%',marginTop:'-300px',marginLeft:'0px',marginRight:'-734px'}).appendTo($('#ttx-panels-scene'));
	    
	    // add a panel around the room
	    if ($("#ttx-panels-room").length===0){
	    	 rightPanel.before('<div id="ttx-panels-room" class="ttx-panel" style="left:'+settings.panels.room.left+'px;position:'+(settings.panels.room.type==='docked' ? 'relative':'absolute')+';margin-left:5px;overflow:hidden;float:left;height:'+settings.panels.room.height+';top:'+settings.panels.room.top+'px;width:'+(settings.panels.room.width === 'auto' ? PANEL_WIDTH : settings.panels.room.width)+'px;"><ul id="ttx-panels-room-tabs"></ul></div>');
	    }
	    $('#room-info-container').css({width:'100%'}).addClass('selected').appendTo("#ttx-panels-room-tabs")
	    .find('.tab-icon').css('background-position','1px -15px');
	    
	    // add a panel around the queue
	    if ($("#ttx-panels-queue").length===0){
	    	 $('#right-panel').before('<div id="ttx-panels-queue" class="ttx-panel" style="left:'+settings.panels.queue.left+'px;position:'+(settings.panels.queue.type==='docked' ? 'relative':'absolute')+';margin-left:5px;overflow:hidden;float:left;height:'+settings.panels.queue.height+';top:'+settings.panels.queue.top+'px;width:'+(settings.panels.queue.width === 'auto' ? PANEL_WIDTH : settings.panels.queue.width)+'px;"><ul id="ttx-panels-queue-tabs"></ul></div>');
	    }
	    $('#playlist-container').css({width:'100%'}).addClass('selected').appendTo('#ttx-panels-queue-tabs');
	    $('#playlist-container')
  	    .find('.tab-icon').css('background-position','0px -31px');
	    

	    
	    var tabs = $('.floating-panel-tab').removeClass('left-divider').css({'background': '-webkit-linear-gradient(top,#999 0,#777 100%)','border-top-left-radius':'5px','border-top-right-radius':'5px',width:'100%'});
	    tabs.append($('<div class="ttx-minimize" style="position:absolute;line-height:30px;right:10px;top:0px;height:22px"><h2 class="ttx-controls-dock" style="margin-right:5px;font-size:22px;">▴</h2><h2 class="ttx-controls-minimize" style="font-size:22px">–</h2></div>'));
	    $('.ttx-controls-minimize').click(onPanelMinimize);
	    $('.ttx-controls-dock').click(onPanelDock);
	    tabs.css({'box-shadow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25),inset 0 -1px 0 0 #222',
	    'background': '-moz-linear-gradient(top,#999 0,#777 100%)',
	    'cursor': 'pointer',
            'border-right': 'solid 1px #444'})
	    .find('h2').css('color','#323232');

	   
	    if ( settings.panels.chat.hidden ){
	    	rightPanel.addClass('hidden');
	    }
	    if ( settings.panels.chat.type === 'float' ){
	    	rightPanel.addClass('float');
	    }
	    if ( settings.panels.room.hidden){
	    	$('#ttx-panels-room').addClass('hidden');
            }
            if ( settings.panels.room.type === 'float'){
            	$('#ttx-panels-room').addClass('float');
            }
	    if (settings.panels.queue.hidden){
	 	$('#ttx-panels-queue').addClass('hidden');
	    }
	    if (settings.panels.queue.type === 'float'){
	    	$('#ttx-panels-queue').addClass('float');	
	    }
	    if ($('#ttx-panels').length === 0){
		var panels = $('<div id="ttx-panels" style="position:absolute;left:0px;right:0px;top:65px;bottom:35px;overflow:hidden;"/>');
		rightPanel.before(panels);
		panels = $('#ttx-panels');
		var floating_panels = $('.roomView');
		$('.ttx-panel').each(function(){
				$(this).mousedown(function(){
					$(this).parent().parent().find('.ttx-panel').removeClass('ttx-panel-focus');
					if ($(this).attr('id') !== 'ttx-panels-scene')
						$(this).addClass('ttx-panel-focus');
				});
			
				if($(this).hasClass('float')){ // add to floating panels
					$(this).resizable(floatingPanelResizable).draggable(floatingPanelDraggable);
					$(this).appendTo(floating_panels);
				}
				else{
					$(this).resizable(dockedPanelResizable);	
				}
		});
		for (var i=0;i<_panels.dock.length;i++){
			var target, name = _panels.dock[i];
			if (name === 'chat'){
				target = $('#right-panel');
			}
			else{
				target = $('#ttx-panels-'+name);
			}
			target.appendTo(panels);
		}
		$('#ttx-panels').sortable({ update:onPanelStop, sort:onPanelMove, appendTo:document.body,revert:100,placeholder:'placeholder',tolerance:'intersect',scroll:false,handle:'.floating-panel-tab',start:function(event,ui){ var width = ui.helper.width(); $(this).find('.placeholder').width(width); },stop:onPanelReorder});
	    }
	}
	function addAdvancedSettings(){
	    var advancedSettings = $('#ttx-advanced');
	    if (advancedSettings.length === 0){
	    	$('#settings-dropdown li:contains("Logout")').before('<li class="option" id="ttx-advanced">Advanced</li>')
	    	$('#ttx-advanced').click(function(){
	    		_modalHijack.type = 'settings';
	    		$('#settings-dropdown li:contains("Edit my profile")').click();
	    	});
	    }
	    $('#layout-option').remove();
	}
	// add a laptop settings item
	function addLaptopSettings(){
		
		/*
            if ($('#ttx_laptopMenu').length === 0){
		updateLaptops();
            	$('#ttx_laptopMenu').bind('mouseover',function(){
	    		$(this).children().addClass('hover');
	    	});
	    	$('#ttx_laptopMenu').bind('mouseout',function(){
	    		$(this).children().removeClass('hover');	
	    	});
            	$(document).on('mouseover','#ttx_laptopMenu .ttxMenuItem',function(){
            		$(this).children().addClass('hover');
            	});
            	$(document).on('mouseout','#ttx_laptopMenu .ttxMenuItem',function(){
            		$(this).children().removeClass('hover');
            	});
            	$(document).on('click','#ttx_laptopMenu .ttxMenuItem .ttxMenuEdit',function(e){
            		e.preventDefault();
            		e.stopPropagation();
            		_modalHijack.type = 'laptop';
            		_modalHijack.action = 'edit';
            		_modalHijack.index = $(this).parent().find('.ttxMenuName').text();
            		_turntable.sticker.showEditor();
            	});
            	$(document).on('click','#ttx_laptopMenu .ttxMenuItem',function(){
            		if ($(this).hasClass('add')){ // popup laptop dialog
            			_modalHijack.type = 'laptop';
            			_modalHijack.action = 'new';
            			_turntable.sticker.showEditor();
            			return;
            		}
            		if ($(this).hasClass('first')){
            			return; // don't do anything
            		}
            		$(this).parent().children().removeClass('selected');
            		$(this).addClass('selected');
            	});
            }
            else{
            	updateLaptops();
            }*/
	}
	// add a message to the chat	
	function addChatMessage(image,speaker,afterSpeaker,content){
		afterSpeaker = afterSpeaker || '';
		content = content || '';
		var chatContainer = $('.messages');
		$('<div class="message"><div class="avatar" style="background-image: url('+image+');"></div><div class="speaker" style="display:inline-block">'+speaker+'</div><div class="afterSpeaker" style="display:inline-block; margin-left:5px">'+afterSpeaker+'</div><div class="textContainer">' + content + '</div></div>').appendTo(chatContainer);
	}

	// perform graphical manipulation
        function initializeUI(){

	   addWidescreen(); // make it widescreen
	   addPanels(); // create the room/info panels
	   addAdvancedSettings(); // create the advanced settings menu entry
	   addLaptopSettings(); // create the laptop settings button
	   $(window).resize(); // trigger resize
        }

// UTILITY
	var autoVoteTimer = null;
	function autoVote(evt) {
			if (settings.autoAwesome === false){
				if (autoVoteTimer){
					clearTimeout(autoVoteTimer);
					autoVoteTimer = null;
				}
				return;
			}
			if (autoVoteTimer) {
				clearTimeout(autoVoteTimer);
				autoVoteTimer = null;
			}
			
			// cast vote at a random delay
			autoVoteTimer = setTimeout(function() {

				// retrieve room and song data
				var song_id = evt.room.metadata.current_song._id;

				// need some safety measures
				var f = $.sha1(_room.roomId + 'up' + song_id);
				var d = $.sha1(Math.random() + "");
				var e = $.sha1(Math.random() + "");
				

				// trigger upvote
				send({
					api: 'room.vote',
					roomid: _room.roomId,
					val: 'up',
					vh: f,
					th: d,
					ph: e
				});

			}, randomDelay(5, 10));
	}

	function randomDelay(min, max) {
			min = min || 2;
			max = max || 70;
			return (Math.random() * max + min) * 1000;
	}
	function userCount(){
		return Object.keys(_users).length;
	}
	function isSceneReady(){
		var scene = $('#scene');
		if (scene.css('right').charAt(0) === '-' || scene.css('margin-left').charAt(0) === '-'){
			return true;
		}
		else{
			return false;
		}
	}
	function changeClass(classname,properties){
		var ss = document.styleSheets;
        	for (var i=0; i<ss.length; i++) {
            		var rules = ss[i].cssRules || ss[i].rules;
            		for (var j=0; j<rules.length; j++) {
				if (!(rules[j].selectorText))
					continue;
                		if (rules[j].selectorText.indexOf(classname) > -1) {
                    			for (prop in properties){
						rules[j].style[prop] = properties[prop];
					}
					return;
                		}
            		}
        	}
	}
	function formatTimeDelta(date) {
			var curdate = new Date().getTime();
			curdate = Math.round(curdate / 1000);
			if (!date.length) date = date.toString();
			if (date.length == 10) date = parseInt(date);
			else if (date.length == 13) date = parseInt(parseInt(date) / 1000);
			else date = Math.round(Date.parse(date) / 1000);
			var diff = Math.abs(date - curdate);
			// get minutes
			if ((diff / 60) >= 1) {
				var min = Math.floor(diff / 60);
				var sec = diff - (min * 60);
			} else {
				var min = '00';
				var sec = diff;
			}

			min = min.toString();
			sec = sec.toString();
			if (min.length < 2) {
				min = '0' + min;
			}
			if (sec.length < 2) {
				sec = '0' + sec;
			}
			return min + ':' + sec;
	}
	
        function log(message){
            if (window.console){
                window.console.log(message);
            }
        }
        function reset(){

        }
	// api send
	function send(data,callback){
		TTX.prototype.send(data,callback);
	}

// END UTILITY

// LAPTOP
        function updateLaptops(){
        	var laptops = settings.laptop.stickers.animations;
            	var selected = settings.laptop.stickers.selected;
            	var laptopDivs = '';
            	for (var i in laptops){
            		laptopDivs += '<div class="ttxMenuItem' + (i === selected ? ' selected' : '') + '"><span class="ttxMenuName">' + i + '</span><div class="ttxMenuEdit">edit</div></div>';
            	}
            	var content = '<div class="ttxMenuItem first"><div class="ttxMenuImage"/><div class="ttxMenuText">Animated Laptop</div><div class="ttxMenuArrow"></div></div>'+laptopDivs+'<div class="ttxMenuItem add" style="text-align:center;">New Laptop</div>';
            	if ( $('#ttx_laptopMenu').length === 0){
            		$('#menuh').after('<div id="ttx_laptopMenu" style="left:170px">'+content+'</div>');
            	}
            	else{
            		$('#ttx_laptopMenu').html(content);
            	}
        }
	
	var newLaptopAnimation = {};
	
	function previewStickers(){
		if (newLaptopAnimation.selected === newLaptopAnimation.frames.length){ // stop
			return;
		}
		setTimeout(function(){ $('#ttxLaptopScrollRight').click(); previewStickers(); },newLaptopAnimation.speed);
		
	}
	function saveStickers(laptop,animation,selected){
		animation.frames[selected] = [];
		var count = 0;
		laptop.children().each(function(){ // loop over each sticker and save to the array
			if (count === 20){ // only save the first 20 stickers
				return;
			}
			var stickerDiv = $(this);
			var sticker_id = $(this).data('sticker_id');
			var angle = $(this).data('angle');
			var left = parseInt($(this).css('left').replace(/px/,''));
			var top = parseInt($(this).css('top').replace(/px/,''));
			animation.frames[selected].push({sticker_id:sticker_id,angle:angle,left:left,top:top});
			count += 1;
		});
	}
	
	function renderStickers(laptop,animation,selected){
		laptop.children().each(function(){ 
			if (typeof $(this).attr('id') !== 'undefined'){ // has id => generated by TTX, remove the normal way
				$(this).remove();
			}
			else{ // needs to removed with the bounding box
				$(this).mouseover(); $('#boundingBoxX').mouseup();	
			}
			
		}); // remove all current stickers
		
		for (var i=0; i<animation.frames[selected].length; i++){
			// create a div of the sticker
			var sticker = animation.frames[selected][i];
			var stickerID = sticker.sticker_id;
			var stickerData = STICKER_MAP[stickerID];
			var stickerDiv = '<div id="ttxSticker'+i+'" class="sticker" style="background-image:url('+stickerData.url+'); height: '+stickerData.height+'px; width: '+stickerData.width+'px; top: '+sticker.top+'px; left: '+sticker.left+'px; -webkit-transform: rotate('+sticker.angle+'deg); background-position: initial initial; background-repeat: initial initial;"></div>';
			// add the sticker to the laptop view
			laptop.append(stickerDiv);
			// add jquery data for bounding box
			$('#ttxSticker'+i).data('angle',sticker.angle);
			$('#ttxSticker'+i).data('sticker_id',stickerID);
		}
	}

// END LAPTOP
    }
    TTX.prototype.send = function(data,callback){
    		var msg,
		    defer = $.Deferred();

		if (data.api == "room.now") {
			defer.resolved();
			callback();
			return defer.promise();
		}
		data.msgid = turntable.messageId;
		turntable.messageId += 1;
		data.clientid = turntable.clientId;
		if (turntable.user.id && !data.userid) {
			data.userid = turntable.user.id;
			data.userauth = turntable.user.auth;
		}
		msg = JSON.stringify(data);
		turntable.whenSocketConnected(function () {
			turntable.socket.send(msg);
			turntable.socketKeepAlive(true);
			turntable.pendingCalls.push({
				msgid: data.msgid,
				handler: callback,
				deferred: defer,
				time: util.now()
			});
		});
		return defer.promise();
    };

})();

turntableX = new TTX();
