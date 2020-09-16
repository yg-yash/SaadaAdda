export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: 'ap-south-1',
    BUCKET: 'saddaadda-bucket-temp-not-in-use',
  },
  apiGateway: {
    REGION: 'us-east-1',
    URL: 'https://fzfm0w2wo2.execute-api.ap-south-1.amazonaws.com/dev/v1',
  },
  cognito: {
    REGION: 'ap-south-1',
    USER_POOL_ID: 'ap-south-1_4wU4diH7v',
    APP_CLIENT_ID: '41b9luqgqrd0q6vqme4f8jtt4m',
    IDENTITY_POOL_ID: 'ap-south-1:e6fdfdc5-638e-402d-9020-b4a07af09d80',
  },
};
