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

export { Service, Product };
