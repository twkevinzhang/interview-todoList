import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['graph/**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.schema.ts'),
  outputAs: 'class',
  customScalarTypeMapping: {
    Upload: 'Promise<FileUpload>',
  },
  additionalHeader: "import { FileUpload } from 'graphql-upload';",
});
