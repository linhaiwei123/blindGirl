let GateEnum = cc.Enum({
    yellow: -1,
    blue: -1,
});
cc.Class({
    extends: cc.Component,

    properties: {
        gate: {
            default: GateEnum.yellow,
            type: GateEnum,
        },
        _gap: false,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.find('Canvas').on('girl-touch',this.onGirlTouch,this)
    },

    onGirlTouch: function(e){
        if(this.gate != e.detail){
            this._gap = true;
            cc.find('Canvas').emit('girl-move',this.node.position);
        }
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'girl' && !this._gap){
            cc.find('Canvas').emit('girl-touch',this.gate);
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'girl'){
            this._gap = false;
        }
    }

    

});
