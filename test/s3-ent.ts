import { Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { AcmeStack, AcmeBucket } from '../lib';

export class S3EnterpriseStack extends AcmeStack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, { ...props, costTag: 'C-1234' });

    const bucket = new AcmeBucket(this, 'Bucket');

    new CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}
