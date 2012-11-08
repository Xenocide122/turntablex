window.TTX = null;
(function(){
    TTX = function(){


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

	// song state
	var _currentSong = null; // info about the current song, formatted as {artist: 'blah',title: 'blah',time: '5:50',dj: '', started: '14:20:20 Aug 10, 2010', upvotes: 5, downvotes: 0, hearts: 1}
	var _upvoters = null; // ID of upvoters
	var _downvoters = null; // ID of downvoters
	var _hearts = null; // ID of users who <3 the song
	var _djs = null; // user ids of djs
	// main
        updateRoom(function(){
            checkPremium(); // check premium status
            initializeListeners(); // create DOM and Turntable event handlers
            initializeUI(); // initialize UI elements
        });

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
	function updateHeader(){
		var header = $('.room .name');
		var song_bar = header.find('#ttx_songbar');
		var text = 'Now playing: '+_currentSong.title+' by <b>'+_currentSong.artist+'</b> (' + _currentSong.upvotes + '<span style="color:#0f5">&#9650;</span>,' + _currentSong.downvotes + '&#9660,'+_currentSong.hearts+'<span style="color:#f33">&#10084;</span>';
		if (song_bar.length){
			song_bar.html(text);
		}
		else{
			header.text(header.text()+': ');
			$('<span id="ttx_songbar" style="font-size:12px; font-weight:normal">' + text + '</span>').appendTo(header);
		}
	}
	// reset the state of the room
        function updateRoom(callback){
            _room = null;
            _id = null;
            _location = window.location.pathname;
            _songHistory = []; // reset song history
	    _idleTimers = {}; // reset chat idle timers
	    _mods = []; // reset mod list
	    _usernames = {}; // reset users
	    _currentSong = {};
	    _djs = [];

            for (var o in _turntable){
                if (_turntable[o] !== null && _turntable[o].creatorId){
                    _room = _turntable[o];
                    log('Entering room ' + _location);
		    log(_room);
                    _mods = _room.moderators || [];
		    // get current song info
		    _currentSong.title = _room.currentSong.metadata.song;
		    _currentSong.artist = _room.currentSong.metadata.artist;
		    _currentSong.upvotes = _room.upvoters.length;
		    _currentSong.downvotes = 0; // unknown
		    _currentSong.hearts = 0; // unknown
		    break;
                }
            }
            if (_room){ // found turntable room
                for (var o in _room){
                    if(_room[o] !== null && _room[o].myuserid){
                        _manager = _room[o];
                        _id = _manager.myuserid;
			// get DJs
			for (var i in _manager.djs){
				if (typeof _manager.djs[i] !== 'undefined'){
					_djs.push(_manager.djs[i][0]);
				}
				break;
                        	
			}
			break;
                    }
                }
                if (_id){
                    log('Room loaded');
		    // get current users
		    var users = _room.users;
		    for (var i in users) {
			// map names to ids
			if (typeof _usernames[ users[i].name ] == 'undefined')
				_usernames[ users[i].name ] = i;
			}
		    callback();
                }
                else{
                    // try again
                    setTimeout(function(){ updateRoom(callback); }, 250);
                }
            }
            else{
                // try again
                setTimeout(function(){ updateRoom(callback); },250);
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
	    guest_list.find('.guests').css({height:stage_height-38});
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

	    $('.room .name').css({width:730});

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
            changeClass('.chat-container .messages .message',{width:'100%'});
	    changeClass('.guest-list-container .guests .guest',{width:205,'padding-right':'0px','padding-top':'1px','padding-bottom':'1px'});
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
	function onDOM(e){
		var $element = $(e.target);
		
		// hook to display custom modals
		if ($element.hasClass('modalContainer') ){
			
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
		return $.inArray(id,_mods) >= 0;
	}
	function isDJ(id){
		return $.inArray(id,_djs) >= 0;
	}
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
					// update special highlighters
					var modClass = '';
					if (isMod(user_id)){
						modClass = ' isMod';
					}
					if (isDJ(user_id)){
						modClass = 'isDJ' + modClass;
	
					}
					$this.removeClass('isMod isDJ isIdle').addClass(modClass);
				}
			});
			guests.filter('.isMod').prependTo(guest_container);
		        guests.filter('.isDJ').prependTo(guest_container);
			
		
			}, 50);
	}
        function onMessage(e){
            if (e.hasOwnProperty('msgid')) {
    		return;
	    }
	    log('Command: ' + e.command);
	    updateHeader();
	    if (e.command == 'rem_dj') {
		updateGuests();
	    } else if (e.command == 'add_dj') {
		updateGuests();
	    } else if (e.command == 'speak' && e.userid) {
	    } else if (e.command == 'newsong') {
		updateGuests();
	    } else if (e.command == 'update_votes') {
		updateGuests();
	    } else if (e.command == 'update_user') {
		}
	    else if (e.command == 'registered') {
		if( _location !== window.location.pathname ){
			updateRoom(function(){
				initializeUI();
			});
		}
		updateGuests();
	    } else if (e.command == 'snagged') {
            } else if (e.command == 'pmmed') {
            } else if (e.command == 'deregistered'){
			updateGuests();
		}
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
