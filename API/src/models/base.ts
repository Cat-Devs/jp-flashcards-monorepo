import { ulid } from 'ulid';

export abstract class Item {
  private _entityType: string;
  private _id: string;

  abstract get pk(): string;
  abstract get sk(): string;

  constructor(type: string, id?: string) {
    this._entityType = type;
    this._id = id || ulid();
  }

  public get entityType() {
    return this._entityType;
  }

  public keys() {
    return {
      PK: this.pk,
      SK: this.sk,
    };
  }

  public get id(): string {
    return this._id;
  }

  abstract toItem(): Record<string, unknown>;
}
