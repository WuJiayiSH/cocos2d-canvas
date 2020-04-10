/****************************************************************************
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2014 Chukong Technologies Inc.
 Copyright (c) 2014 Shengxiang Chen (Nero Chan)

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var sp = sp || {};

sp.VERTEX_INDEX = {
    X1: 0,
    Y1: 1,
    X2: 2,
    Y2: 3,
    X3: 4,
    Y3: 5,
    X4: 6,
    Y4: 7
};

sp.ATTACHMENT_TYPE = {
    REGION: 0,
    REGION_SEQUENCE: 1,
    BOUNDING_BOX: 2
};

sp.Skeleton = cc.NodeRGBA.extend({
    _skeleton: null,
    _rootBone: null,
    _timeScale: 1,
    _debugSlots: false,
    _debugBones: false,
    _premultipliedAlpha: false,
    _ownsSkeletonData: null,
    _atlas: null,
    _blendFunc: null,
    _renderer: null,
    ctor:function(){
        cc.NodeRGBA.prototype.ctor.call(this);
        this._blendFunc = {src: cc.BLEND_SRC, dst: cc.BLEND_DST};
    },
    init: function () {
        cc.Node.prototype.init.call(this);
        this.setOpacityModifyRGB(true);
        this._blendFunc.src = gl.ONE;
        this._blendFunc.dst = gl.ONE_MINUS_SRC_ALPHA;
        this._renderer = new spine.canvas.SkeletonRenderer(cc.renderContext);
        this.scheduleUpdate();
    },

    /**
     * @deprecated use setDebugRendering
     * @param {Boolean} v
     */
    setDebugSolots:function(v){
        this._debugSlots = v;
    },

    /**
     * @deprecated use setDebugRendering
     * @param {Boolean} v
     */
    setDebugBones:function(v){
        this._debugBones = v;
    },

    /**
     * @param {Boolean} v
     */
    setDebugRendering:function(v){
        this._renderer.debugRendering = v;
    },

    /**
     * @param {Boolean} v
     */
    setTriangleRendering:function(v){
        this._renderer.triangleRendering = v;
    },

    /**
     * @param {Number} v
     */
    setTimeScale:function(v){
        this._timeScale = v;
    },

    initWithArgs: function (/*multi arguments*/) {
        var argSkeletonFile = arguments[0], argAtlasFile = arguments[1],
            skeletonData, atlas, scale, ownsSkeletonData;

        var fileUtils = cc.FileUtils.getInstance();
        if (typeof argSkeletonFile == 'string') {
            if (typeof argAtlasFile == 'string') {
                var data = fileUtils.getTextFileData(argAtlasFile);
                atlas = new spine.TextureAtlas(data, function(path) {
                    var texturePath = cc.FileUtils.getInstance().fullPathFromRelativeFile(path, argAtlasFile);
                    var texture = cc.TextureCache.getInstance().addImage(texturePath);
                    return new spine.canvas.CanvasTexture(texture.getHtmlElementObj());
                });
            } else {
                atlas = arguments[1];
            }
            scale = arguments[2] || 1 / cc.Director.getInstance().getContentScaleFactor();

            var attachmentLoader = new spine.AtlasAttachmentLoader(atlas);
            var skeletonJsonReader = new spine.SkeletonJson(attachmentLoader);
            skeletonJsonReader.scale = scale;

            var skeletonJson = JSON.parse(fileUtils.getTextFileData(argSkeletonFile));
            skeletonData = skeletonJsonReader.readSkeletonData(skeletonJson);
            atlas.dispose(skeletonJsonReader);
            ownsSkeletonData = true;
        } else {
            skeletonData = arguments[0];
            ownsSkeletonData = arguments[1];
        }
        this.setSkeletonData(skeletonData, ownsSkeletonData);
        this.init();
    },

    boundingBox: function () {
        var bounds = new sp.spine.SkeletonBounds();
        bounds.update(this._skeleton._sgNode._skeleton);
        var rect = bounds.boundingBoxes[0] || cc.rect(0, 0, this._contentSize.width, this._contentSize.height)
        for (var i = 1; i < bounds.boundingBoxes.length; i++) {
            rect = cc.rectUnion(rect, bounds.boundingBoxes[i]);
        }
        
        return cc._RectApplyAffineTransformIn(rect, this.nodeToParentTransform());
    },
    updateWorldTransform: function () {
        this._skeleton.updateWorldTransform();
    },
    setToSetupPose: function () {
        this._skeleton.setToSetupPose();
    },
    setBonesToSetupPose: function () {
        this._skeleton.setBonesToSetupPose();
    },
    setSlotsToSetupPose: function () {
        this._skeleton.setSlotsToSetupPose();
    },
    findBone: function (boneName) {
        return this._skeleton.findBone(boneName);
    },
    findSlot: function (slotName) {
        return this._skeleton.findSlot(slotName);
    },
    setSkin: function (skinName) {
        return this._skeleton.setSkinByName(skinName);
    },
    getAttachment: function (slotName, attachmentName) {
        return this._skeleton.getAttachmentBySlotName(slotName, attachmentName);
    },
    setAttachment: function (slotName, attachmentName) {
        return this._skeleton.setAttachment(slotName, attachmentName);
    },
    setOpacityModifyRGB: function (v) {
        this._premultipliedAlpha = v;
    },
    isOpacityModifyRGB: function () {
        return this._premultipliedAlpha;
    },
    setSkeletonData: function (skeletonData, ownsSkeletonData) {
        this._skeleton = new spine.Skeleton(skeletonData);
        this._skeleton.scaleY = -1;
        this._rootBone = this._skeleton.getRootBone();
        this._ownsSkeletonData = ownsSkeletonData;
    },

    getTextureAtlas: function (regionAttachment) {
        return regionAttachment.rendererObject.page.rendererObject;
    },
    getBlendFunc: function () {
        return this._blendFunc;
    },
    /**
     * @deprecated It should work with webgl, but globalCompositeOperation in canvas does not cover all the situations, plus flashcanvas does not support globalCompositeOperation at all
     */
    setBlendFunc: function (_blendFunc) {
        this._blendFunc = _blendFunc;
    },

    update: function (dt) {
        this._skeleton.update(dt);
    },

    draw: function (ctx) {
        this._renderer.draw(this._skeleton);
        if(!this._debugSlots && !this._debugBones){
            return;
        }
        var locSkeleton = this._skeleton;
        var attachment,slot, i, n, quad, drawingUtil = cc.drawingUtil;
        if (this._debugSlots) {
            // Slots.
            drawingUtil.setDrawColor4B(0, 0, 255, 255);
            drawingUtil.setLineWidth(1);

            var points = [];
            for (i = 0, n = locSkeleton.slots.length; i < n; i++) {
                slot = locSkeleton.drawOrder[i];
                if (!slot.attachment || slot.attachment.type != sp.ATTACHMENT_TYPE.REGION)
                    continue;
                attachment = slot.attachment;
                sp._regionAttachment_updateSlotForCanvas(attachment, slot, points);
                drawingUtil.drawPoly(points, 4, true);
            }
        }

        if (this._debugBones) {
            // Bone lengths.
            var bone;
            drawingUtil.setLineWidth(2);
            drawingUtil.setDrawColor4B(255, 0, 0, 255);

            for (i = 0, n = locSkeleton.bones.length; i < n; i++) {
                bone = locSkeleton.bones[i];
                var x = bone.data.length * bone.m00 + bone.worldX;
                var y = bone.data.length * bone.m10 + bone.worldY;
                drawingUtil.drawLine(cc.p(bone.worldX, bone.worldY), cc.p(x, y));
            }

            // Bone origins.
            drawingUtil.setPointSize(4);
            drawingUtil.setDrawColor4B(0, 0, 255, 255); // Root bone is blue.

            for (i = 0, n = locSkeleton.bones.length; i < n; i++) {
                bone = locSkeleton.bones[i];
                drawingUtil.drawPoint(cc.p(bone.worldX, bone.worldY));
                if (i === 0)
                    drawingUtil.setDrawColor4B(0, 255, 0, 255);
            }
        }
    }
});

sp.Skeleton.createWithData = function (skeletonData, ownsSkeletonData) {
    var c = new sp.Skeleton();
    c.initWithArgs.apply(c, arguments);
    return c;
};

sp.Skeleton.create = function (skeletonDataFile, atlasFile/* or atlas*/, scale) {
    var c = new sp.Skeleton();
    c.initWithArgs.apply(c, arguments);
    return c;
};