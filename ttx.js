window.TTX = null;
(function(){
    window.TTX = function(){
        // global state
	var self = this;
	var _premiumIDs = null; // IDs to check against for premium access
        var _premium = false; // enable premium access
        var _turntable = turntable; // handle to the turntable object
        var _id = null; // user ID
        
	// room state
        var _room = null; // handle to the room object
        var _location = null; // current URL location
        var _manager = null; // handle to the room manager
        var _mods = null; // list of moderators in the current room
        

        updateRoomInfo(function(){
            checkPremium();
            initializeListeners();
            initializeUI();
        }); // get room and room manager

        function checkPremium(){
            if (_premiumIDs === null || $.inArray(_id,_premiumIDs)){
                _premium = true;
                log('Premium features enabled');
            }
        }
        
        function updateRoomInfo(callback){
            _room = null;
            _id = null;
            _location = window.location.pathname;  
            
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
            if (_room){ // found turntable data
                for (var o in _room){
                    if(_room[o] !== null && _room[o].myuserid){
                        _manager = _room[o];
                        _id = _manager.myuserid;
                        break;
                    }
                }
                if (_id){
                    log('Room loaded');
                    callback(); // success
                }
                else{
                    // try again
                    setTimeout(function(){ updateRoomInfo(callback); }, 250);
                }
            }
            else{
                // try again
                setTimeout(function(){ updateRoomInfo(callback); },250);
            }
        }
        function initializeListeners(){
            _turntable.addEventListener('message',onMessage);
            log('Event listener added');
	    $(document).bind('DOMNodeInserted',function(event){onDOM(event);});
	    log('DOM monitor added');
        }
        function initializeUI(){
            // TODO
        }
	function onDOM(e){
		var $element = $(e.target);
		log(e.target);
		if ($element.hasClass('modal')){
			$(element + ' .title').html('Hax');
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
    }

})();

window.turntableX = new TTX();
