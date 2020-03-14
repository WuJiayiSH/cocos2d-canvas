cc.CanvasEditor.CCLayerGradientParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.LayerGradient.create()
    },
    getSuperClassName: function () {
        return "CCLayerColor"
    },
    getClassName: function () {
        return "CCLayerGradient"
    },
    toObject: function (node) {
        return {
            start: cc.CanvasEditor._toRgba(node.getStartColor(), node.getStartOpacity()),
            end: cc.CanvasEditor._toRgba(node.getEndColor(), node.getEndOpacity()),
            vector: {
                x: node.getVector().x,
                y: node.getVector().y
            }
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "start") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setStartColor(rgba[0])
            node.setStartOpacity(rgba[1])
        } else if (propertyName === "end") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setEndColor(rgba[0])
            node.setEndOpacity(rgba[1])
        } else if (propertyName === "vector") {
            node.setVector(value)
        }
    }
})

cc.CanvasEditor._parser["CCLayerGradient"] = new cc.CanvasEditor.CCLayerGradientParser();