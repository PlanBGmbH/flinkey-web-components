export interface Column {
  name: string;
  label: string;
  isVisible: () => boolean;
}
