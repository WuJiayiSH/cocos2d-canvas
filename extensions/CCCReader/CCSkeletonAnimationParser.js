cc.CanvasEditor.CCSkeletonAnimationParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        if (cc.CanvasEditor.isEditor) {
            var node = sp.SkeletonAnimation.create("res/internal/spineboy.json", "res/internal/spineboy.atlas", 1);
            node.setAnimation(0, "walk", true);
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "files", ["res/internal/spineboy.json", "res/internal/spineboy.atlas"]);
            return node;
        } else {
            return new sp.SkeletonAnimation()
        }
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCSkeletonAnimation"
    },
    toObject: function (node) {
        return {
            files: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "files"),
            anim: {
                name: node.getCurrent(0) ? node.getCurrent(0).animation.name : "",
                loop: node.getCurrent(0) ? node.getCurrent(0).loop : false
            }
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "files") {
            if (cc.CanvasEditor.isEditor) {
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "files", value)
                node.removeAllChildren(true);
                node.initWithArgs(value[0], value[1])
            } else {
                node.initWithArgs(value[0], value[1])
            }
        } else if (propertyName === "anim") {
            if (value.name) {
                node.setAnimation(0, value.name, value.loop);
            }
        }
    }
})

cc.CanvasEditor._parser["CCSkeletonAnimation"] = new cc.CanvasEditor.CCSkeletonAnimationParser();