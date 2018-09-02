const AV = require('../utils/av-weapp-min');

class Check extends AV.Object {
    get checkType(){
        return this.get('checkType');
    }
    set checkType(value){
        this.set('checkType', value);
    }

    get timestamp(){
        return this.get('timestamp');
    }
    set timestamp(value){
        this.set('timestamp', value)
    }

    get location(){
        return this.get('location')
    }
    set location(value){
        this.set('location', value)
    }

    get address(){
        return this.get('address')
    }
    set address(value){
        this.set('address', value)
    }

    get user(){
        return this.get('user')
    }
    set user(value){
        this.set('user', value)
    }

    get geo(){
        return this.get('geo')
    }
    set geo(value){
        this.set('geo', value)
    }

}

AV.Object.register(Check, 'Check');
module.exports = Check;