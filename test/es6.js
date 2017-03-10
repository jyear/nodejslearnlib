//集合遍历
// var array = [1, 2, 3];
// //传统写法
// array.forEach(function (v, i, a) {
//     console.log(v);
// });
// //ES6
// array.forEach((v, i, a) => console.log(v));


//类的定义
// class Animal {
// 	//ES6中新型构造器
//     constructor(name) {
//         this.name = name;
//     }
//     //实例方法
//     sayName() {
//         console.log('My name is '+this.name);
//     }
// }
// //类的继承
// class Programmer extends Animal {
//     constructor(name) {
//     	//直接调用父类构造器进行初始化
//         super(name);
//     }
//     program() {
//         console.log("I'm coding...");
//     }
// }
// //测试我们的类
// var animal=new Animal('dummy'),
// wayou=new Programmer('wayou');
// animal.sayName();//输出 ‘My name is dummy’
// wayou.sayName();//输出 ‘My name is wayou’
// wayou.program();//输出 ‘I'm coding...’

// console.log(typeof animal);
// console.log(typeof wayou);


//数组解构
// var [x,y]=getVal(),//函数返回值的解构
//     [name,,age]=['wayou','male','secrect'];//数组解构

// function getVal() {
//     return [ 1, 2 ];
// }

// console.log('x:'+x+', y:'+y);//输出：x:1, y:2 
// console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect 

