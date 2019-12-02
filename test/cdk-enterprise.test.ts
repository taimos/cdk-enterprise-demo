import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert';
import { EC2Stack } from './ec2';
import { App } from '@aws-cdk/core';
import { RDSStack } from './rds';
import { S3Stack } from './s3';
import { EC2EnterpriseStack } from './ec2-ent';
import { RDSEnterpriseStack } from './rds-ent';
import { env } from 'process';
import { writeFileSync } from 'fs';
import { S3EnterpriseStack } from './s3-ent';

env.CDK_DEFAULT_ACCOUNT = '123456789012';
env.CDK_DEFAULT_REGION = 'eu-central-1';

test('Instance Created', () => {
  const app = new App();
  const stack = new EC2Stack(app, 'dvc13-ec2', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-ec2.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::EC2::Instance"));
});

test('DB Created', () => {
  const app = new App();
  const stack = new RDSStack(app, 'dvc13-rds', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-rds.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::RDS::DBInstance"));
});

test('Bucket Created', () => {
  const app = new App();
  const stack = new S3Stack(app, 'dvc13-s3', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-s3.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::S3::Bucket"));
});

test('Enterprise Instance Created', () => {
  const app = new App();
  const stack = new EC2EnterpriseStack(app, 'dvc13-ec2-ent', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-ec2-ent.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::EC2::Instance"));
});

test('Enterprise DB Created', () => {
  const app = new App();
  const stack = new RDSEnterpriseStack(app, 'dvc13-rds-ent', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-rds-ent.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::RDS::DBInstance"));
});

test('Enterprise Bucket Created', () => {
  const app = new App();
  const stack = new S3EnterpriseStack(app, 'dvc13-s3-ent', {env: {account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION}});
  writeFileSync('cdk.out/dvc13-s3-ent.yaml', JSON.stringify(SynthUtils.toCloudFormation(stack), null, 2));
  expectCDK(stack).to(haveResource("AWS::S3::Bucket"));
});