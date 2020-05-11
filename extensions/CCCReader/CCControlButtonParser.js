cc.CanvasEditor.CCControlButtonParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var label = cc.LabelTTF.create("Click Me", "Arial", 12);
        var bg = cc.Scale9Sprite.create("res/internal/default.png")
        var button = cc.ControlButton.create(label, bg)
        if (cc.CanvasEditor.isEditor) {
            cc.CanvasEditor._setUserDataItem(button, this.getClassName(), "normalbg", "res/internal/default.png")
            cc.CanvasEditor._setUserDataItem(button, this.getClassName(), "selectedbg", "res/internal/default.png")
            cc.CanvasEditor._setUserDataItem(button, this.getClassName(), "highlightedbg", "res/internal/default.png")
            cc.CanvasEditor._setUserDataItem(button, this.getClassName(), "disabledbg", "res/internal/default.png")
        }

        return button
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCControlButton"
    },
    toObject: function (node) {

        let bg = node.getBackgroundSpriteForState(cc.CONTROL_STATE_NORMAL);
        let label = node.getTitleLabelForState(cc.CONTROL_STATE_NORMAL);
        return {
            string: node.getTitleForState(),
            font: node.getTitleTTFForState(),
            size: node.getTitleTTFSizeForState(),
            bold: label.isBold(),
            italic: label.isItalic(),
            stroke: {
                enabled: label._strokeEnabled,
                size: label._strokeSize,
                color: cc.CanvasEditor._toHexString(label._strokeColor)
            },
            shadow: {
                enabled: label._shadowEnabled,
                offset: { w: label._shadowOffset.width, h: label._shadowOffset.height },
                blur: label._shadowBlur,
                opacity: label._shadowOpacity
            },
            normal: {
                bg: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "normalbg"),
                text: node.getTitleForState(cc.CONTROL_STATE_NORMAL),
                color: cc.CanvasEditor._toHexString(node.getTitleColorForState(cc.CONTROL_STATE_NORMAL))
            },
            disabled: {
                bg: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "disabledbg"),
                text: node.getTitleForState(cc.CONTROL_STATE_DISABLED),
                color: cc.CanvasEditor._toHexString(node.getTitleColorForState(cc.CONTROL_STATE_DISABLED))
            },
            highlighted: {
                bg: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "highlightedbg"),
                text: node.getTitleForState(cc.CONTROL_STATE_HIGHLIGHTED),
                color: cc.CanvasEditor._toHexString(node.getTitleColorForState(cc.CONTROL_STATE_HIGHLIGHTED))
            },
            selected: {
                bg: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "selectedbg"),
                text: node.getTitleForState(cc.CONTROL_STATE_SELECTED),
                color: cc.CanvasEditor._toHexString(node.getTitleColorForState(cc.CONTROL_STATE_SELECTED))
            },
            dim: { w: label.getDimensions().width, h: label.getDimensions().height },
            color: cc.CanvasEditor._toRgba(bg.getColor(), bg.getOpacity()),
            preferred: { w: bg.getPreferredSize().width, h: bg.getPreferredSize().height },
            insets: { l: bg.getInsetLeft(), r: bg.getInsetRight(), t: bg.getInsetTop(), b: bg.getInsetBottom() },
            enabled: node.isEnabled(),
            zoom: node.getZoomOnTouchDown()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        let label = node.getTitleLabelForState(cc.CONTROL_STATE_NORMAL);
        if (propertyName === "string") {
            node.setTitleForState(value)
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setColor(rgba[0])
            node.setOpacity(rgba[1])
        } else if (propertyName === "size") {
            node.setTitleTTFSizeForState(value, cc.CONTROL_STATE_NORMAL)
        } else if (propertyName === "font") {
            node.setTitleTTFForState(value, cc.CONTROL_STATE_NORMAL)
        } else if (propertyName === "align") {
            label.setHorizontalAlignment(value.h)
            label.setVerticalAlignment(value.v)
        } else if (propertyName === "dim") {
            label.setDimensions(cc.size(value.w, value.h))
        } else if (propertyName === "normal" ||
            propertyName === "disabled" ||
            propertyName === "highlighted" ||
            propertyName === "selected") {
            this._setBackgroundSpriteFrame(node, propertyName, value)
        } else if (propertyName === "preferred") {
            node.setPreferredSize(cc.size(value.w, value.h))
        } else if (propertyName === "insets") {
            var locTable = node._backgroundSpriteDispatchTable;
            for (var itemKey in locTable) {
                locTable[itemKey].setInsetLeft(value.l)
                locTable[itemKey].setInsetRight(value.r)
                locTable[itemKey].setInsetTop(value.t)
                locTable[itemKey].setInsetBottom(value.b)
            }
        } else if (propertyName === "bold") {
            label.setBold(value);
        } else if (propertyName === "italic") {
            label.setItalic(value);
        } else if (propertyName === "stroke") {
            if (value.enabled) {
                label.enableStroke(cc.CanvasEditor._fromHexString(value.color), value.size);
            } else {
                label.disableStroke();
            }
        } else if (propertyName === "shadow") {
            if (value.enabled) {
                label.enableShadow(cc.size(value.offset.w, value.offset.h), value.opacity, value.blur);
            } else {
                label.disableShadow();
            }
        } else if (propertyName === "zoom") {
            node.setZoomOnTouchDown(value);
        } else if (propertyName === "enabled") {
            node.setEnabled(value);
        }
    },
    _setBackgroundSpriteFrame: function (node, propertyName, value) {
        let state = cc["CONTROL_STATE_" + propertyName.toUpperCase()]
        node.setTitleForState(value.text, state);
        var hexString = cc.CanvasEditor._fromHexString(value.color)
        node.setTitleColorForState(hexString, state);
        var texture = cc.TextureCache.getInstance().addImage(value.bg);
        var setTexture = function () {
            var contentSize = texture.getContentSize();
            var spriteFrame = cc.SpriteFrame.create(value.bg, contentSize)
            node.setBackgroundSpriteFrameForState(spriteFrame, state);
        }
        if (texture.isLoaded()) {
            setTexture()
        } else {
            texture.addLoadedEventListener(function () {
                setTexture()
            }, this);
        }
        if (cc.CanvasEditor.isEditor)
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), propertyName + "bg", value.bg)
    }
})

cc.CanvasEditor._parser["CCControlButton"] = new cc.CanvasEditor.CCControlButtonParser();
