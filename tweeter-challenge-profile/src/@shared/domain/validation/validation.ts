export interface ValidationError {
  name: string;
  message: string;
}

export interface Validation<T> {
  hasError: (value: T) => ValidationError | undefined;
}
