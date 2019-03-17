export class ParseOptionsError extends Error {
  public isParserOptionsError = true; // fucking instanceof of transpiled typescript!
  constructor(message: string) {
    super(message);
  }
}
