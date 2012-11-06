window.TTX = null;
(function(){
    window.TTX = function(){
        var _premium = null; // ID to check against for premium access
        var _turntable = turntable; // handle to the turntable object
        var _id = null; // user ID
        
        var _room = null; // handle to the room object
        var _location = null; // current URL location
        var _manager = null; // handle to the room manager
        var _mods = null; // list of moderators in the current room
        var self = this;

        updateRoomInfo(function(){ 
            initializeListeners();
            initializeUI();
        } ); // get room and room manager

        
        function updateRoomInfo(callback){
            _room = null;
            _location = window.location.pathname;    
            for (var o in _turntable){
                if (_turntable[o] !== null && _turntable[o].creatorId){
                    _room = _turntable[o];
                    log('Entering room ' + _location + ':');
                    log(_room);
                    _mods = _room.moderators || [];
                    log(_mods);
                    break;
                }
            }
            if (_room){
                for (var o in _room){
                    if(_room[o] !== null && _room[o].myuserid){
                        _manager = _room[o];
                        log('Found room manager:');
                        log(_manager):
                    }
                }
                callback(); // success
            }
            else{
                // try again
                setTimeout(function(){ updateRoomInfo(callback); },250);
            }
        }
        function initializeListeners(){
            // TODO
        }
        function initializeUI(){
            // TODO
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
