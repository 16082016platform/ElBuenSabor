'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;

var helper = require('../../utils/widgets/helper');
// additional requires

ViewModel = new Observable({

    pageTitle: 'Nosotros',

    contactUrl: 'mailto:vemalavers@unc.edu.pe',

    facebookUrl: 'https://www.facebook.com/Telerik',

    twitterUrl: 'https://twitter.com/telerik',

    onContactTap: function() {
        helper.onOpenUrl(this.contactUrl);
    },

    onFacebookTap: function() {
        helper.onOpenUrl(this.facebookUrl);
    },

    onTwitterTap: function() {
        helper.onOpenUrl(this.twitterUrl);
    }

    // additional properties

});

// START_CUSTOM_CODE_nosotros
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_nosotros
module.exports = ViewModel;