import {
    Bucket, BlockPublicAccess, BucketEncryption,
    BucketProps, BucketAccessControl
} from '@aws-cdk/aws-s3';
import { Construct } from '@aws-cdk/core';

export class AcmeBucket extends Bucket {

    constructor(scope: Construct, id: string, props?: BucketProps) {

        // Do not allow un-encrypted buckets
        if (props.encryption) {
            if (props.encryption == BucketEncryption.UNENCRYPTED) {
                throw new Error('You must encrypt your buckets.');
            }
        }

        super(scope, id, {
            ...props,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            encryption: props.encryption ? props.encryption : BucketEncryption.KMS_MANAGED,
            publicReadAccess: false,
            accessControl: BucketAccessControl.PRIVATE,
        });
    }

}
