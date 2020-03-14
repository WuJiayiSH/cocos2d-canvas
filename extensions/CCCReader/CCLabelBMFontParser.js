cc.CanvasEditor.CCLabelBMFontParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.LabelBMFont.create();
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCLabelBMFont"
    },
    toObject: function (node) {
        return {
            color: cc.CanvasEditor._toRgba(node.getColor(), node.getOpacity()),
            file: node.getFntFile(),
            string: node.getString()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "file") {
            var fullfilePath = cc.FileUtils.getInstance().fullPathForFilename(value);
            cc.SAXParser.getInstance().preloadPlist(value, function () {
                if (cc.SAXParser.getInstance().getList(fullfilePath)) {
                    node.setFntFile(value)
                }
            }, this);
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setColor(rgba[0])
            node.setOpacity(rgba[1])
        } else if (propertyName === "string") {
            node.setString(value)
        }
    }
})

cc.CanvasEditor._parser["CCLabelBMFont"] = new cc.CanvasEditor.CCLabelBMFontParser();
