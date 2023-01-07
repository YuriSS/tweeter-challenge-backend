export abstract class ValueObject<T> {
  public abstract get value(): T;
  protected abstract validate(): void;
}
