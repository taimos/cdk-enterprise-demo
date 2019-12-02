import {
    Bucket, BlockPublicAccess, BucketEncryption,
    BucketProps, BucketAccessControl
} from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export class AcmeBucket extends Bucket {

    constructor(scope: Construct, id: string, props?: BucketProps) {
        super(scope, id, {
            ...props,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            encryption: BucketEncryption.KMS_MANAGED,
            publicReadAccess: false,
            accessControl: BucketAccessControl.PRIVATE,
        });
    }

}
