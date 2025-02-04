import { CustomScalar, Scalar } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Scalar('Upload')
export class UploadScalar implements CustomScalar<object, string> {
  description = 'Upload files';

  parseValue(value: Promise<FileUpload>): any {
    return GraphQLUpload.parseValue(value);
  }

  serialize(value: any): any {
    return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast): any {
    return GraphQLUpload.parseLiteral(ast, ast.value);
  }
}
