cc.CanvasEditor.CCParticleSystemParser = cc.Class.extend({
    ctor: function () {
    },
    loadCCNode: function () {
        var node = cc.ParticleSystem.create();
        var texture = cc.TextureCache.getInstance().addImage("res/internal/default2.png");
        node.setTexture(texture);
        node.setDuration(-1);
        node.setLife(1);
        node.setAngle(0);
        node.setAngleVar(360);
        node.setSpeed(100);
        node.setStartSize(25.0);
        node.setEndSize(cc.PARTICLE_START_SIZE_EQUAL_TO_END_SIZE);
        node.setEmissionRate(node.getTotalParticles() / node.getLife());
        if (cc.CanvasEditor.isEditor)
            cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", "res/internal/default2.png")

        return node;
    },
    getSuperClassName: function () {
        return "CCNode"
    },
    getClassName: function () {
        return "CCParticleSystem"
    },
    toObject: function (node) {
        return {
            mode: node.getEmitterMode(),
            posVar: { x: node.getPosVar().x, y: node.getPosVar().y },
            emitRate: node.getEmissionRate(),
            dur: node.getDuration(),
            total: node.getTotalParticles(),
            life: node.getLife(),
            lifeVar: node.getLifeVar(),
            startSize: node.getStartSize(),
            startSizeVar: node.getStartSizeVar(),
            endSize: node.getEndSize(),
            endSizeVar: node.getEndSizeVar(),
            startSpin: node.getStartSpin(),
            startSpinVar: node.getStartSpinVar(),
            endSpin: node.getEndSpin(),
            endSpinVar: node.getEndSpinVar(),
            angle: node.getAngle(),
            angleVar: node.getAngleVar(),
            gravity: { x: node.getGravity().x, y: node.getGravity().y },
            speed: node.getSpeed(),
            speedVar: node.getSpeedVar(),
            tang: node.getTangentialAccel(),
            tangVar: node.getTangentialAccelVar(),
            radial: node.getRadialAccel(),
            radialVar: node.getRadialAccelVar(),
            startRadius: node.getStartRadius(),
            startRadiusVar: node.getStartRadiusVar(),
            endRadius: node.getEndRadius(),
            endRadiusVar: node.getEndRadiusVar(),
            rotate: node.getRotatePerSecond(),
            rotateVar: node.getRotatePerSecondVar(),
            startColor: cc.CanvasEditor._c4fToRgba(node.getStartColor()),
            startColorVar: cc.CanvasEditor._c4fToRgba(node.getStartColorVar()),
            endColor: cc.CanvasEditor._c4fToRgba(node.getEndColor()),
            endColorVar: cc.CanvasEditor._c4fToRgba(node.getEndColorVar()),
            additive: node.isBlendAdditive(),
            file: cc.CanvasEditor._getUserDataItem(node, this.getClassName(), "file")
        }
    },
    onHandleProp: function (node, propertyName, value) {
        if (propertyName === "mode") {
            node.setEmitterMode(value);
        } else if (propertyName === "posVar") {
            node.setPosVar(cc.p(value.x, value.y));
        } else if (propertyName === "emitRate") {
            node.setEmissionRate(value);
        } else if (propertyName === "dur") {
            node.setDuration(value);
        } else if (propertyName === "total") {
            node.setTotalParticles(value);
        } else if (propertyName === "life") {
            node.setLife(value);
        } else if (propertyName === "lifeVar") {
            node.setLifeVar(value);
        } else if (propertyName === "startSize") {
            node.setStartSize(value);
        } else if (propertyName === "startSizeVar") {
            node.setStartSizeVar(value);
        } else if (propertyName === "endSize") {
            node.setEndSize(value);
        } else if (propertyName === "endSizeVar") {
            node.setEndSizeVar(value);
        } else if (propertyName === "startSpin") {
            node.setStartSpin(value);
        } else if (propertyName === "startSpinVar") {
            node.setStartSpinVar(value);
        } else if (propertyName === "endSpin") {
            node.setEndSpin(value);
        } else if (propertyName === "endSpinVar") {
            node.setEndSpinVar(value);
        } else if (propertyName === "angle") {
            node.setAngle(value);
        } else if (propertyName === "angleVar") {
            node.setAngleVar(value);
        } else if (propertyName === "gravity") {
            node.setGravity(cc.p(value.x, value.y));
        } else if (propertyName === "speed") {
            node.setSpeed(value);
        } else if (propertyName === "speedVar") {
            node.setSpeedVar(value);
        } else if (propertyName === "tang") {
            node.setTangentialAccel(value);
        } else if (propertyName === "tangVar") {
            node.setTangentialAccelVar(value);
        } else if (propertyName === "radial") {
            node.setRadialAccel(value);
        } else if (propertyName === "radialVar") {
            node.setRadialAccelVar(value);
        } else if (propertyName === "startRadius") {
            node.setStartRadius(value);
        } else if (propertyName === "startRadiusVar") {
            node.setStartRadiusVar(value);
        } else if (propertyName === "endRadius") {
            node.setEndRadius(value);
        } else if (propertyName === "endRadiusVar") {
            node.setEndRadiusVar(value);
        } else if (propertyName === "rotate") {
            node.setRotatePerSecond(value);
        } else if (propertyName === "rotateVar") {
            node.setRotatePerSecondVar(value);
        } else if (propertyName === "startColor") {
            node.setStartColor(cc.CanvasEditor._c4fFromRgba(value));
        } else if (propertyName === "startColorVar") {
            node.setStartColorVar(cc.CanvasEditor._c4fFromRgba(value));
        } else if (propertyName === "endColor") {
            node.setEndColor(cc.CanvasEditor._c4fFromRgba(value));
        } else if (propertyName === "endColorVar") {
            node.setEndColorVar(cc.CanvasEditor._c4fFromRgba(value));
        } else if (propertyName === "additive") {
            node.setBlendAdditive(value);
        } else if (propertyName === "file") {
            cc.TextureCache.getInstance().addImageAsync(value, function (tex) {
                var texture = cc.TextureCache.getInstance().addImage(value)
                node.setTexture(texture);
            }, this);

            if (cc.CanvasEditor.isEditor)
                cc.CanvasEditor._setUserDataItem(node, this.getClassName(), "file", value)
        }
    }
})

cc.CanvasEditor._parser["CCParticleSystem"] = new cc.CanvasEditor.CCParticleSystemParser();