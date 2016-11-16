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

    // Create the parallax background effect by scaling the background image
	page.getViewById("pedidosParallax").animate({
		scale: { x: 1.2, y: 1.2 },
		duration: 8000
	});


    var item = page.getViewById("aaa");

    readFile(item);

    if (isInit) {
        isInit = false;

        // additional pageInit
        
    }
}

// START_CUSTOM_CODE_pedidos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_pedidos
exports.pageLoaded = pageLoaded;

function readFile(page) {

    var fs = require("file-system");
    var documents = fs.knownFolders.documents();

    var fileName = "platosSeleccionados.json";
    var myFile = documents.getFile(fileName);

    myFile.readText()
        .then(function (data) {
            // Successfully read the file's content.
            alert(page);
        }, function (error) {
            // Failed to read from the file.
            alert(error);
        });
}

function confirmarPedido(args) {
    var fileSystemModule = require("file-system");//
    var fileName = "persistedFile.json";//

    // var file = fileSystemModule.knownFoldesaddasdadsadadsadsadsad/ddssdsdcsdjkkkkrs.documents().getFile(fileName);
    var data = [{"id": "1", "value": "NativeScript"}]; 

    alert(data);
}