import { Validation } from "@shared/domain/validation/validation";
import { ValueObject } from "@shared/domain/value_objects/value_object";

export interface EmailInfo {
  username: string;
  domain: string;
}

export class Email extends ValueObject<string> {
  public constructor(email: string, validation: Validation<string>) {
    super(email, validation);
  }
  
  public get domain(): string {
    return this.splittedEmail[1];
  }

  public get username(): string {
    return this.splittedEmail[0];
  }

  public get emailInfo(): EmailInfo {
    return {
      username: this.username,
      domain: this.domain
    }
  }

  private get splittedEmail(): [string, string] {
    const [username, domain] = this.value.split('@');
    return [username, domain];
  }
}
