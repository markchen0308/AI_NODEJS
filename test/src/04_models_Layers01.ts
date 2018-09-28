import * as tf from '@tensorflow/tfjs';
// Load the binding:
//import  '@tensorflow/tfjs-node';

import '@tensorflow/tfjs-node';// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
import { Rank } from '@tensorflow/tfjs';



// Define function
function predict(input): tf.Tensor<Rank> {
  // y = a * x ^ 2 + b * x + c
  // More on tf.tidy in the next section
  return tf.tidy(() => {
    let x: tf.Tensor<Rank.R0> = tf.scalar(input);
    let ax2: tf.Tensor<Rank> = a.mul(x.square());
    let bx: tf.Tensor<Rank> = b.mul(x);
    let y : tf.Tensor<Rank>= ax2.add(bx).add(c);

    return y;
  });
}

// Define constants: y = 2x^2 + 4x + 8
let a: tf.Tensor<Rank.R0> = tf.scalar(2);
let b :tf.Tensor<Rank.R0> = tf.scalar(4);
let c: tf.Tensor<Rank.R0> = tf.scalar(8);

// Predict output for input of 2
let result: tf.Tensor<Rank> = predict(2);
result.print() // Output: 24ts-node 








