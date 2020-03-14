cc.CanvasEditor.CCScale9SpriteParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var node = cc.Scale9Sprite.create("res/internal/default.png")
        if (cc.CanvasEditor.isEditor)
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", "res/internal/default.png")
        return node
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCScale9Sprite"
    },
    toObject: function (node) {
        return {
            color: cc.CanvasEditor._toRgba(node.getColor(), node.getOpacity()),
            file: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "file"),
            preferred: { w: node.getPreferredSize().width, h: node.getPreferredSize().height },
            insets: { l: node.getInsetLeft(), r: node.getInsetRight(), t: node.getInsetTop(), b: node.getInsetBottom() }
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "file") {
            var texture = cc.TextureCache.getInstance().addImage(value);
            var setTexture = function () {
                var contentSize = texture.getContentSize();
                var spriteFrame = cc.SpriteFrame.create(value, contentSize)
                node.setSpriteFrame(spriteFrame);
            }
            if (texture.isLoaded()) {
                setTexture()
            } else {
                texture.addLoadedEventListener(function () {
                    setTexture()
                }, this);
            }
            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", value)
        } else if (propertyName === "color") {
            var rgba = cc.CanvasEditor._fromRgba(value)
            node.setColor(rgba[0])
            node.setOpacity(rgba[1])
        } else if (propertyName === "insets") {
            node.setInsetLeft(value.l)
            node.setInsetRight(value.r)
            node.setInsetTop(value.t)
            node.setInsetBottom(value.b)
        } else if (propertyName === "preferred") {
            node.setPreferredSize(cc.size(value.w, value.h))
        }
    }
})

cc.CanvasEditor._parser["CCScale9Sprite"] = new cc.CanvasEditor.CCScale9SpriteParser();
