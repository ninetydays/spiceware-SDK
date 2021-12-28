interface FieldsType {
  [name: string]: string;
}

export interface DecryptItemType {
  ip: string;
  fields: FieldsType;
}

export interface DecryptListType {
  ip: string;
  fields: FieldsType[];
}

export interface EncryptItemType extends DecryptItemType {
  uri: string;
}
