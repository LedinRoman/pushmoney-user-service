export class RabbitError extends Error {

  constructor(error: unknown) {
    super(typeof error === 'string' ? error : String(error));
  }

}
