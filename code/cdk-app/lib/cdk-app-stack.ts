import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 擬似パラメータインスタンス作成
    const pseudo = new cdk.ScopedAws(this);

    // IAMポリシー作成
    new iam.ManagedPolicy(this, "policy", {
      managedPolicyName: "iam-policy",
      statements: [
        new iam.PolicyStatement({
          sid: "testPolicy",
          effect: iam.Effect.ALLOW,
          actions: ["ec2:StartInstances"],
          resources: [
            `arn:${pseudo.partition}:ec2:${pseudo.region}:${pseudo.accountId}:instance/*`,
          ],
        }),
      ],
    });
  }
}
