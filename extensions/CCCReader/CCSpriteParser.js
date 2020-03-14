cc.CanvasEditor.CCSpriteParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var node = cc.Sprite.create("res/internal/default.png")
        if (cc.CanvasEditor.isEditor)
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", "res/internal/default.png")
        return node
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCSprite"
    },
    toObject: function (node) {
        return {
            color: cc.CanvasEditor._toRgba(node.getColor(), node.getOpacity()),
            file: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "file"),
            flip: { x: node.isFlippedX(), y: node.isFlippedY() }
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "file") {
            cc.TextureCache.getInstance().addImageAsync(value, function (tex) {
                var texture = cc.TextureCache.getInstance().addImage(value)
                var contentSize = texture.getContentSize();
                var rect = cc.rect(0, 0, contentSize.width, contentSize.height);
                node.setTexture(texture);
                node.setTextureRect(rect);
            }, this);

            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", value)
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setColor(rgba[0])
            node.setOpacity(rgba[1])
        } else if (propertyName === "flip") {
            node.setFlippedX(value.x)
            node.setFlippedY(value.y)

        }
    }
})

cc.CanvasEditor._parser["CCSprite"] = new cc.CanvasEditor.CCSpriteParser();
