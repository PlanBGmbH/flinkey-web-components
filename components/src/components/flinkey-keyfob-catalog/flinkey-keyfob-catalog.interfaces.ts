interface Key {
  id: number;
  boxName: string;
  keyForm: KeyForm;
}

interface KeyForm {
  imageUrl: string;
}

export { Key, KeyForm };
