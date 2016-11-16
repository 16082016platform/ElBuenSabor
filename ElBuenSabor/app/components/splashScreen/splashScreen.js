var frameModule = require("ui/frame");
var imageModule = require("ui/image");

// exports.loaded= function(args) {

//     // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
//     if (frameModule.topmost().ios) {
//         frameModule.topmost().ios.navBarVisibility = "never";
//     }

//     // Create a new image
//     var item = new imageModule.Image();

//     // Set the image's source to a file named “icon” in the
//     // project's App_Resources folder. For more information on
//     // how these image paths work refer to the images section
//     // on the NativeScript getting started guide
//     // http://docs.nativescript.org/getting-started#images
//     item.src = "~/resources/user.png" ;

//     // The actual image file is large so that it looks good when scaled.
//     // This shrinks the starting height of the image to a reasonable size.
//     item.height = 150;

//     // Attach an event handler that runs after the image loads.
//     // (We don't want the animation to kick off until the image is ready.)
//     item.on("loaded", function (args) {

//         // Kick off the animations. In a more realistic scenario, you may want to
//         // perform some backend processing while the splashscreen is up before
//         // your first call to animate(). But for simplicity's sake this example
//         // just calls animate() right away.
//         args.object
//             // Shrink the logo over 1.5 seconds
//             .animate({
//                 scale: { x: 0.6, y: 0.6 },
//                 duration: 1000
//             })
//             .then(function () {
//                 // Drastically increase the size of the logo
//                 return args.object.animate({
//                     scale: { x: 6, y: 6 },
//                     duration: 1000,
//                     rotate: 360
//                 });
//             })
//             .then(function () {
//                 // Drastically increase the size of the logo
//                 return args.object.animate({
//                     scale: { x: 0.6, y: 0.6 },
//                     duration: 2000
//                 });
//             })
//             .then(function () {
//                 // Drastically increase the size of the logo
//                 return args.object.animate({
//                     scale: { x: 0.6, y: 0.6 },
//                     duration: 200
//                 });
//             })
//             .then(function () {
//                 // Fade out the logo
//                 return args.object.animate({
//                     opacity: 0,
//                     duration: 1000
//                 });
//             })
//             .then(function () {
//                 // Navigate to the starting page. In the case of Groceries.
//                 // this is the login page
//                 frameModule.topmost().navigate({
//                     moduleName: "components/homeView/homeView",
//                     animated: false
//                 });
//                 homeView
//             });
//     });

//     page = args.object;

//     // Append the dynamically created image to the <GridLayout>
//     var gridSplashScreen = page.getViewById("gridSplashScreen");
//     gridSplashScreen.addChild(item);
// };



'use strict';
var isInit = true,
    service = require('./../categorias/categorias-service'),
    // additional requires
    viewModel = require('./../categorias/categorias-view-model');

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
    // Hide the iOS UINavigationBar so it doesn't get in the way of the animation
    if (frameModule.topmost().ios) {
        frameModule.topmost().ios.navBarVisibility = "never";
    } else {
        frameModule.topmost().android.navBarVisibility = "never";
    }

    // Create a new image
    var item = new imageModule.Image();

    // Set the image's source to a file named “icon” in the
    // project's App_Resources folder. For more information on
    // how these image paths work refer to the images section
    // on the NativeScript getting started guide
    // http://docs.nativescript.org/getting-started#images
    item.src = "~/resources/user.png";

    // The actual image file is large so that it looks good when scaled.
    // This shrinks the starting height of the image to a reasonable size.
    item.height = 150;

    // Attach an event handler that runs after the image loads.
    // (We don't want the animation to kick off until the image is ready.)
    item.on("loaded", function (args) {

        // Kick off the animations. In a more realistic scenario, you may want to
        // perform some backend processing while the splashscreen is up before
        // your first call to animate(). But for simplicity's sake this example
        // just calls animate() right away.
        args.object
            // Shrink the logo over 1.5 seconds
            .animate({
                scale: { x: 0.6, y: 0.6 },
                duration: 1000
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 6, y: 6 },
                    duration: 1000,
                    rotate: 360
                });
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 0.6, y: 0.6 },
                    duration: 2000
                });
            })
            .then(function () {
                // Drastically increase the size of the logo
                return args.object.animate({
                    scale: { x: 0.6, y: 0.6 },
                    duration: 200
                });
            })
            .then(function () {
                // Fade out the logo
                return args.object.animate({
                    opacity: 0,
                    duration: 1000
                });
            })
            .then(function () {
                // Navigate to the starting page. In the case of Groceries.
                // this is the login page
                frameModule.topmost().navigate({
                    moduleName: "components/homeView/homeView",
                    animated: false
                });
                homeView
            });
    });

    page = args.object;

    // Append the dynamically created image to the <GridLayout>
    var gridSplashScreen = page.getViewById("gridSplashScreen");
    gridSplashScreen.addChild(item);



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

                    header: item.nombre,

                    // singleItem properties
                    details: item
                });
            });

            //Write file function
            writeFile(itemsList, page.getMeasuredWidth());
        })
        .catch(function onCatch() {
            alert("Error al guardar tabla categorías");
        });
    // additional pageLoaded

}
exports.pageLoaded = pageLoaded;

function writeFile(data, width) {
    var fs = require("file-system");
    var documents = fs.knownFolders.documents();
    var fileName = "categorias.json";
    var myFile = documents.getFile(fileName);

    // var written: boolean;
    // Writing text to the file.
    width = width / data.length;

    for (var i = 0; i < data.length; i++) {
        data[i].width = width;
        data[i].activo = false;
    }
    data[0].activo = true;
    myFile.writeText(JSON.stringify(data))
        .then(function () {
            
        }, function (error) {
            // Failed to write to the file.
            alert(error);
        });
}