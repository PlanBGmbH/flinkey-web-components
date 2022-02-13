interface Service {
  id: number;
}

interface Product {
  id: number;
  uniqueId: string;
  serialNumber: string;
  sapNumber: string;
  service: Service;
}

interface Column {
  name: string;
  visible: boolean;
}

export { Service, Product, Column };
