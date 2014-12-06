require.config({
    paths: {
        'soundcloud': '//connect.soundcloud.com/sdk.js'
    }
});

// Could load an app.js module to handle the app but that's a bit too much
require(["appManager"], function(app) {
    app.init();
});