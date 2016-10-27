'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./platos-service'),
    // additional requires

    viewModel = require('./platos-view-model');

function onListViewItemTap(args) {
    var itemData = viewModel.get('listItems')[args.index];

    helpers.navigate({
        moduleName: 'components/platos/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function disminuirCantidad(args) {
    alert("index:" + args.index);
}
exports.disminuirCantidad = disminuirCantidad;

function agregarCantidad(args) {
    // var page = args.object;
    // var parent = page.parent;
    // var id= JSON.stringify(page.id).replace(/"/g,"");
    // if (parent) {
    //     var btnAgregar = parent.getViewById(id);
    //     if (btnAgregar) {
    //         btnAgregar.text="1";
    //         var btnDisminuir = parent.getViewById(id.replace(/agregar/g,"disminuir"));
    //         btnDisminuir.visibility="visible";
    //         //btnAgregar.visibility="collapse";
    //         //alert(btnDisminuir.id);
    //     }
    // }

    var page = args.object;
    var parent = page.parent;
    var id= JSON.stringify(page.id).replace(/"/g,"");
     
    args.object.text = "1";
    args.object.isEnabled = false;
     
    var btnAugmentar = parent.getViewById(id.replace(/agregar/g,"disminuir"));
    btnAugmentar.visibility="collapse";
    btnAugmentar.visibility="visible";
    return;
   
   
   var itemData = args.object;
   var item = itemData.bindingContext;
   
    alert(JSON.stringify(item));
    
    // var details = viewModel.get('listItems')[1];
    // alert(JSON.stringify(details));
    
    // var itemData = viewModel.get('listItems')[args.index];
	// alert(itemData.details);
    // alert(JSON.stringify(itemData.details));
    // alert(args.index);
    // alert(JSON.stringify(args));
    // alert(JSON.stringify(args.toString()));
    // alert(itemData.details.toString());
}
exports.agregarCantidad = agregarCantidad;

function aumentarCantidad(args) {
    var page = args.object;
    var parent = page.parent;
    var id= JSON.stringify(page.id).replace(/aumentar/g,"disminuir").replace(/"/g,"");
    if (parent) {
        var btnDisminuir = parent.getViewById(id);
        if (btnDisminuir) {
            btnDisminuir.text="1";
            alert(btnDisminuir.id);
        }
    }
    return;

    var itemData = args.object;
    var item = itemData.bindingContext;
    var xxx = JSON.stringify(item);
    //alert(xxx.replace(/,/g,"\n"));
    
    args.object.text = "1";
    //args.object.isEnabled = false;


    return;

    var fileSystemModule = require("file-system");
    var fileName = "persistedFile.json";

    var file = fileSystemModule.knownFolders.documents().getFile(fileName);
    var data = [{"id": "1", "value": "NativeScript"}]; 

    // write data to the file, converted to a JSON string first
    file.writeText(JSON.stringify(data));

    // read data from the file
    file.readText().then(function(content) {
    // content contains the data read from the file
        alert(content);
    });

    return;

    var page = args.object;
    var id = page.getViewById(args.object.id).id;
    var yyy = id.replace("aumentar","disminuir");
    // "disminuir10fe08b0-7f94-11e6-b74a-0f5c494ee820"
    var xxx = page.getViewById(id).id ;
    alert(xxx);
    // alert("propertyname:" + args.object.id);
    // alert("Object:" + args.object.text);
    // alert("value:" + args.value);
    // alert("value:" + args.value + "text" + args.propertyText + "css" + args.className);
}
exports.aumentarCantidad = aumentarCantidad;



function buttonForwardTap(args) {
    helpers.navigate({
        moduleName: 'components/pedidos/pedidos'
    });
}
exports.buttonForwardTap = buttonForwardTap;


function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}

// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;

        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    };


    _fetchData()
        .then(function (result) {
            var itemsList = [];
            result.forEach(function (item) {
                flattenLocationProperties(item);

                itemsList.push({

                    icon: '\ue0dc', //globe

                    image: item.foto ? item.expandImagen.ruta : item.expandImagen.ruta, //image: item.foto,

                    header: item.nombre,

                    description: item.etiqueta,

                    // singleItem properties
                    details: item
                });
            });

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
            // alert(itemsList.length);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded
    if (isInit) {
        isInit = false;

        // additional pageInit

    }
}

// START_CUSTOM_CODE_platos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_platos
exports.pageLoaded = pageLoaded;