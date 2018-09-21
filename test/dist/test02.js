"use strict";
//Tensors
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs");
// Load the binding:
//import  '@tensorflow/tfjs-node';
//require('@tensorflow/tfjs-node');
require("@tensorflow/tfjs-node"); // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
let shape = [2, 3]; // 2 rows, 3 columns  2x3 Tensor
let a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
a.print(); // print Tensor values
let b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
b.print();
//# sourceMappingURL=test02.js.map