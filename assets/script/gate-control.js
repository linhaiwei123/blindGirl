cc.Class({
    extends: cc.Component,

    properties: {
        _distance: {
            get: function(){
                return this.node.getChildByName('player-mask').width / 2;
            }
        },

        blueGatePrefab: cc.Prefab,
        yellowGatePrefab: cc.Prefab,

        _blueGate: null,
        _yellowGate: null,
    },

    onLoad: function () {
        this.initGate();
        cc.find('Canvas').on('mousedown',this.onMouseDown,this);
    },

    initGate: function(){
        this._blueGate = cc.instantiate(this.blueGatePrefab);
        this._yellowGate = cc.instantiate(this.yellowGatePrefab);

        this._blueGate.parent = this.node.parent;
        this._yellowGate.parent = this.node.parent;

        this._blueGate.position = this.node.position;
        this._yellowGate.position = this.node.position;
    },

    onMouseDown: function(e){
        if(this.checkDistance(e)){
            switch(e.getButton()){
                case 0: this.onLeftBtn(e);break;
                case 2: this.onRightBtn(e);break;
            }
        }
    },

    onLeftBtn: function(e){
        //blue Gate
        this._blueGate.position = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    },

    onRightBtn: function(e){
        //yello Gate
        this._yellowGate.position = this.node.parent.convertToNodeSpaceAR(e.getLocation());
    },

    checkDistance: function(e){
        let distance = this.node.convertToNodeSpaceAR(e.getLocation()).mag();
        return this._distance >= distance ? true : false;
    }

});