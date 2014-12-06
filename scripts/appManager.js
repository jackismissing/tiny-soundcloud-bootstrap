define(["scManager"], function(SM) {

    var audioEl;
    var searchInput;
    var searchBtn;
    var searchResults;
    var searchResultsList;
    var errorEl;
        
    var init_ = function() {
        audioEl         = document.getElementById('audio-player');
        searchInput     = document.getElementById('search-input');
        searchBtn       = document.getElementById('search-btn');
        searchResults   = document.getElementsByClassName('result');
        errorEl         = document.getElementById('error-message');

        SM.init();
        addListeners_();

        //SM.getStream('47580057', setAudioFromStream_);
    };

    var addListeners_ = function() {
        searchBtn.addEventListener('click', searchTrack_);
        
        for(var i = 0; i < searchResults.length; i++) {
            (function(i) {
                var resultEl = searchResults[i];
                resultEl.addEventListener('click', function() {
                    SM.getStream(resultEl.getAttribute('data-id'), setAudioFromStream_);
                });
            })(i);
        }
    };

    var searchTrack_ = function() {
        var value = searchInput.value;
        if(value != undefined && value !== "") {
            SM.searchTrack(value, showResults_);
        }
        else {
            showErrorMsg("invalid");
        }
    };

    var showResults_ = function(results) {
        if(results.length != 0) {
            for(var i = 0; i < searchResults.length; i++) {
                if(results[i]) {
                    searchResults[i].setAttribute('data-id', results[i].id);
                    searchResults[i].innerHTML = results[i].title;
                }
            }
        }
        else {
            showErrorMsg("empty");
        }
        
    };

    var showErrorMsg = function(error) {
        switch(error) {
            case "invalid":
                errorEl.innerHTML = "Please enter a valid name";
                break;
            case "empty":
                errorEl.innerHTML = "Sorry couldn't find any results";
                break;
            default:
                break;
        }
    };

    //ASYNC: no return possible
    var setAudioFromStream_ = function(streamURL) {
        audioEl.src = streamURL;
        playSound_(audioEl);
    };

    var playSound_ = function(sound) {
        sound.play();
    };

    return {
        init: init_
    };
});