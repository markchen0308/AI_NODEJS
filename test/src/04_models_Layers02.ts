import * as tf from '@tensorflow/tfjs';
// Load the binding:
//import  '@tensorflow/tfjs-node';

import '@tensorflow/tfjs-node';// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
import { Rank, Callback } from '@tensorflow/tfjs';
import { DenseLayerConfig } from '@tensorflow/tfjs-layers/dist/layers/core';

/*
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

*/







/*
//another high-level way to  create layer
const model = tf.sequential();
model.add(
  tf.layers.simpleRNN({
    units: 20,
    recurrentInitializer: 'GlorotNormal',
    inputShape: [80, 4]
  })
);

const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({optimizer, loss: 'categoricalCrossentropy'});
model.fit({x: data, y: labels});

*/

//Dummy training data
const x_train = tf.tensor([
  [0.1, 0.5, 0.1],
  [0.9, 0.3, 0.4],
  [0.4, 0.5, 0.5],
  [0.7, 0.1, 0.9]
])


//Dummy training labels
const y_train = tf.tensor([
  [0.2, 0.8],
  [0.9, 0.10],
  [0.4, 0.6],
  [0.5, 0.5]
])

//Dummy testing data
const x_test = tf.tensor([
  [0.9, 0.1, 0.5]
])


//create a model entity
let model:tf.Sequential = tf.sequential();

//config for first layer
let config_hidden:DenseLayerConfig = {
  inputShape: [3],//3 input
  activation: 'sigmoid',//'elu' | 'hardSigmoid' | 'linear' | 'relu' | 'relu6' | 'selu' | 'sigmoid' | 'softmax' | 'softplus' | 'softsign' | 'tanh' 
  units: 4//4 neurons
}

//defining the hidden 
const hidden = tf.layers.dense(config_hidden);
//adding the hidden layer to model
model.add(hidden);

//config for second layer 
let config_output:DenseLayerConfig = {
  units: 2,//(2 output)
  activation: 'sigmoid'
}

//defining the second layer
const output = tf.layers.dense(config_output);
//adding the second layer to model
model.add(output);

//define learning rate
let learningRate:number = 0.1;

//define an optimizer
const optimize = tf.train.sgd(learningRate);

//config for model
const config:tf.ModelCompileConfig = {
  optimizer: optimize,
  loss: 'meanSquaredError'
}
//compiling the model
model.compile(config);
console.log('Model Successfully Compiled');




train_data().then(() => {
  console.log('Training is Complete');
  console.log('Predictions :');
  let result: tf.Tensor<tf.Rank> = <tf.Tensor<tf.Rank>>model.predict(x_test);
  result.print();
})





async function train_data() {
  let bs = 10;
  let epo = 1000;

  for (let i = 0; i < 10; i++) {
    const res = await model.fit(x_train, y_train,
      {
        epochs: epo,
        batchSize: bs,
        callbacks: {
          onEpochEnd: async (epoch, log) => {

            console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          }
        }
      },
    );
    console.log(res.history.loss[0]);
  }
  /*
  
    for(let i=0;i<10;i++){
  
      let res=await model.fit(x_train, y_train, {
        epochs: epo,
        callbacks: {
          onEpochEnd: async (epoch, log) => {
            
            console.log(`Epoch ${epoch}: loss = ${log.loss}`);
          }
        }
      })
    }*/


  /*
    const res = await model.fit(x_train,y_train,{epochs: epo , batchSize:bs});
    //console.log(`Epoch ${res.epoch}: loss y= ${res.loss}`);
     console.log(res.history.loss[0]);
   
  */



}

