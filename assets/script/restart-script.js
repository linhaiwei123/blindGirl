cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
    },

    
    onLoad: function () {
        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('main-scene');
        }
    }

});
