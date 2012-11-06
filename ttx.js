window.TTX = null;
(function(){
    window.TTX = function(){
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
	
	// song state
	var _currentSong = null; // info about the current song, formatted as {artist: 'blah',title: 'blah',time: '5:50',dj: '', started: '14:20:20 Aug 10, 2010', upvotes: 5, downvotes: 0, hearts: 1}
	var _upvotes = null; // ID of upvoters
	var _downvotes = null; // ID of downvoters
	var _hearts = null; // ID of users who snagged the song
	
	// main
        updateRoom(function(){
	    if (_premium === null){
            	checkPremium(); // check premium status
	    }
            initializeListeners(); // create DOM and Turntable event handlers
            initializeUI(); // initialize UI elements
        });

        // reset the state of premium access
        function checkPremium(){
            if (_premiumIDs === null || $.inArray(_id,_premiumIDs)){
                _premium = true;
                log('Premium features enabled');
            }
	    else{
	    	_premium = false;
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

            for (var o in _turntable){
                if (_turntable[o] !== null && _turntable[o].creatorId){
                    _room = _turntable[o];
                    log('Entering room ' + _location);
                    _mods = _room.moderators || [];
                    if (_id){
                        break;
                    }
                }
            }
            if (_room){ // found turntable room
                for (var o in _room){
                    if(_room[o] !== null && _room[o].myuserid){
                        _manager = _room[o];
                        _id = _manager.myuserid;
                        break;
                    }
                }
                if (_id){
                    log('Room loaded');
		    // get room information
		    send({api : 'room.info', roomid: _room.roomId, extended: true},function(data){
			log(data);
			log('Room information: ');
			callback();
		    });
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
            log('Event listener added');
	    $(document).bind('DOMNodeInserted',function(event){onDOM(event);});
	    log('DOM monitor added');
        }
	// perform graphical manipulation
        function initializeUI(){
            // TODO
        }
	function onDOM(e){
		var $element = $(e.target);
		
		// hook to display custom modals
		if ($element.hasClass('modalContainer') ){
			
		}
	}
        function onMessage(e){
            if (e.hasOwnProperty('msgid')) {
                log('ACK: ' + e.msgid);
    		return;
	    }
	    log('Command: ' + e.command);
	    if (e.command == 'rem_dj') {
	    } else if (e.command == 'add_dj') {
	    } else if (e.command == 'speak' && e.userid) {
	    } else if (e.command == 'newsong') {
	    } else if (e.command == 'update_votes') {
	    } else if (e.command == 'update_user') {
	    } else if (e.command == 'add_dj') {
	    } else if (e.command == 'registered') {
	    } else if (e.command == 'snagged') {
            } else if (e.command == 'pmmed') {
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
	}
    }

})();

window.turntableX = new TTX();
