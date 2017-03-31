cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'girl'){
            cc.find('Canvas').emit('girl-touch-out');   
        }
    },
});
