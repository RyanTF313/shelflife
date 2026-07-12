import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { dirname, join } from 'path';

const WIDGET_SCRIPT_PATH = join(
  dirname(require.resolve('@shelflife/widget/package.json')),
  'widget.js',
);

@Controller()
export class WidgetScriptController {
  @Get('widget.js')
  serve(@Res() res: Response) {
    res.type('application/javascript').sendFile(WIDGET_SCRIPT_PATH);
  }
}
