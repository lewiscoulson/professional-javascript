// Object creation patterns





// Factory pattern
function createPerson( name , age , job ) {
	
	// create new object instance
	var o = new Object();
	
	// augment object instance with new properties
	o.name = name;
	o.age = age;
	o.job = job;

	o.sayName = function(){
		console.log( this.name );
	};

	// return object instance
	return o;

}

var person1 = createPerson( "Nicholas" , 29 , "Software Engineer" ),
	person2 = createPerson( "Greg" , 27 , "Doctor" );

console.log( person1 instanceof Object ); // true
console.log( person1 instanceof createPerson ); // false
console.log( person2 instanceof Object ); // true
console.log( person2 instanceof createPerson ); // false

// *NB - although this patterns solves the issue of creating multiple similar 
// objects, the disadvantage of using this pattern is that the type of object 
// created will always be a generic object. Instance.consstructer will always 
// point to the generic 'Object' Reference type.





// constructor pattern
function Person( name , age , job ){
	this.name = name;
	this.age = age;
	this.job = job;
	this.sayName = function() {
		console.log( this.name );
	};
}

var person1 = new Person( "Nicholas" , 29 , "Software Engineer" ),
	person2 = new Person( "Greg" , 27 , "Doctor" );

console.log( person1 instanceof Object ); // true
console.log( person1 instanceof Person ); // true
console.log( person2 instanceof Object ); // true
console.log( person2 instanceof Person ); // true

// *NB - using this pattern no object needs to be created explicitly.
// All properties and methods are assigned to 'this' which equates to 
// constructors instance object. A return statement is no longer 
// required. Objeccts instances using this patterns will be instances 
// of both the constructor and the generic 'Object' reference type.





// Prototype pattern
function Person() {

}

Person.prototype.name = "Lewis";
Person.prototype.age = 25;
Person.prototype.job = "Developer";
Person.prototype.sayName = function() {
	console.log( this.name );
};

var person1 = new Person();
person1.sayName();

var person2 = new Person();
person2.sayName();

console.log( person1.sayName == person2.sayName ); // true
console.log( Person.prototype.isPrototypeOf( person1 ) ); // true
console.log( Person.prototype.isPrototypeOf( person2 ) ); // true

person1.name = "Greg";

console.log( person1.hasOwnProperty("name") ); // true
console.log( person2.hasOwnProperty("name") ); // false

// create prototype with object literal
function Person() {

}

Person.prototype = {
	constructor : Person; // this would otherwise point to Object
	name : "Lewis";
	age : 25;
	job : "Developer";
	sayName : function() {
		console.log( this.name );
	};
};

// *NB - main issue with this pattern being that all properties are 
// shared between instances. The combination of the constructor and
// prototype pattern is needed to have both shared properties and
// instance specific ones.





// Combination constructor / prototype pattern
function Person( name , age , job ) {
	this.name = name;
	this.age = age;
	this.job = job;
	this.friends = ["bill","ben"];
}

Person.prototype = {
	constructor : Person,
	sayName : function() {
		console.log( this.name );
	};
};

var person1 = new Person( "Lewis" , 25 , "Developer" );
var person1 = new Person( "Greg" , 27 , "Doctor" );

person1.friends.push( "Van" );

console.log( person1.friends ); // bill , ben , van
console.log( person2.friends ); // bill , ben
console.log( person1.friends === person2.friends ); // false
console.log( person1.sayName === person2.sayName ); // true

// *NB - this is the most widely used pattern for creating custom
// reference types.





// Dynamaic prototype pattern
function Person( name , age , job ) {
	this.name = name;
	this.age = age;
	this.job = job;

	if ( typeof this.sayName != "function" ) {
		Person.prototype.sayName = function(){
			console.log( this.name );
		}
	}
}

// *NB - this pattern gives the benefit of removing the visual
// separation of constructor / prototype which may be confusing to
// developers coming from another language.





// Inheritance



// Prototype chaining pattern
function SuperType(){
	this.property = true;
}

SuperType.prototype.getSuperValue = function(){
	return this.property;
};

function SubType(){
	this.subproperty = false;
}

//inherit from SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
	return this.subproperty;
};

var instance = new SubType();

console.log(instance.getSuperValue()); //true

function SuperType(){
	this.colors = [“red”, “blue”, “green”];
}

function SubType(){
}

//inherit from SuperType
SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push(“black”);

console.log(instance1.colors); //”red,blue,green,black”

var instance2 = new SubType();
console.log(instance2.colors); //”red,blue,green,black”

// *NB - issue with this approach is instances will now
// share the constructors properites.




// Constructor stealing
function SuperType(){
	this.colors = [“red”, “blue”, “green”];
}

function SubType(){
	//inherit from SuperType
	SuperType.call(this);
}

var instance1 = new SubType();
instance1.colors.push(“black”);
console.log(instance1.colors); //”red,blue,green,black”

var instance2 = new SubType();
console.log(instance2.colors); //”red,blue,green”

function SuperType(name){
	this.name = name;
}

function SubType(){
	//inherit from SuperType passing in an argument
	SuperType.call(this, “Nicholas”);
	//instance property
	this.age = 29;
}

var instance = new SubType();
console.log(instance.name); //”Nicholas”;
console.log(instance.age); //29

// *NB - issue with this pattern is that methods must be
// defined in the constructor, so cannot benefit from
// code reuse.





// Combination inheritance
function SuperType(name){
	this.name = name;
	this.colors = [“red”, “blue”, “green”];
}

SuperType.prototype.sayName = function(){
	alert(this.name);
};

function SubType(name, age){
	//inherit properties
	SuperType.call(this, name);
	this.age = age;
}

//inherit methods
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
	alert(this.age);
};

var instance1 = new SubType(“Nicholas”, 29);
instance1.colors.push(“black”);
alert(instance1.colors); //”red,blue,green,black”
instance1.sayName(); //”Nicholas”;
instance1.sayAge(); //29

var instance2 = new SubType(“Greg”, 27);
alert(instance2.colors); //”red,blue,green”
instance2.sayName(); //”Greg”;
instance2.sayAge(); //27

// *NB - this is the most commonly used pattern by 
// Javascript developers.






// Prototypal inheritance

function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

var person = {
	name: “Nicholas”,
	friends: [“Shelby”, “Court”, “Van”]
};

var anotherPerson = object(person);
anotherPerson.name = “Greg”;
anotherPerson.friends.push(“Rob”);

var yetAnotherPerson = object(person);
yetAnotherPerson.name = “Linda”;
yetAnotherPerson.friends.push(“Barbie”);

alert(person.friends); //”Shelby,Court,Van,Rob,Barbie”

// *NB - this is handy when there is no need to create
// a constructor. note that properties wil be shared on
// prototype.




// Parasitic Inheritance

function createAnother(original){
	var clone = object(original); //create a new object by calling a function
	clone.sayHi = function(){ //augment the object in some way
		alert(“hi”);
	};
	return clone; //return the object
}

var person = {
	name: “Nicholas”,
	friends: [“Shelby”, “Court”, “Van”]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //”hi”

// *NB - this is good when concerned primarily with objects and not with 
// custom types and constructors.





// Parasitic Combination Inheritance

function inheritPrototype(subType, superType){
	var prototype = object(superType.prototype); //create object
	prototype.constructor = subType; //augment object
	subType.prototype = prototype; //assign object
}

function SuperType(name){
	this.name = name;
	this.colors = [“red”, “blue”, “green”];
}

SuperType.prototype.sayName = function(){
	alert(this.name);
};

function SubType(name, age){
	SuperType.call(this, name);
	this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function(){
	alert(this.age);
};

// *NB - this is considered the most optimal method of inheritance.
// This is more efficient than combination inheritance as the superType
// constructor now only gets called once.
