'use strict';


const cfenv = require("cfenv");
let appEnv = cfenv.getAppEnv();
let mLabService = appEnv.getService('mongo_cb');
let googleApiKeyService = appEnv.getService("google_api_key");



let mLabServiceCredentials = function () {
    //** local testing **//

    if (mLabService == null) {
        log.error('mLabService not available, reading local hardcoded values');
        let dummyData = require('./notToCommit');
        mLabService = {};
        mLabService.credentials = {};
        mLabService.credentials.uri = {};
        mLabService.credentials.uri = dummyData.mongoUrl;
    } else {
        log.info('mLabService  available, reading  service details');
    }
    return mLabService.credentials.uri;

}
let getGoogleApiKey = function () {
        //** local testing **//

        if (googleApiKeyService == null) {
            log.error('googleApiKeyService not available, reading local hardcoded values');
            let dummyData = require('./notToCommit');
            googleApiKeyService = {};
            googleApiKeyService.credentials = {};
            googleApiKeyService.credentials.key = {};
            googleApiKeyService.credentials.key = dummyData.googleApiKey;
        } else {
            log.info('googleApiKeyService  available, reading  service details');
        }
        return googleApiKeyService.credentials.key;

    }
    //https://maps.googleapis.com/maps/api/place/textsearch/json?
    //https://maps.googleapis.com/maps/api/geocode/json
let settings = {
    gbfsBase: 'https://gbfs.citibikenyc.com/gbfs/',
    gbfsFeed: 'gbfs.json',
    system_regions: 'en/system_regions.json',
    system_information: 'en/system_information.json',
    station_status: 'en/station_status.json',
    station_information: 'en/station_information.json',
    system_alerts: 'en/system_alerts.json',
    mongoUrl: mLabServiceCredentials(),
    googleApiKey: getGoogleApiKey(),
    googleGeoCodeApiUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
    googlePlaceApiTextSearchUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json'
}

module.exports = settings;