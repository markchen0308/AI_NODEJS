//Tensors

import * as tf from '@tensorflow/tfjs';
// Load the binding:
//import  '@tensorflow/tfjs-node';

import  '@tensorflow/tfjs-node';// Use '@tensorflow/tfjs-node-gpu' if running with GPU.


let shape:number[] =[2,3];// 2 rows, 3 columns  2x3 Tensor

let a:tf.Tensor<tf.Rank>=tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // print Tensor values

let b :tf.Tensor<tf.Rank>= tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();

let c:tf.Tensor<tf.Rank.R2> = tf.tensor2d([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
c.print();

tf.scalar(3.14).print();
tf.tensor1d([1, 2, 3]).print();
tf.tensor2d([[1, 2], [3, 4]]).print();
tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();

console.log('3x5 zeros');
tf.zeros([3, 5]).print();

console.log('2x2 ones');
tf.ones([2, 2]).print();

console.log('range');//tf.range (start, stop, step?, dtype?) 
tf.range(0, 9, 2).print();

// Create a buffer and set values at particular indices.
console.log('buffer');
const buffer = tf.buffer([2, 2]);//create 2x2 matrix
buffer.set(3, 0, 0);
buffer.set(5, 1, 0);
// Convert the buffer back to a tensor.
buffer.toTensor().print();

console.log('complex');//tf.complex (real, imag)
const real = tf.tensor1d([2.25, 3.25]);
const imag = tf.tensor1d([4.75, 5.75]);
const complex = tf.complex(real, imag);
complex.print();

console.log('get real part and imag part');
let comp = tf.complex([-2.25, 3.25], [4.75, 5.75]);
tf.real(comp).print();
tf.imag(comp).print();




console.log('clone');
const x = tf.tensor([1, 2]);
let y=x.clone();
y.print();

console.log('fill');//tf.fill (shape, value, dtype?) 
tf.fill([2, 2], 4).print();


console.log('linespace');//tf.linspace (start, stop, num)
tf.linspace(0, 9, 10).print();

console.log('onehot');//tf.oneHot (indices, depth, onValue?, offValue?)
tf.oneHot(tf.tensor1d([0, 1,2], 'int32'), 5).print();

console.log('truncatedNormal');//tf.truncatedNormal (shape, mean?, stdDev?, dtype?, seed?)
tf.truncatedNormal([2, 2]).print();