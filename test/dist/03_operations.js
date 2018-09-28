"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs");
// Load the binding:
//import  '@tensorflow/tfjs-node';
require("@tensorflow/tfjs-node"); // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
let d = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
let d_squared = d.square();
d_squared.print();
let e = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
let f = tf.tensor2d([[5.0, 6.0], [7.0, 8.0]]);
let e_plus_f = e.add(f);
e_plus_f.print();
let sq_sum1 = e.add(f).square();
sq_sum1.print();
// Output: [[36 , 64 ],
//          [100, 144]]
// All operations are also exposed as functions in the main namespace,
// so you could also do the following:
tf.square(tf.add(e, f)).print();
//# sourceMappingURL=03_operations.js.map