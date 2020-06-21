import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItems from "../data/sidebar-nav-items";

let _store = {
  menuVisible: false,
  navItems: getSidebarNavItems()
};

class Store extends EventEmitter {
  constructor() {
    super();
    this.userData = {
      name: "",
      organization: "",
      email: ""
    }
    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  registerToActions(action) {
    switch (action.type) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      case "UPDATE_USER_DATA":
        this.updateUserData(action.newData);
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  getUserData(){
    return this.userData;
  }

  updateUserData(newData){
    this.userData = newData;
    this.emit('userDataChanged');
  }
}

const store = new Store();
window.store = store;
Dispatcher.register(store.registerToActions.bind(store));
window.dispatcher = Dispatcher;
export default store;
