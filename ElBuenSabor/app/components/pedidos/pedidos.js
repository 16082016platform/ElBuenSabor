'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    // additional requires
    viewModel = require('./pedidos-view-model');

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;
    // additional pageLoaded

    if (isInit) {
        isInit = false;

        // additional pageInit
    }
}

// START_CUSTOM_CODE_pedidos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_pedidos
exports.pageLoaded = pageLoaded;

function confirmarPedido(args) {
    var fileSystemModule = require("file-system");//
    var fileName = "persistedFile.json";//

    // var file = fileSystemModule.knownFoldesaddasdadsadadsadsadsad/ddssdsdcsdjkkkkrs.documents().getFile(fileName);
    var data = [{"id": "1", "value": "NativeScript"}]; 

    // write data to the file, converted to a JSON string first
    file.writeText(JSON.stringify(data));

    // read data from the file
    file.readText().then(function(content) {
        // content contains the data read from the file
        alert(content);
    });
}
exports.confirmarPedido = confirmarPedido;