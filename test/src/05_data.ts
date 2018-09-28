import * as tf from '@tensorflow/tfjs';

export interface iCoeff{
    a:number,
    b:number,
    c:number,
    d:number
}

export interface iGenData{
    xs:tf.Tensor<tf.Rank>,
    ys:tf.Tensor<tf.Rank>
}

export function generateData(numPoints:number, coeff:iCoeff, sigma:number = 0.04) {
  return tf.tidy(() => {
    let [a, b, c, d] = [
      tf.scalar(coeff.a), tf.scalar(coeff.b), tf.scalar(coeff.c),
      tf.scalar(coeff.d)
    ];

    let xs:tf.Tensor<tf.Rank> = tf.randomUniform([numPoints], -1, 1);

    // Generate polynomial data
    let three:tf.Tensor<tf.Rank.R0> = tf.scalar(3, 'int32');
    const ys = a.mul(xs.pow(three))
      .add(b.mul(xs.square()))
      .add(c.mul(xs))
      .add(d)
      // Add random noise to the generated data
      // to make the problem a bit more interesting
      .add(tf.randomNormal([numPoints], 0, sigma));

    // Normalize the y values to the range 0 to 1.
    //let ymin:tf.Tensor<tf.Rank> = ys.min();
    //let ymax:tf.Tensor<tf.Rank> = ys.max();
    //let yrange:tf.Tensor<tf.Rank> = ymax.sub(ymin);
    //let ysNormalized:tf.Tensor<tf.Rank> = ys.sub(ymin).div(yrange);
   
    console.log('ys='+ys);
   // console.log('ys_normal='+ysNormalized);
    return  {xs:xs, ys: ys};
  })
}