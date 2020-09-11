import {
  Commander,
  InlineFormatter,
  FormatEffect,
  FormatAbstractData,
  CommandContext
} from '../../core/_api';
import { BlockComponent } from '../../components/block.component';

export class BoldCommander implements Commander<null> {
  recordHistory = true;

  constructor(private formatter: InlineFormatter) {
  }

  command(context: CommandContext): void {
    this.recordHistory = !context.selection.collapsed;
    if (!this.recordHistory) {
      return;
    }
    context.selection.ranges.forEach(range => {
      const componentContext = context.renderer.getContext(range.commonAncestorFragment, BlockComponent);
      const hasContext = componentContext && /h[1-6]/i.test(componentContext.tagName);
      const state = hasContext ?
        (context.overlap ? FormatEffect.Exclude : FormatEffect.Inherit) :
        (context.overlap ? FormatEffect.Invalid : FormatEffect.Valid)
      range.getSelectedScope().forEach(item => {
        item.fragment.apply(this.formatter, {
          state,
          startIndex: item.startIndex,
          endIndex: item.endIndex,
          abstractData: new FormatAbstractData({
            tag: 'strong'
          })
        });
      });
    });
  }
}