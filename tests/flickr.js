var config = require('../config')
var Flickr = require('../api/flickr').Flickr;

var fk_access_token = '72157660869281453-33a860f63e3ef1b0'
var user_id = '139026886@N05'
var fk = new Flickr(config.api.flickr.clientId, config.api.flickr.clientSecret, {"oauth_token": fk_access_token});

var flickr_params = {
    api_key: config.api.flickr.clientId,
    user_id: user_id,
    per_page: 25,
    page: 1,
};

fk.executeAPIRequest("flickr.people.getPhotos", flickr_params, true, function(err, result) {
        // Show the error if we got one
        if(err) {
            console.log("FLICKR ERROR: " + err);

            return;
        }

        // Do something with flicker photos
        console.log(result)
})