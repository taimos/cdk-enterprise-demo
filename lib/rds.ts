import { Construct } from '@aws-cdk/core';
import { DatabaseInstance, DatabaseInstanceProps } from '@aws-cdk/aws-rds';

export class AcmeDatabaseInstance extends DatabaseInstance {

  constructor(scope: Construct, id: string, props: DatabaseInstanceProps) {
    super(scope, id, {
      ...props,
      storageEncrypted: true,
    });
  }
}
