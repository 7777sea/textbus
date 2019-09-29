import { ButtonHandlerOption, HandlerType } from '../toolbar/help';
import { InlineFormatter } from '../frame/fomatter/inline-formatter';

export const italicHandler: ButtonHandlerOption = {
  type: HandlerType.Button,
  classes: ['tanbo-editor-icon-italic'],
  tooltip: '斜体',
  match: {
    tags: ['EM', 'I']
  },
  execCommand: new InlineFormatter('em')
};
