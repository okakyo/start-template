import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema  } from 'zod';
import * as v from "valibot";
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}

// export class ValibotValidationPipe implements PipeTransform {
//   constructor(private schema: v.BaseSchema) {}

//   const pipe = v.pipe()
//   transform(value: unknown) {
//     try {
//       const parsedValue = this.schema.parse(value);
//       return parsedValue;
//     } catch (error) {
//       throw new BadRequestException('Validation failed');
//     }
//   }
// }
