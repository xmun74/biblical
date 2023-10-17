import { useState } from 'react';

type OptionsType<T> = {
  validate?: (newValue: T, currentValue: T) => boolean;
};

/**
 * useInput Hook
 * @param {unknown} [initialValue] Initial value of the input
 * @param {Options} [options] Options object
 */
export const useInput = <T extends number | string | readonly string[] | undefined = string>(
  initialValue: T,
  options: OptionsType<T> = {}
) => {
  const [value, setValue] = useState<T>(initialValue);

  const resetValue = () => {
    setValue(initialValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as T;
    let shouldUpdate = true;
    if (typeof options.validate === 'function') {
      shouldUpdate = options.validate(newValue, value);
    }
    if (shouldUpdate) {
      setValue(newValue);
    }
  };

  return { value, onChange, resetValue };
};
