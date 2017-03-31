cc.Class({
    extends: cc.Component,

    properties: {
        initSpeed: cc.v2(0,0)
    },

    onLoad: function () {

    },

    update: function(dt){
        this.node.position = cc.pAdd(this.node.position,cc.pMult(this.initSpeed,dt));
    }

});
