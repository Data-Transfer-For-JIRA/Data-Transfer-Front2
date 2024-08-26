import { Quill } from "react-quill-new";
import {BlockEmbed} from 'quill/blots/block'; // Quill에서 직접 임포트

class DividerBlot extends BlockEmbed {
  static blotName = 'divider';
  static tagName = 'hr';

  static create(): HTMLElement {
    const node = super.create() as HTMLElement;
    node.setAttribute('data-divider', 'true');
    return node;
  }
  
}

Quill.register(DividerBlot); // Quill에 블롯을 등록

export default DividerBlot;
