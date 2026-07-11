import { SetMetadata } from '@nestjs/common';

export const TIMEOUT_MS_KEY = 'timeoutMs';

export const Timeout = (ms: number) => SetMetadata(TIMEOUT_MS_KEY, ms);
