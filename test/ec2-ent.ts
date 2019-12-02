import { Construct, StackProps, CfnOutput } from '@aws-cdk/core';
import {
  Instance, InstanceType, InstanceClass, InstanceSize,
  AmazonLinuxImage, AmazonLinuxGeneration
} from '@aws-cdk/aws-ec2';
import { AcmeStack } from '../lib';

export class EC2EnterpriseStack extends AcmeStack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      ...props,
      costTag: 'C-1234',
    });

    const vpc = this.companyVPC();

    const instance = new Instance(this, 'Instance', {
      vpc,
      availabilityZone: vpc.availabilityZones[0],
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.NANO),
      machineImage: new AmazonLinuxImage({ generation: AmazonLinuxGeneration.AMAZON_LINUX_2 }),
    });

    new CfnOutput(this, 'InstanceId', { value: instance.instanceId });
  }
}
