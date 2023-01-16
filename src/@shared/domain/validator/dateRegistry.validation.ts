import { EntityValidation } from "@shared/domain/entities/entity.type";
import { Validator } from "@shared/domain/validator/validator";

export interface DateRegistryFields {
  createdAt: Date;
  updatedAt: Date;
}

export class DateRegistryValidation implements EntityValidation<DateRegistryFields> {
  public constructor(private validator: Validator) {}

  public configureValidation(fields: DateRegistryFields, context: string): Validator {
    this.validateCreatedAt(fields, context).validateUpdatedAt(fields, context);
    return this.validator;
  }

  public validateCreatedAt(fields: DateRegistryFields, context: string): DateRegistryValidation {
    this.validator.isDateBeforeOrEquals({ value: fields?.createdAt, date: new Date(), context });
    return this;
  }

  public validateUpdatedAt(fields: DateRegistryFields, context: string): DateRegistryValidation {
    this.validator
      .isDateAfterOrEquals({ value: fields?.updatedAt, date: fields?.createdAt, context })
      .isDateBeforeOrEquals({ value: fields?.updatedAt, date: new Date(), context });
    return this;
  }
}

export class DateRegistryValidationFactory {
  public static create(validator: Validator) {
    return new DateRegistryValidation(validator);
  }
}
