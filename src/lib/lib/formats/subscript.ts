import { ButtonHandler } from '../toolbar/help';
import { Editor } from '../editor/editor';

export const subscriptHandler: ButtonHandler = {
  type: 'button',
  classes: ['tanbo-editor-icon-subscript'],
  tooltip: '下标',
  match: {
    tags: ['SUB']
  },
  execCommand(editor: Editor): void {
    editor.contentDocument.execCommand('subscript');
  }
};
