/*global tinymce:true */

tinymce.PluginManager.add('accesscheck', function(editor) {

    function accessCheck() {
        // Grabs everything from text box
        var content = editor.getContent();
        var errors = "";

        // Create wrapper div to perform DOM tests on content
        var wrapper = document.createElement('div');
        wrapper.innerHTML = content;

        // Get all instances of 'img' tag
        var imgs = wrapper.getElementsByTagName('img');
        // Check each image
        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];
            // If alt string is blank or contains only spaces
            if (!img.alt.replace(/\s/g, '').length) {
                var error = "This image requires a valid alt attribute: \n"
                    + img.src + "\n\n";
                errors += error;
            }
        }

        // Get all instances of header tags
        var headers = wrapper.querySelectorAll("h1, h2, h3, h4, h5, h6");
        if (headers.length > 0) {
            // Check first header
            var header = headers[0];
            var type = header.tagName.toLowerCase();
            if (!(type == "h1")) {
                var error = "This header tag is out of order: \n"
                    + header.innerHTML + "\n"
                    + "(The first header should be h1)\n\n";
                errors += error;
            }
            var prevHeaders = [header];

            // Check each header
            for (var i = 1; i < headers.length; i++) {
                header = headers[i];
                type = header.tagName.toLowerCase();
                var prev = prevHeaders[prevHeaders.length - 1];
                var prevType = prev.tagName.toLowerCase();
                if (((type == "h1") && !(prevType == "h1"))
                    || ((type == "h2") && !(prevType == "h1") && !(prevType == "h2"))
                    || ((type == "h3") && !(prevType == "h2") && !(prevType == "h3"))
                    || ((type == "h4") && !(prevType == "h3") && !(prevType == "h4"))
                    || ((type == "h5") && !(prevType == "h4") && !(prevType == "h5"))
                    || ((type == "h6") && !(prevType == "h5") && !(prevType == "h6"))) {
                    error = "This header tag is out of order: \n"
                        + header.innerHTML + "\n"
                        + "(" + type + " below " + prevType + ")\n\n";
                    errors += error;
                }

                //Add header to prevHeaders
                prevHeaders[prevHeaders.length] = header;
            }
        }

        if (errors === "") {
            alert("No issues detected.");
        }
        else {
            alert(errors);
        }
    }

    editor.addCommand("mceAccessibility", accessCheck);

    editor.addButton('accesscheck', {
        //icon: 'code',
        image: 'http://i.fixya.net/uploads/howto/9e2fb26.png',
        tooltip: 'Accessibility checker',
        onclick: accessCheck
    });

    editor.addMenuItem('accesscheck', {
        //icon: 'code',
        image: 'http://i.fixya.net/uploads/howto/9e2fb26.png',
        text: 'Accessibility checker',
        context: 'tools',
        onclick: accessCheck
    });
});
