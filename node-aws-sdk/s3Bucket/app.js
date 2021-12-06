const AWS = require('aws-sdk')
// process.env.AWS_ACCESS_KEY_ID="AKIAZTPPCW5KXU747N6U";
// process.env.AWS_SECRET_ACCESS_KEY = "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"


// AWS.config.update({ credentials: {
//     accessKeyId: "AKIAZTPPCW5KXU747N6U",
//     secretAccessKey: "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",
// }});

console.log(AWS.config);
const s3 = new AWS.S3();
async function app() {
    try {
        await s3.listBuckets(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
    }
    catch (e) {
        console.log("Error 1 ", e);
    }
    try {
        await s3.createBucket({ Bucket: 'node-sdk-sample-4b418112-d015-4200-9f82-d6ed3ad9470b' }).promise();

    }
    catch (e) {
        console.log("Error 2 ", e);
    }

    await s3.putObject({ Bucket: 'node-sdk-sample-4b418112-d015-4200-9f82-d6ed3ad9470b', Key: 'my-key', Body: 'Hello World! BY DPS' }).promise();
    await s3.getObject({ Bucket: 'node-sdk-sample-4b418112-d015-4200-9f82-d6ed3ad9470b', Key: 'my-key' }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data.Body.toString());
        }
    });
    await s3.deleteObjects({ Bucket: 'node-sdk-sample-4b418112-d015-4200-9f82-d6ed3ad9470b', Delete: { Objects: [{ Key: 'my-key' }] } }, function (err, data) {
        if (err) {
            console.log("36", err);
        }
	console.log(data," deleted object message");
    });

    await s3.deleteBucket({ Bucket: 'node-sdk-sample-4b418112-d015-4200-9f82-d6ed3ad9470b', }, function (err, data) {
        if (err) {
	    //if bucket not empty throws error
            console.log("errrrrrrr", err);
        }
        else {
            console.log("ok", data);
        }
    });
}

app();
