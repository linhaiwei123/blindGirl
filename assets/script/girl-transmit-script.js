cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
         cc.find('Canvas').on('girl-move',this.onGirlMove,this);
    },

    onGirlMove: function(e){
        this.node.position = e.detail;
    }

    

});
