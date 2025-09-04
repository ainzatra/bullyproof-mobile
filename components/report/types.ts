export type FileRef = {
  uri: string;
  name?: string;
  type?: string;
  size?: number;
};

export interface IncidentData {
  files?: FileRef[];
  details?: string;
}

export interface ImpactData {
  feelings: string[];
  others?: string;
}

export type ReportStatus = 'Pending' | 'InProgress' | 'Resolved';
