cc.CanvasEditor.CCNodeParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.Node.create()
    },
    getSuperClassName: function () {
        return null
    },
    getClassName: function () {
        return "CCNode"
    },
    toObject: function (node) {
        return {
            pos: {
                x: node.getPositionX(),
                y: node.getPositionY()
            },
            size: {
                w: node.getContentSize().width,
                h: node.getContentSize().height
            },
            ap: {
                x: node.getAnchorPoint().x,
                y: node.getAnchorPoint().y
            },
            scale: {
                x: node.getScaleX(),
                y: node.getScaleY()
            },
            rot: node.getRotation(),
            skew: {
                x: node.getSkewX(),
                y: node.getSkewY()
            },
            tag: node.getTag(),
            ignoreAp: node.isIgnoreAnchorPointForPosition()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "pos") {
            node.setPosition(value)
        } else if (propertyName === "size") {
            node.setContentSize(value.w, value.h)
        } else if (propertyName === "ap") {
            node.setAnchorPoint(value)
        } else if (propertyName === "scale") {
            node.setScale(value.x, value.y)
        } else if (propertyName === "rot") {
            node.setRotation(value)
        } else if (propertyName === "skew") {
            node.setSkewX(value.x)
            node.setSkewY(value.y)
        } else if (propertyName === "tag") {
            node.setTag(value)
        } else if (propertyName === "ignoreAp") {
            node.ignoreAnchorPointForPosition(value)
        } else {
            console.warn("unknown property in " + this.getClassName() + ": " + propertyName)
        }
    }
})

cc.CanvasEditor._parser["CCNode"] = new cc.CanvasEditor.CCNodeParser();