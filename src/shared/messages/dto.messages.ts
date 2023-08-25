import { ValidationArguments, ValidationOptions } from 'class-validator';

export enum DtoMessagesKeys {
  arrayNotEmpty = 'arrayNotEmpty',
  isArray = 'isArray',
  isDateValid = 'isDateValid',
  isDefined = 'isDefined',
  isEnum = 'isEnum',
  isIn = 'isIn',
  isInt = 'isInt',
  isNotEmpty = 'isNotEmpty',
  isPositive = 'isPositive',
  isString = 'isString',
  maxLength = 'maxLength',
  minLength = 'minLength',
  objectId = 'objectId',
  maxValue = 'maxValue',
  isBoolean = 'isBoolean',
}

export const DtoMessages: Record<DtoMessagesKeys, ValidationOptions['message']> = {
  arrayNotEmpty: (args: ValidationArguments) => `Параметр ${args.property} не должен быть пустым`,
  isArray: (args: ValidationArguments) => `Параметр ${args.property} не является списком значений`,
  isDateValid: (args: ValidationArguments) => `Параметр ${args.property} должен быть валидной датой указано`,
  isDefined: (args: ValidationArguments) => `Параметр ${args.property} должно быть указано`,
  isEnum: (args: ValidationArguments) => `Параметр ${args.property} содержит недопустимое значение`,
  isNotEmpty: (args: ValidationArguments) => `Параметр ${args.property} не может содержать пустое значение`,
  isIn: (args: ValidationArguments) => `Параметр ${args.property} содержит недопустимое значение`,
  isInt: (args: ValidationArguments) => `Параметр ${args.property} не является числом`,
  isString: (args: ValidationArguments) => `Параметр ${args.property} не является строкой`,
  isPositive: (args: ValidationArguments) => `Параметр ${args.property} не является положительным числом`,
  maxLength: (args: ValidationArguments) => `Параметр ${args.property} должен содержать менее ${args.constraints} символов`,
  minLength: (args: ValidationArguments) => `Параметр ${args.property} должен содержать не менее ${args.constraints} символов`,
  objectId: (args: ValidationArguments) => `Параметр ${args.property} не является ObjectId`,
  maxValue: (args: ValidationArguments) => `Параметр ${args.property} не может быть больше 2`,
  isBoolean: (args: ValidationArguments) => `Параметр ${args.property} не является boolean`,
};
