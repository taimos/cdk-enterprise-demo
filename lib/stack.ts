import { Stack, Construct, StackProps, Tag } from '@aws-cdk/core';
import { IVpc, Vpc } from '@aws-cdk/aws-ec2';

export interface AcmeStackProps extends StackProps {
  readonly costTag: string;
}

export class AcmeStack extends Stack {

  private vpc?: IVpc;

  constructor(scope: Construct, id: string, props: AcmeStackProps) {
    super(scope, id, { ...props, tags: { ...props.tags, COST: props.costTag } });
    Tag.add(this, 'COST', props.costTag);
  }

  companyVPC(): IVpc {
    if (!this.vpc) {
      this.vpc = Vpc.fromLookup(this, 'EnterpriseVPC', { vpcName: 'EnterpriseVPC' });
    }
    return this.vpc;
  }

}
