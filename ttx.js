window.TTX = null;
(function(){
    TTX = function(){
	// global resources
	var IDLE_MAX = 15*60*1000;
	var SYMBOLS = {
		heart: '<img width="13" src="http://turntablex.com/images/heart.png">',
		up: '<img width="13" src="http://turntablex.com/images/up.png">',
		down: '<img width="13" src="http://turntablex.com/images/down.png">',
		computer: '<img width="15" src="http://turntablex.com/images/computer.png">'
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
	var settings = {};
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
	
	// main
	loadSettings();
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
        // get settings from local storage and merge with defaults
	function loadSettings(){
		settings = defaultSettings;
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
	// update header (UI)
	function updateHeader(){
		var header = $('.room .name');
		var song_bar = header.find('#ttx_songbar');
		var text = '(' + _currentSong.upvotes + SYMBOLS.up + ','+ _currentSong.downvotes + SYMBOLS.down + ',' + _currentSong.hearts + SYMBOLS.heart + ') ' + _currentSong.title+' by <b>'+_currentSong.artist+'</b>';
		if (song_bar.length){
			song_bar.html(text);
		}
		else{
			header.text(header.text()+': ');
			$('<span id="ttx_songbar" style="font-size:14px; font-weight:normal">' + text + '</span>').appendTo(header);
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
		for (var i=0;i<_room.djIds.length;i++){
			_djs[_room.djIds[i]] = 1;
		}
	}
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
	function userCount(){
		return Object.keys(_users).length;
	}
	// add new user
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
		console.log(Object.keys(_users).length);;
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
		for (var i=0;i<_room.moderators.length;i++){
			_mods[_room.moderators[i]] = 1;
		}
	}
	function newSong(data){
		var votelog = data.room.metadata.votelog;
		var currentSong = data.room.metadata.current_song;
		var downvotes = data.room.metadata.downvotes;
		var upvotes = data.room.metadata.upvotes;
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
	// reset the state of the room
        function resetRoom(callback){
            _room = null;
	    _manager = null;
            _id = null;
            _location = window.location.pathname; 
            for (var o in _turntable){
                if (_turntable[o] !== null && _turntable[o].creatorId){
                    _room = _turntable[o];
                    log('Entering room: ' + _location);
		    log(_room);
 		    _id = _room.selfId;
		    log('Room id: ' + _room.roomId);
		    log('User id: ' + _id);
		    break;
                }
            }
            if (_room){ // found turntable room
                for (var o in _room){
                    if(_room[o] !== null && _room[o].myuserid){
                        _manager = _room[o];
			break;
                    }
                }
                if (_manager){
		    
		    TTX.prototype.send({api:'room.info',roomid:_room.roomId, extended:false},function(data){ // get room info and use it for current song information
			if (data.success === false){ // couldn't get info, just do a reset
				log('Failed to query room info');
				resetSong();
				callback();
			}
			else{
				newSong(data);
				callback();
			}
		    });
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
	// initialize event handlers
        function initializeListeners(){
            _turntable.addEventListener('message',onMessage);
            log('Event monitor added');
	    $(document).bind('DOMNodeInserted',onDOM);
	    log('DOM monitor added');
	    $(window).bind('resize',onResize);
	    log('Window resize monitor added');
        }
	// perform graphical manipulation
        function initializeUI(){
	    // make it fullscreen
	    $('#outer').width('100%');
	    // reposition the stage, playlist, chat, and guestlist
	    var main_container = $('#outer .roomView');
	    var right_panel = $('#right-panel');
	    var stage = $('#floor-div').parent();
	    var stage_height = stage.height();
	    var stage_width = stage.width();
            var guest_list = right_panel.find('.guest-list-container');
	    var play_list = $('#playlist');
	    var chat = right_panel.find('.chat-container');
	    var room_info = $('#room-info-tab');

	    right_panel.find('.chatHeader').unbind('mousedown').css('cursor', 'default');

	    stage.css({left:235,top:105});

	    guest_list.css({marginLeft:0,left:stage_width+240,width:220,top:105,height:stage_height}).appendTo(main_container);
	    guest_list.find('.guests').css({height:stage_height-60});
	    guest_list.find('.guestListButton').hide();
	    guest_list.find('.guestListSize').css({left:0,width:'100%'});
	    guest_list.find('.chatBar').css({width:'100%'});
	    guest_list.find('.chatResizeIcon').hide();

	    play_list.css({marginLeft:0,left:0,width:230,top:105,height:stage_height}).appendTo(main_container);

	    chat.css({marginLeft:0,position:'absolute',width:'auto',left:stage_width+465,top:105,height:stage_height,right:5}).appendTo(main_container);
	    chat.find('div.messages').css({height: stage_height-63});
	    chat.find('form.input-box').css({width:'100%',left:0,backgroundImage:'none'});
	    chat.find('form.input-box input').css({left:'5px',right:'5px',paddingRight:'0px',width:'auto',backgroundColor:"#fff",border:"1px solid #999"});
	    chat.find('div.guestListButton').hide();
	    chat.find('div.chatBar').css({width:'100%'});
	    chat.find('.guestListIcon').hide();
	    chat.find('.chatResizeIcon').hide();

	    $('.room .name').css({position:'absolute',left:35,right:0,width:'auto'});
	    $('.room').css({position:'absolute',right:425});

	    room_info.find('.content').css({left:0,top:-1*(10+stage_height),height:(10+stage_height)});
	    room_info.find('.songlog').css({height:500});
	    room_info.find('.button').css({left:125}).unbind('click').bind('click',function(){ 
 	    	var direction = 1;
		if ($(this).hasClass('upbutton')){
			direction = -1;
			$(this).removeClass('upbutton');
		}
		else{
			$(this).addClass('upbutton');
		}
		$(this).parent().find('.content, .button').animate({top:'+=' + (stage_height+10)*direction},350);
	    });

	    changeClass('.ui-slider .ui-slider-handle',{width:'.8em',height:'.8em'});
            changeClass('.chat-container .messages .message',{width:'100%'});
	    changeClass('.guest-list-container .guests .guest',{width:205,'padding-right':'0px','padding-top':'1px','padding-bottom':'1px'});
	    changeClass('#menuh',{left:'40px'});
	    if ($('#ttx_logo').length === 0){
	    	$('.header .logo').after('<div id="ttx_logo" style="left:178px; top: 12.5px; width: 38px; height: 36px; position:absolute; background-size: 38px 36px; background-image:url(http://turntablex.com/images/turntableX.png);"/>');
            }
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
            		e.stopPropogation();
            		_modalHijack.type = 'laptop';
            		_modalHijack.action = 'edit';
            		_modalHijack.index = $(this).parent().find('.ttxMenuName').text();
            		_turnable.sticker.showEditor();
            	});
            	$(document).on('click','#ttx_laptopMenu .ttxMenuItem',function(){
            		if ($(this).hasClass('add')){ // popup laptop dialog
            			_modalHijack.type = 'laptop';
            			_modalHijack.action = 'new';
            			_turnable.sticker.showEditor();
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
            }
        }
        function updateLaptops(){
        	var laptops = settings.laptop.stickers.animations;
            	var selected = settings.laptop.stickers.selected;
            	var laptopDivs = '';
            	for (var i in laptops){
            		laptopDivs += '<div class="ttxMenuItem' + (i === selected ? ' selected' : '') + '"><span class="ttxMenuName">' + i + '</div><div class="ttxMenuEdit">edit</div></div>';
            	}
            	var content = '<div class="ttxMenuItem first"><div class="ttxMenuImage"/><div class="ttxMenuText">Animated Laptop</div><div class="ttxMenuArrow"></div></div>'+laptopDivs+'<div class="ttxMenuItem add" style="text-align:center;">New Laptop</div>';
            	if ( $('#ttx_laptopMenu').length === 0){
            		$('#menuh').after('<div id="ttx_laptopMenu" style="left:170px">'+content+'</div>');
            	}
            	else{
            		$('#ttx_laptopMenu').html(content);
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
	var newLaptopAnimation = {};
	function onDOM(e){
		var $element = $(e.target);
		
		// hook to display custom modals
		if ($element.hasClass('modalContainer') ){
			if (_modalHijack.type === 'laptop'){
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
	function onResize(){
		// TODO
		if ($(window).width() < 1200){
			$('#outer').width('1200px');
		}
		else{
			$('#outer').width('100%');
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
			guests.each(function() {
				var $this = $(this);
				var $name = $this.find('.guestName');
				var username = $name.text();
				if (typeof _usernames[username] != 'undefined') {
					var user_id = _usernames[username];
					// update extra classes and idle time
					var extrasClass = '';
					var extrasContent = ' ';
					if ($name.hasClass('mod')){
						extrasClass = extrasClass + ' isMod';
					}
					if ($name.hasClass('superuser')){
						extrasClass = extrasClass + ' isSuper';
					}
					if (isDJ(user_id)){
						extrasClass = extrasClass + ' isDJ';
					}
					if (isCurrentDJ(user_id)){
						extrasClass = extrasClass + ' isCurrentDJ';
					}
					if (isHearter(user_id)){
						extrasClass = extrasClass + ' isHearter';
						extrasContent = extrasContent + SYMBOLS.heart + ' ';
					}
					if (isUpvoter(user_id)){
						extrasClass = extrasClass + ' isUpvoter';
						extrasContent = extrasContent + SYMBOLS.up + ' ';
					}
					if (isDownvoter(user_id)){
						extrasClass = extrasClass + ' isDownvoter';
						extrasContent = extrasContent + SYMBOLS.down + ' ';
					}
					if (now - _idleTimers[user_id] > IDLE_MAX){
						$this.find('.guestAvatar').css('-webkit-filter','grayscale(100%)');
						extrasClass = extrasClass + ' isIdle';
					}
					else{
						$this.find('.guestAvatar').css('-webkit-filter','grayscale(0%)');
					}
					var extras = $this.find('.guestExtras');
					if (extras.length){
						extras.html(extrasContent);
					}
					else{
						$name.after($('<span class="guestExtras" style="font-weight:bold; font-size:14px;">'+extrasContent+'</span>'));
					}
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
			guests.filter('.isMod').prependTo(guest_container); 
			guests.filter('.isSuper').prependTo(guest_container);
		        guests.filter('.isDJ').prependTo(guest_container); 
			
		
			}, 50);
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

		var action = vote === 'up' ? 'awesomed' : 'lamed';
		addChat(name,' ' + action + ' this song ' + SYMBOLS[vote]);
		
	
	}
	
	function addChat(name,content,className){
		className = className || '';
		var chatContainer = $('.messages');
		$('<div class="message ' + className + '"><span class="speaker">' + name + '</span><span class="text">' + content + '</span></div>').appendTo(chatContainer);
	}
	function onHeart(e){
		var now = new Date().getTime();
		if (typeof _hearts[e.userid] === 'undefined'){ // new heart
			_hearts[e.userid] = 1;
			_currentSong.hearts = _currentSong.hearts + 1;
		}
		_idleTimers[e.userid] = now;
		var name = _users[e.userid];
		addChat(name,' saved this song ' + SYMBOLS.heart);
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
        
        function log(message){
            if (window.console){
                window.console.log(message);
            }
        }
        function reset(){
            // TODO
        }
	// api send
	function send(data,callback){
		TTX.prototype.send(data,callback);
	}
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
