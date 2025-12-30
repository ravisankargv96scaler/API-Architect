export enum ApiStyle {
  SOAP = 'SOAP',
  REST = 'REST',
  GRAPHQL = 'GraphQL',
  GRPC = 'gRPC',
  REALTIME = 'Real-Time',
  COMPARE = 'Comparison'
}

export interface TabConfig {
  id: ApiStyle;
  label: string;
  color: string;
  icon?: React.ReactNode;
  description: string;
}

export type UseCase = 'Mobile App' | 'Microservices' | 'Public API' | 'Real-time Game';

export interface ComparisonRow {
  feature: string;
  soap: string;
  rest: string;
  graphql: string;
  grpc: string;
  websocket: string;
}
