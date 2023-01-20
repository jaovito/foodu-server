import { HttpException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';

import { S3ReadStream } from 's3-readstream';

@Injectable()
export class FileUploadService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async createAWSStream(file_key: string): Promise<S3ReadStream> {
    return new Promise((resolve, reject) => {
      const bucketParams = {
        Bucket: this.AWS_S3_BUCKET,
        Key: file_key,
      };

      try {
        this.s3.headObject(bucketParams, (error, data) => {
          if (error) {
            throw error;
          }

          const options = {
            parameters: bucketParams,
            s3: this.s3,
            maxLength: data.ContentLength,
            byteRange: 1024 * 1024 * 5,
          };

          const stream = new S3ReadStream(options);

          resolve(stream);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const filteredName = name.replace(/\s+/g, '');

    const params = {
      Bucket: bucket,
      Key: String(`${uuid.v4()}_${filteredName}`),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response;
    } catch (e) {
      console.log(e);
      throw new HttpException('Error uploading file', 500);
    }
  }
}
