'use strict';

var exec = require('cordova/exec');
var DefaultSms = {}; 
// exports.coolMethod = function (arg0, success, error) {
//     exec(success, error, 'DefaultSms', 'coolMethod', [arg0]);
// };

function convertPhoneToArray(phone) {
    if (typeof phone === 'string' && phone.indexOf(',') !== -1) {
        phone = phone.split(',');
    }
    if (Object.prototype.toString.call(phone) !== '[object Array]') {
        phone = [phone];
    }
    return phone;
}

DefaultSms.checkDefault= function(success, failure ){
    exec(success, failure, "DefaultSms", 'checkdefault', []);
}
DefaultSms.send = function(phone, message, options, success, failure) {
    // parsing phone numbers
    phone = convertPhoneToArray(phone);

    // parsing options
    var replaceLineBreaks = false;
    var androidIntent = '';
    if (typeof options === 'string') { // ensuring backward compatibility
        window.console.warn('[DEPRECATED] Passing a string as a third argument is deprecated. Please refer to the documentation to pass the right parameter: https://github.com/cordova-sms/cordova-sms-plugin.');
        androidIntent = options;
    }
    else if (typeof options === 'object') {
        replaceLineBreaks = options.replaceLineBreaks || false;
        if (options.android && typeof options.android === 'object') {
            androidIntent = options.android.intent;
        }
    }

    // fire
    exec(
        success,
        failure,
        'DefaultSms',
        'send', [phone, message, androidIntent, replaceLineBreaks]
    );
};

DefaultSms.hasPermission = function(success, failure) {
    // fire
    exec(
        success,
        failure,
        'DefaultSms',
        'has_permission', []
    );
};

DefaultSms.requestPermission = function(success, failure) {
    // fire
    exec(
        success,
        failure,
        'DefaultSms',
        'request_permission', []
    );
};
module.exports = DefaultSms;