"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tf = require("@tensorflow/tfjs");
// Load the binding:
//import  '@tensorflow/tfjs-node';
require("@tensorflow/tfjs-node"); // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
const initialValues = tf.zeros([5]);
const biases = tf.variable(initialValues); // initialize biases
biases.print(); // output: [0, 0, 0, 0, 0]
const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
biases.assign(updatedValues); // update values of biases
biases.print(); // output: [0, 1, 0, 1, 0]
//# sourceMappingURL=02_Variables.js.map