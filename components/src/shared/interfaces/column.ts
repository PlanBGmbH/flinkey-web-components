export interface Column {
  label: string;
  isVisible: (() => boolean) | boolean;
  field?: string;
  cell?: (entry: any) => any;
}
