import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import { Vpc, InstanceType, InstanceClass, InstanceSize } from '@aws-cdk/aws-ec2';
import { DatabaseInstance, DatabaseInstanceEngine } from '@aws-cdk/aws-rds';

export class RDSStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'VPC');

    const db = new DatabaseInstance(this, 'Database', {
      vpc,
      allocatedStorage: 5,
      engine: DatabaseInstanceEngine.POSTGRES,
      masterUsername: 'demo',
      instanceClass: InstanceType.of(InstanceClass.T3, InstanceSize.MEDIUM),
    });

    new CfnOutput(this, 'DBHost', { value: db.dbInstanceEndpointAddress });
  }
}
