import { Stack, Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import {
  Vpc, Instance, InstanceType, InstanceClass, InstanceSize,
  AmazonLinuxImage, AmazonLinuxGeneration
} from '@aws-cdk/aws-ec2';

export class EC2Stack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'VPC');

    const instance = new Instance(this, 'Instance', {
      vpc,
      availabilityZone: vpc.availabilityZones[0],
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      machineImage: new AmazonLinuxImage({ generation: AmazonLinuxGeneration.AMAZON_LINUX_2 }),
    });

    new CfnOutput(this, 'InstanceId', { value: instance.instanceId });
  }
}
