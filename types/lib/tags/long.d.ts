import BaseTag from '../base_tag.d';

declare class TAGLong extends BaseTag {
  getValue(): bigint;
  setValue(value: string | bigint | number): void;
}

export = TAGLong;
