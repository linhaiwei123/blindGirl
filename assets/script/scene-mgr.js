cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
    },

    onLoad: function () {
        this.node.on('girl-touch-wall',this.onGirlTouchWall,this)
        this.node.on('girl-touch-out',this.onGirlTouchOut,this)
    },

    onGirlTouchWall: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('game-over-scene');
        }
    },
    
     onGirlTouchOut: function(){
        if(!this._sceneLoading){
            this._sceneLoading = true;
            cc.director.loadScene('win-scene');
        }
    }

});
