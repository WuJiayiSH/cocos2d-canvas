cc.CanvasEditor.CCControlSliderParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var node = cc.ControlSlider.create("res/internal/slider-bg.png",
            "res/internal/slider-progress.png",
            "res/internal/slider-thumb.png");
        if (cc.CanvasEditor.isEditor) {
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "bg", "res/internal/slider-bg.png")
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "progress", "res/internal/slider-progress.png")
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "thumb", "res/internal/slider-thumb.png")
        }
        return node
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCControlSlider"
    },
    toObject: function (node) {
        return {
            max: node.getMaximumValue(),
            min: node.getMinimumValue(),
            value: node.getValue(),
            bg: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "bg"),
            progress: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "progress"),
            thumb: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "thumb"),
            enabled: node.isEnabled()
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "max") {
            node.setMaximumValue(value)
        } else if (propertyName === "min") {
            node.setMinimumValue(value)
        } else if (propertyName === "value") {
            node.setValue(value)
        } else if (propertyName === "enabled") {
            node.setEnabled(value);
        } else if (propertyName === "bg") {
            cc.TextureCache.getInstance().addImageAsync(value, function (tex) {
                var texture = cc.TextureCache.getInstance().addImage(value)
                var contentSize = texture.getContentSize();
                var rect = cc.rect(0, 0, contentSize.width, contentSize.height);
                node.getBackgroundSprite().setTexture(texture);
                node.getBackgroundSprite().setTextureRect(rect);
            }, this);

            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "bg", value)
        } else if (propertyName === "progress") {
            cc.TextureCache.getInstance().addImageAsync(value, function (tex) {
                var texture = cc.TextureCache.getInstance().addImage(value)
                var contentSize = texture.getContentSize();
                var rect = cc.rect(0, 0, contentSize.width, contentSize.height);
                node.getProgressSprite().setTexture(texture);
                node.getProgressSprite().setTextureRect(rect);
            }, this);

            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "progress", value)
        } else if (propertyName === "thumb") {
            cc.TextureCache.getInstance().addImageAsync(value, function (tex) {
                var texture = cc.TextureCache.getInstance().addImage(value)
                var contentSize = texture.getContentSize();
                var rect = cc.rect(0, 0, contentSize.width, contentSize.height);
                node.getThumbSprite().setTexture(texture);
                node.getThumbSprite().setTextureRect(rect);
            }, this);

            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "thumb", value)
        }
    }
})

cc.CanvasEditor._parser["CCControlSlider"] = new cc.CanvasEditor.CCControlSliderParser();
