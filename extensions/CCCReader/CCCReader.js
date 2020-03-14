cc.CanvasEditor = {
    _parser: {},
    isEditor: true
}

cc.CanvasEditor.getParser = function (className) {
    if (cc.CanvasEditor._parser[className]) {
        return cc.CanvasEditor._parser[className]
    }
    return cc.CanvasEditor._parser["CCNode"]
};

cc.CanvasEditor._getParsers = function (className) {
    var parser = cc.CanvasEditor.getParser(className);
    var parsers = [];
    parsers.push(parser);
    while (parser.getSuperClassName()) {
        parser = cc.CanvasEditor.getParser(parser.getSuperClassName());
        parsers.push(parser);
        if (parsers.length > 99) {
            throw "too many supper class, it is not likely to happen, check parsers' superclass value"
        }
    }
    return parsers.reverse();
};

cc.CanvasEditor._fromRgba = function (ccsRgba) {
    var rgba = JSON.parse("[" + ccsRgba.substring(5, ccsRgba.indexOf(")")) + "]")
    return [cc.c3(rgba[0], rgba[1], rgba[2]), rgba[3] * 255]
};

cc.CanvasEditor._toRgba = function (color, opacity) {
    if (!opacity) {

    }
    return "rgba(" + color.r + "," + color.g + "," + color.b + "," + (opacity / 255) + ")"
};

cc.CanvasEditor._c4fFromRgba = function (ccsRgba) {
    var rgba = JSON.parse("[" + ccsRgba.substring(5, ccsRgba.indexOf(")")) + "]")
    return cc.c4f(rgba[0] / 255, rgba[1] / 255, rgba[2] / 255, rgba[3])
};

cc.CanvasEditor._c4fToRgba = function (color) {
    return "rgba(" + Math.floor(color.r * 255) + "," + Math.floor(color.g * 255) + "," + Math.floor(color.b * 255) + "," + color.a + ")"
};


cc.CanvasEditor._toHexString = function (color) {
    return cc.convertColor3BtoHexString(color || cc.c3(0, 0, 0))
};

cc.CanvasEditor._fromHexString = function (color) {
    return cc.convertHexNumToColor3B(color)
};

cc.CanvasEditor._getUserDataItem = function (node, className, key) {
    if (!cc.CanvasEditor.isEditor) {
        throw "_getUserDataItem can only be used in editor mode"
    }

    var userData = node.getUserData()
    if (!userData) {
        userData = {}
        node.setUserData(userData)
    }

    if (!userData[className]) {
        userData[className] = {}
    }

    return userData[className][key]
};

cc.CanvasEditor._setUserDataItem = function (node, className, key, value) {
    if (!cc.CanvasEditor.isEditor) {
        throw "_getUserDataItem can only be used in editor mode"
    }

    var userData = node.getUserData()
    if (!userData) {
        userData = {}
        node.setUserData(userData)
    }

    if (!userData[className]) {
        userData[className] = {}
    }

    userData[className][key] = value
};


cc.CanvasEditor.readFromObject = function (object) {
    var parsers = cc.CanvasEditor._getParsers(object.cls);
    var node = parsers[parsers.length - 1].loadCCNode();

    for (var i = 0; i < parsers.length; i++) {
        var keyValueMap = object.data[i];
        var parser = parsers[i];
        for (key in keyValueMap) {
            parser.onHandleProp(node, key, keyValueMap[key])
        }
    }

    return node;
};

cc.CanvasEditor.writeToObject = function (node, className) {
    var parsers = cc.CanvasEditor._getParsers(className);
    var obj = {
        cls: className,
        data: []
    }
    for (var i = 0; i < parsers.length; i++) {
        var parser = parsers[i];
        obj.data.push(parser.toObject(node));
    }
    return obj;
};