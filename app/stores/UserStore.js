import {extendObservable} from 'mobx';

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: false,
            isLoggedIn: true,
            username: '',
            isAdmin: true
        })
    }
}

export default new UserStore();