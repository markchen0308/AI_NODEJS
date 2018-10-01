import * as tf from '@tensorflow/tfjs';
// Load the binding:
//import '@tensorflow/tfjs-node';// Use '@tensorflow/tfjs-node-gpu' if running with GPU.

import  '@tensorflow/tfjs-node-gpu' ;
import {generateData,iCoeff,iGenData} from './05_data';

// Step 1. Set up variables, these are the things we want the model
// to learn in order to do prediction accurately. We will initialize
// them with random values.
let a = tf.variable(tf.scalar(Math.random()));
let b = tf.variable(tf.scalar(Math.random()));
let c = tf.variable(tf.scalar(Math.random()));
let d = tf.variable(tf.scalar(Math.random()));

// Step 2. Create an optimizer, we will use this later. You can play
// with some of these values to see how the model performs.
const numIterations:number = 10000;
const learningRate:number = 0.01;
const stepShow:number=100;
const optimizer:tf.SGDOptimizer = tf.train.sgd(learningRate);

// Step 3. Write our training process functions.

/*
 * This function represents our 'model'. Given an input 'x' it will try and
 * predict the appropriate output 'y'.
 *
 * It is also sometimes referred to as the 'forward' step of our training
 * process. Though we will use the same function for predictions later.
 *
 * @return number predicted y value
 */
function predict(x:tf.Tensor<tf.Rank>):tf.Tensor<tf.Rank> {
    // y = a * x ^ 3 + b * x ^ 2 + c * x + d
    return tf.tidy(() => {
      let yVal=a.mul(x.pow(tf.scalar(3, 'int32')))
      .add(b.mul(x.square()))
      .add(c.mul(x))
      .add(d);
      return yVal;


    });
  }


/*
 * This will tell us how good the 'prediction' is given what we actually
 * expected.
 *
 * prediction is a tensor with our predicted y values.
 * labels is a tensor with the y values the model should have predicted.
 */
function loss(prediction:tf.Tensor<tf.Rank> , labels:tf.Tensor<tf.Rank>):tf.Tensor<tf.Rank.R0> {
    // Having a good error function is key for training a machine learning model
    const error:tf.Tensor<tf.Rank.R0>  = prediction.sub(labels).square().mean();
   
    return error;
  }
  

/*
 * This will iteratively train our model.
 *
 * xs - training data x values
 * ys — training data y values
 */
async function train(xs:tf.Tensor<tf.Rank>, ys:tf.Tensor<tf.Rank>, numIterations:number) {
    for (let iter = 0; iter <= numIterations; iter++) {
      // optimizer.minimize is where the training happens.
  
      // The function it takes must return a numerical estimate (i.e. loss)
      // of how well we are doing using the current state of
      // the variables we created at the start.
  
      // This optimizer does the 'backward' step of our training process
      // updating variables defined previously in order to minimize the
      // loss.
      optimizer.minimize(() => {
        // Feed the examples into the model
        const pred:tf.Tensor<tf.Rank> = predict(xs);

        //let ymin:tf.Tensor<tf.Rank> = pred.min();
        //let ymax:tf.Tensor<tf.Rank> = pred.max();
        //let yrange:tf.Tensor<tf.Rank> = ymax.sub(ymin);
        //let ysNormalized:tf.Tensor<tf.Rank> = pred.sub(ymin).div(yrange);
        
        let lossValue=loss(pred, ys);
        if((iter%stepShow)==0)
        {
          console.log('iter='+iter +'; loss='+lossValue.dataSync()[0]);
          console.log('a='+a.dataSync()[0]);
          console.log('b='+b.dataSync()[0]);
          console.log('c='+c.dataSync()[0]);
          console.log('d='+d.dataSync()[0]);
        }
        return lossValue;
      });
      
      // Use tf.nextFrame to not block the browser.
      await tf.nextFrame();
    }
  }
  

  async function learnCoefficients() {
    let trueCoefficients:iCoeff = {a: 8, b:100, c: .9, d: .5};
    let trainingData = generateData(100, trueCoefficients);
  
    // Plot original data
    //renderCoefficients('#data .coeff', trueCoefficients);
    //await plotData('#data .plot', trainingData.xs, trainingData.ys)
  
    // See what the predictions look like with random coefficients
    /*
    renderCoefficients('#random .coeff', {
      a: a.dataSync()[0],
      b: b.dataSync()[0],
      c: c.dataSync()[0],
      d: d.dataSync()[0],
    });*/
    
    const predictionsBefore = predict(trainingData.xs);
    /*
    await plotDataAndPredictions(
        '#random .plot', trainingData.xs, trainingData.ys, predictionsBefore);
  */
    // Train the model!
    await train(trainingData.xs, trainingData.ys, numIterations);
  /*
    // See what the final results predictions are after training.
    renderCoefficients('#trained .coeff', {
      a: a.dataSync()[0],
      b: b.dataSync()[0],
      c: c.dataSync()[0],
      d: d.dataSync()[0],
    });

    
    */


    const predictionsAfter = predict(trainingData.xs);
    /*
    await plotDataAndPredictions(
        '#trained .plot', trainingData.xs, trainingData.ys, predictionsAfter);
  */
    predictionsBefore.dispose();
    predictionsAfter.dispose();
  }
  
  
  learnCoefficients();

