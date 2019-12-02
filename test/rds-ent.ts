import { Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { InstanceType, InstanceClass, InstanceSize } from '@aws-cdk/aws-ec2';
import { DatabaseInstanceEngine } from '@aws-cdk/aws-rds';
import { AcmeDatabaseInstance, AcmeStack } from '../lib';

export class RDSEnterpriseStack extends AcmeStack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, { ...props, costTag: 'C-1234' });

    const db = new AcmeDatabaseInstance(this, 'Database', {
      vpc: this.companyVPC(),
      allocatedStorage: 5,
      engine: DatabaseInstanceEngine.POSTGRES,
      masterUsername: 'demo',
      instanceClass: InstanceType.of(InstanceClass.T3, InstanceSize.MEDIUM),
    });

    new CfnOutput(this, 'DBHost', { value: db.dbInstanceEndpointAddress });
  }
}
