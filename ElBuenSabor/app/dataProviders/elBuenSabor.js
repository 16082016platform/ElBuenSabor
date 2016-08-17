var provider,
    TelerikBackendServices = require('../everlive/everlive.all.min');

provider = new TelerikBackendServices({

    appId: 'gmwy25bqw8qvep10',
    scheme: 'https'
});

// START_CUSTOM_CODE_elBuenSabor
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_elBuenSabor
module.exports = provider;