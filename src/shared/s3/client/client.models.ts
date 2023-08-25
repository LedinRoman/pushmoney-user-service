export type Region = 'us-east-1' |
'us-west-1' |
'us-west-2' |
'eu-west-1' |
'eu-central-1' |
'ap-southeast-1' |
'ap-northeast-1' |
'ap-southeast-2' |
'sa-east-1' |
'cn-north-1' |
string;

export interface IS3Options {
  endPoint: string;
  accessKey: string;
  secretKey: string;
  region: Region;
}
