cc.Class({
    extends: cc.Component,

    properties: {
        _left: false,
        _right: false,
        _up: false,
        _down: false,

        _leftBlock: 0,
        _rightBlock: 0,
        _upBlock: 0,
        _downBlock: 0,

        moveSpeed: 5,
    },

    onLoad: function () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.systemEvent.on('keydown',this.onKeyDown,this);
        cc.systemEvent.on('keyup',this.onKeyUp,this);
    },

    onKeyDown: function(e){
        switch(e.keyCode){
            case cc.KEY.w: {this._up = true;break;}
            case cc.KEY.s: {this._down = true;break;}
            case cc.KEY.a: {this._left = true;break;}
            case cc.KEY.d: {this._right = true;break;}
        }
    },  

    onKeyUp: function(e){
          switch(e.keyCode){
            case cc.KEY.w: {this._up = false;break;}
            case cc.KEY.s: {this._down = false;break;}
            case cc.KEY.a: {this._left = false;break;}
            case cc.KEY.d: {this._right = false;break;}
        }
    },

    onCollisionEnter: function(other,self){
        if(other.node.group == 'wall'){
            let localBlock = [];
            
            let selfAabb = self.world.aabb;
            let otherAabb = other.world.aabb;
            let selfPreAabb = self.world.preAabb;
            let otherPreAabb = other.world.preAabb;

            if(selfPreAabb.xMin >= otherPreAabb.xMax && selfAabb.xMin <= otherAabb.xMax){
                //left block
                this.node.x = this.node.x + Math.abs(selfAabb.xMin - otherAabb.xMax);
                localBlock.push("_leftBlock");
                this._leftBlock++;
            }
            if(selfPreAabb.xMax <= otherPreAabb.xMin && selfAabb.xMax >= otherAabb.xMin){
                //right block
                this.node.x = this.node.x - Math.abs(selfAabb.xMax - otherAabb.xMin);
                localBlock.push("_rightBlock");
                this._rightBlock++;
            }
            if(selfPreAabb.yMin >= otherPreAabb.yMax && selfAabb.yMin <= otherAabb.yMax){
                //down block
                this.node.y = this.node.y + Math.abs(selfAabb.yMin - otherAabb.yMax);
                localBlock.push("_downBlock");
                this._downBlock++;
            }
            if(selfPreAabb.yMax <= otherPreAabb.yMin && selfAabb.yMax >= otherAabb.yMin){
                //up block
                this.node.y = this.node.y - Math.abs(selfAabb.yMax - otherAabb.yMin);
                localBlock.push("_upBlock");
                this._upBlock++;
            }

            if(other.blockArray == undefined){
                other.blockArray =[];
            }

            other.blockArray[self.node.uuid] = localBlock;
        }
    },

    onCollisionExit: function(other,self){
        if(other.node.group == 'wall'){
            if(other.blockArray != undefined){
                for(let item of other.blockArray[self.node.uuid]){
                    this[item]--;
                }
            }
            
        }
    },

    update: function(dt){
        if(this._left && !this._leftBlock){this.node.x -= this.moveSpeed}
        if(this._right && !this._rightBlock){this.node.x += this.moveSpeed}
        if(this._up && !this._upBlock){this.node.y += this.moveSpeed}
        if(this._down && !this._downBlock){this.node.y -= this.moveSpeed}
    }

});
