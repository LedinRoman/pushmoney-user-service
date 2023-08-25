import { TransformFnParams } from 'class-transformer';

export const transofrmNum = (v: TransformFnParams): number => {
  if (!v?.value) {
    return v.key === 'size' ? 15 : 0;
  }
  if (Number.isNaN(+v.value)) {
    return v.key === 'size' ? 15 : 0;
  }

  return +v.value;
};
