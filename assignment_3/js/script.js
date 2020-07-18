function Dog(name) {
  this.name = name;
  console.log(this);
}

Dog.prototype.bark = function () {
      console.log(this);
  console.log(this.name + " likes barking! Bark!");
}

var max = new Dog("Max", "Buddy");
max.bark();