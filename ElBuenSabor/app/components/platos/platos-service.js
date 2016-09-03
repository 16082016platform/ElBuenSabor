'use strict';
var _,

    _consts,
    dataService = require('../../dataProviders/elBuenSabor'),
    // additional requires

    consts;

function Service() {}

function onRequestSuccess(data) {
    return data.result;
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

Service.prototype.getAllRecords = function(filter) {
    
    var filter = new Everlive.Query();
    filter
        .where()
            .and()
                .eq('precio', '10')
                //.eq('Location', 'Second Sample Text')
        .done();
     
    // Specify to return only subset of fields, not all fields
    filter.select('precio');
    
    
    var expandExp,
        data = dataService.data('platos');

    expandExp = {

        foto: {
            'SingleField': 'Uri'
        },

    };

    return data.expand(expandExp).get(filter)
        .then(onRequestSuccess.bind(this))
        .catch(onRequestFail.bind(this));
};

Service.prototype.configuration = dataService.setup;

// additional properties

// START_CUSTOM_CODE_platos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_platos
module.exports = new Service();