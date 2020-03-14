cc.CanvasEditor.CCNodeWidgetParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.NodeWidget.create();
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCNodeWidget"
    },
    toObject: function (node) {
        return {
            l: node._leftTypeInParent,
            lVal: node._leftValueInParent,
            r: node._rightTypeInParent,
            rVal: node._rightValueInParent,
            h: node._centerHorizontalTypeInParent,
            hVal: node._centerHorizontalValueInParent,
            t: node._topTypeInParent,
            tVal: node._topValueInParent,
            b: node._bottomTypeInParent,
            bVal: node._bottomValueInParent,
            v: node._centerVerticalTypeInParent,
            vVal: node._centerVerticalValueInParent
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "l") {
            node.setLeftInParent(value);
        } else if (propertyName === "r") {
            node.setRightInParent(value);
        } else if (propertyName === "h") {
            node.setCenterHorizontalInParent(value);
        } else if (propertyName === "lVal") {
            node.setLeftInParent(node._leftTypeInParent, value);
        } else if (propertyName === "rVal") {
            node.setRightInParent(node._rightTypeInParent, value);
        } else if (propertyName === "hVal") {
            node.setCenterHorizontalInParent(node._centerHorizontalTypeInParent, value);
        } else if (propertyName === "t") {
            node.setTopInParent(value);
        } else if (propertyName === "b") {
            node.setBottomInParent(value);
        } else if (propertyName === "v") {
            node.setCenterVerticalInParent(value);
        } else if (propertyName === "tVal") {
            node.setTopInParent(node._topTypeInParent, value);
        } else if (propertyName === "bVal") {
            node.setBottomInParent(node._bottomTypeInParent, value);
        } else if (propertyName === "vVal") {
            node.setCenterVerticalInParent(node._centerVerticalTypeInParent, value);
        }
    }
})

cc.CanvasEditor._parser["CCNodeWidget"] = new cc.CanvasEditor.CCNodeWidgetParser();
