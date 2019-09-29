import { Observable } from 'rxjs';

import { DropdownHandlerOption, Handler } from './help';
import { Matcher, MatchStatus } from '../matcher';
import { Dropdown } from './utils/dropdown';

export class DropdownHandler implements Handler {
  host: HTMLElement;
  matcher: Matcher;
  onAction: Observable<any>;
  private dropdownButton = document.createElement('button');
  private dropdown: Dropdown;

  constructor(private handler: DropdownHandlerOption) {
    this.onAction = handler.onHide;

    this.matcher = new Matcher(handler.match);
    this.dropdownButton.type = 'button';
    this.dropdownButton.title = (handler.tooltip === null || handler.tooltip === undefined) ? '' : handler.tooltip;
    this.dropdownButton.innerText = (handler.label === null || handler.label === undefined) ? '' : handler.label;

    this.dropdownButton.classList.add('tanbo-editor-handler', ...(handler.classes || []));
    this.dropdown = new Dropdown(this.dropdownButton, handler.viewer.host, handler.onHide);
    this.host = this.dropdown.host;
  }

  updateStatus(status: MatchStatus): void {
    if (status.inContainer) {
      this.dropdownButton.classList.add('tanbo-editor-handler-active');
      this.handler.viewer.updateStateByElement(status.container as HTMLElement);
      this.dropdown.open();
    } else {
      this.dropdownButton.classList.remove('tanbo-editor-handler-active');
    }
  }
}
