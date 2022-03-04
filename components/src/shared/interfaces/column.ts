export interface Column {
  label: string;
  isVisible: () => boolean;
  field?: string;
  cell?: (entry: any) => any;
}
