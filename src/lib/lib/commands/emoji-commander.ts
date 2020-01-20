import { Commander } from './commander';
import { TBSelection } from '../viewer/selection';

export class EmojiCommander implements Commander<string> {
  recordHistory = false;
  private value: string = '';

  updateValue(value: string): void {
    this.value = value;
  }

  command(selection: TBSelection): void {
    selection.ranges.forEach(range => {
      range.startFragment.insert(this.value, range.startIndex);
      range.startIndex = range.endIndex = range.startIndex + this.value.length;
    });
  }

  render(): null {
    return null;
  }
}