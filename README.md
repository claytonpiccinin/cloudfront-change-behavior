# Cloud Front Change Behavior

Using the power of Lambda@Edge to change CloudFront Behavior.

## Overview
___

This project is used to support routes in VueJS, React or Angular applications by changing the CloudFront behavior. It's intercept the request from 
CloudFront to Amazon S3 to change the request URI.

Hosting applications like VueJS, React or Angular in S3 bucket, you have no routes inside "dist" directory to serve web clients. You can use the porwer of Lambda@Edge functions to solve it, instead of create a infrastrucure to provide Server Side Rendering. It'll optimze infrastruture cost without performance loss.

## Test Usage 

```
sls invoke local -f changeBehavior -p test/data.json
```

## Production usage

Change serverless.yml file according to your AWS infrastrucutre.

```
sls deploy --stage production
```

After deploy, you should change CloudFront behavior to use your lambda function.