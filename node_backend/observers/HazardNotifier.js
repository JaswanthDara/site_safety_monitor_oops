class HazardNotifier {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(hazard) {
    this.observers.forEach((observer) => {
      observer.update(hazard);
    });
  }
}

module.exports = new HazardNotifier(); 
