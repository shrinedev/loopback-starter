import {
  post,
  RestBindings,
  Request,
  Response,
  HttpErrors
} from '@loopback/rest';
import { inject } from '@loopback/core';
import upload from '../FileUploader';

export class AdminImageUploadController {
  constructor(
    @inject(RestBindings.Http.REQUEST)
    public request: Request,
    @inject(RestBindings.Http.RESPONSE)
    public response: Response
  ) {}

  @post('/api/v1/image-upload')
  async uploadImage(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      upload.single('image')(this.request, this.response, err => {
        if (err) {
          reject(
            new HttpErrors.UnprocessableEntity(
              'Image upload error: ' + err.message
            )
          );
          return;
        }

        // @ts-ignore location gets added by upload function.
        if (!this.request.file || !this.request.file.location) {
          reject(new HttpErrors.UnprocessableEntity('Image upload error'));
          return;
        }

        resolve({
          // @ts-ignore location gets added by upload function.
          url: this.request.file.location
        });
      });
    });
  }
}
