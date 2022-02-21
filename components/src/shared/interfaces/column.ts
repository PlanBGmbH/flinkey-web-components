export interface Column {
  field?: string;
  label: string;
  isVisible: () => boolean;
}
