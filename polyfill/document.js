document.querySelector = function(selectorStr) {
    var reId = /^#([\w-]+)$/;
    var reClass = /^\.([\w-]+)$/;
    var reTag = /^[\w-]+$/;

    var selectors = selectorStr.split(' ');
    var element = document;
    for(var i = 0; i < selectors.length; i++) {
        if(reId.test(selectors[i])) {
            element = element.getElementById(selectors[i].substring(1));
        } else if(reClass.test(selectors[i])) {
            element = element.getElementsByClassName(selectors[i].substring(1))[0];
        } else if(reTag.test(selectors[i])) {
            element = element.getElementsByTagName(selectors[i])[0];
        }
    }
    return element;
};
