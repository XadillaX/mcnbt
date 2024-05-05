'use strict';

const BaseTag = require('../base_tag');

const LONG_BOUND = {
  MIN: BigInt('-9223372036854775808'),
  MAX: BigInt('9223372036854775807'),
};

class TAGLong extends BaseTag {
  constructor() {
    super();
    this.type = 'TAG_Long';
  }

  _readBodyFromBuffer(buff, offset) {
    this.value = buff.readBigInt64BE(offset);
    return 8;
  }

  writeBuffer(buff) {
    buff.writeBigInt64BE(this.value);
  }

  toJSON() {
    return this.value.toString();
  }

  setValue(value) {
    let temp = -1;
    if (typeof value === 'string') {
      temp = BigInt(value);
    } else if (typeof value === 'bigint') {
      temp = value;
    } else if (typeof value === 'number' && !isNaN(value)) {
      temp = BigInt(value);
    }

    if (temp === -1) {
      throw new Error('Wrong type to set TAG_Long\'s value.');
    }

    if (temp < LONG_BOUND.MIN || temp > LONG_BOUND.MAX) {
      throw new RangeError(
        'Value of TAG_Long should between -9223372036854775808 and ' +
        '9223372036854775807');
    }

    this.value = temp;
  }
}

TAGLong.prototype.calcBufferLength = BaseTag._returnSize(8);

module.exports = TAGLong;
