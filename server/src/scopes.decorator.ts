import { SetMetadata } from '@nestjs/common';

export const Scopes = (...args: string[]) => SetMetadata('scopes', args);
