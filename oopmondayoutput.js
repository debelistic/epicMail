class Worker {
  /**
   * oop allows us make encapsulate our data, therefore we
   * we can interact with the app via this methods which are
   * functions in the class and properties which are passed into
   * the constructor
   */

  constructor(name, company, role) {
    this.name = name;
    this.company = company;
    this.role = role;
  }

  goToWork() {
    return `${this.name} works at ${this.company} as a${this.role} and goes to work by 8:00AM`;
  }

  goHome() {
    return `${this.name} is a${this.role} at ${this.company} he goes home by 4:00PM`;
  }
}

class SeniorStaff extends Worker {
  /**
   * oop allows for inheritance and polymorphism.
   * inheritance allows an object to inherit from another.
   * polymorphism allows the object to modify the methods
   * inherited from a superclass
   */

  constructor(name, company, role, entryTime, car, exitTime) {
    super(name, company, role);
    this.car = car;
    this.entryTime = entryTime;
    this.exitTime = exitTime;
  }

  goToWork() {
    return `${this.name} works at ${this.company} as a${this.role} and goes to work by ${this.entrytime}`;
  }

  goHome() {
    return `${this.name} leaves for home by ${this.exitTime}, he drives a ${this.car}`;
  }
}


const sade = new Worker('Sade', 'Mac', 'Secretary');
const frank = new SeniorStaff('Frank', 'Brox', '10:00AM', 'Jaguar');
console.log(sade.goToWork());
console.log(frank.goToWork());
console.log(frank.role());
