cc.CanvasEditor.CCControlSwitchParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var node = cc.ControlSwitch.create(
            cc.Sprite.create("res/internal/switch-mask.png"),
            cc.Sprite.create("res/internal/switch-on.png"),
            cc.Sprite.create("res/internal/switch-off.png"),
            cc.Sprite.create("res/internal/switch-thumb.png"),
            cc.LabelTTF.create("on"),
            cc.LabelTTF.create("off"));
        if (cc.CanvasEditor.isEditor) {
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "mask", "res/internal/switch-mask.png")
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "on", "res/internal/switch-on.png")
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "off", "res/internal/switch-off.png")
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "thumb", "res/internal/switch-thumb.png")
        }
        return node
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCControlSwitch"
    },
    toObject: function (node) {
        return {
            enabled: node.isEnabled(),
            value: node.isOn(),
            mask: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "mask"),
            on: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "on"),
            off: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "off"),
            thumb: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "thumb"),
            onText: node._switchSprite.getOnLabel().getString(),
            offText: node._switchSprite.getOffLabel().getString()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "value") {
            node.setOn(value, true)
        } else if (propertyName === "enabled") {
            node.setEnabled(value);
        } else if (propertyName === "mask") {
            cc.TextureCache.getInstance().addImageAsync(value, function (err) {
                if (err) {
                    return
                }
                var texture = cc.TextureCache.getInstance().addImage(value)
                node._switchSprite.setMaskTexture(texture)
            }, this);
        } else if (propertyName === "on") {
            cc.TextureCache.getInstance().addImageAsync(value, function (err) {
                if (err) {
                    return
                }
                node._switchSprite.setOnSprite(cc.Sprite.create(value))
            }, this);
        } else if (propertyName === "off") {
            cc.TextureCache.getInstance().addImageAsync(value, function (err) {
                if (err) {
                    return
                }
                node._switchSprite.setOffSprite(cc.Sprite.create(value))
            }, this);
        } else if (propertyName === "thumb") {
            cc.TextureCache.getInstance().addImageAsync(value, function (err) {
                if (err) {
                    return
                }
                var texture = cc.TextureCache.getInstance().addImage(value)
                node._switchSprite.getThumbSprite().setTexture(texture);
                node._switchSprite.getThumbSprite().setTextureRect(rect);
            }, this);
        } else if (propertyName === "onText") {
            node._switchSprite.getOnLabel().setString(value);
            node._switchSprite.needsLayout()
        } else if (propertyName === "offText") {
            node._switchSprite.getOffLabel().setString(value);
            node._switchSprite.needsLayout()
        }
    }
})

cc.CanvasEditor._parser["CCControlSwitch"] = new cc.CanvasEditor.CCControlSwitchParser();
