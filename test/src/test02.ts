//Tensors

import * as tf from '@tensorflow/tfjs';
// Load the binding:
//import  '@tensorflow/tfjs-node';

//require('@tensorflow/tfjs-node');
import  '@tensorflow/tfjs-node';// Use '@tensorflow/tfjs-node-gpu' if running with GPU.


let shape:number[] =[2,3];// 2 rows, 3 columns  2x3 Tensor

let a:tf.Tensor<tf.Rank>=tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // print Tensor values

let b :tf.Tensor<tf.Rank>= tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
