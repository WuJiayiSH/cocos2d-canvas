cc.CanvasEditor.CCLabelTTFParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        return cc.LabelTTF.create("Hello");
    },
    getSuperClassName: function () {
        return "CCNode";
    },
    getClassName: function () {
        return "CCLabelTTF";
    },
    toObject: function (node) {
        return {
            color: cc.CanvasEditor._toRgba(node.getColor(), node.getOpacity()),
            string: node.getString(),
            font: node.getFontName(),
            size: node.getFontSize(),
            dim: { w: node.getDimensions().width, h: node.getDimensions().height },
            flip: { x: node.isFlippedX(), y: node.isFlippedY() },
            align: { h: node.getHorizontalAlignment(), v: node.getVerticalAlignment() },
            bold: node.isBold(),
            italic: node.isItalic(),
            stroke: {
                enabled: node._strokeEnabled,
                size: node._strokeSize,
                color: cc.CanvasEditor._toHexString(node._strokeColor)
            },
            shadow: {
                enabled: node._shadowEnabled,
                offset: { w: node._shadowOffset.width, h: node._shadowOffset.height },
                blur: node._shadowBlur,
                opacity: node._shadowOpacity
            }
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "string") {
            node.setString(value);
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value);
            node.setColor(rgba[0]);
            node.setOpacity(rgba[1]);
        } else if (propertyName === "size") {
            node.setFontSize(value);
        } else if (propertyName === "font") {
            node.setFontName(value);
        } else if (propertyName === "align") {
            node.setHorizontalAlignment(value.h);
            node.setVerticalAlignment(value.v);
        } else if (propertyName === "dim") {
            node.setDimensions(cc.size(value.w, value.h));
        } else if (propertyName === "bold") {
            node.setBold(value);
        } else if (propertyName === "italic") {
            node.setItalic(value);
        } else if (propertyName === "stroke") {
            if (value.enabled) {
                node.enableStroke(cc.CanvasEditor._fromHexString(value.color), value.size);
            } else {
                node.disableStroke();
            }
        } else if (propertyName === "shadow") {
            if (value.enabled) {
                node.enableShadow(cc.size(value.offset.w, value.offset.h), value.opacity, value.blur);
            } else {
                node.disableShadow();
            }
        }
    }
})

cc.CanvasEditor._parser["CCLabelTTF"] = new cc.CanvasEditor.CCLabelTTFParser();
