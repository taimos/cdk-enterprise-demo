import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { Bucket } from '@aws-cdk/aws-s3';

export class S3Stack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Bucket');

    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}
