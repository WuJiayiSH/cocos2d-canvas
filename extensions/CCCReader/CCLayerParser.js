cc.CanvasEditor.CCLayerParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.Layer.create()
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCLayer"
    },
    toObject: function (node) {
        return {
            touch: node.isTouchEnabled(),
            mouse: node.isMouseEnabled(),
            accelerometer: node.isAccelerometerEnabled(),
            keyboard: node.isKeyboardEnabled()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "touch") {
            node.setTouchEnabled(value)
        } else if (propertyName === "mouse") {
            node.setMouseEnabled(value)
        } else if (propertyName === "accelerometer") {
            node.setAccelerometerEnabled(value)
        } else if (propertyName === "keyboard") {
            node.setKeyboardEnabled(value)
        } else {
            console.warn("unknown property in " + this.getClassName() + ": " + propertyName)
        }
    }
})

cc.CanvasEditor._parser["CCLayer"] = new cc.CanvasEditor.CCLayerParser();