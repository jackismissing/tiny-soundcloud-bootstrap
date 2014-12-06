define(function() {
	
	var CLIENT_ID = "CLIENT ID HERE";
	
	var init_ = function() {
		SC.initialize({
    		client_id: CLIENT_ID
  		});
	};

	var searchTrack_ = function(value, callback) {
		SC.get('/tracks', { q: value, limit: 10 }, function(tracks) {
  			callback(tracks);
		});
	};

	var getStream_ = function(trackID, callback) {
		SC.stream("/tracks/" + trackID, function(stream){
			callback(stream.url);
		});
	};

	return {
		init: init_,
		getStream: getStream_,
		searchTrack: searchTrack_
	};
});