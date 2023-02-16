import { HttpException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { createWriteStream } from 'fs';

import { S3ReadStream } from 's3-readstream';

@Injectable()
export class FileUploadService {
  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });
  provider = {
    s3: this.s3_upload,
    localStorage: this.uploadLocalFile,
  };

  // file stream
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

  // upload file
  async uploadFile(file: Express.Multer.File) {
    const { originalname } = file;

    return this.provider[process.env.FILE_PROVIDER](
      file.buffer,
      originalname,
      file.mimetype,
    );
  }

  async uploadLocalFile(
    file: Express.Multer.File['buffer'],
    originalname: string,
  ) {
    const filteredName = originalname.replace(/\s+/g, '');
    const filename = `${uuid.v4()}_${filteredName}`;

    const ws = createWriteStream(`./files/${filename}`);
    ws.write(file);

    return {
      Key: filename,
      Location: `${process.env.API_URL}/files/${filename}`,
    };
  }

  // s3 upload file
  async s3_upload(
    file: Express.Multer.File['buffer'],
    name: string,
    mimetype: string,
  ) {
    const filteredName = name.replace(/\s+/g, '');
    const bucket = this.AWS_S3_BUCKET;

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
