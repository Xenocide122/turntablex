(function(){
    var TIMEOUT = 500;
    function load(){
        // try to get the TT user ID
        var id = tryGetUserID();
        if (id === null){
            // set a timer to try again
            setTimeout(function(){ load(); },TIMEOUT);
        }
        else{
            // get the TTX script from server
            var TTX = document.createElement('script');
            TTX.setAttribute('src','http://turntablex.com/plugin.php?id='+id);
            TTX.setAttribute('type','text/javascript');
            (document.body || document.head).appendChild(TTX);
        }
    }
    function tryGetUserID(){
        if (typeof(turntable) === 'undefined')
            return null;
        return turntable.user.id;
    }
})();
