cc.CanvasEditor.CCLayerColorParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.LayerColor.create(cc.c4(32, 32, 64, 255))
    },
    getSuperClassName: function () {
        return "CCLayer"
    },
    getClassName: function () {
        return "CCLayerColor"
    },
    toObject: function (node) {
        return {
            color: cc.CanvasEditor._toRgba(node.getColor(), node.getOpacity()),
            cascadeColor: node.isCascadeColorEnabled(),
            cascadeOpacity: node.isCascadeOpacityEnabled()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "cascadeColor") {
            node.setCascadeColorEnabled(value);
        } else if (propertyName === "cascadeOpacity") {
            node.setCascadeOpacityEnabled(value);
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setColor(rgba[0])
            node.setOpacity(rgba[1])
        }
    }
})

cc.CanvasEditor._parser["CCLayerColor"] = new cc.CanvasEditor.CCLayerColorParser();