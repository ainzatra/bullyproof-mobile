export type FileRef = {
  uri?: string;
  encodedFile?: string;
  name?: string;
  type?: string;
  size?: number;
  mimeType?: string;
};

export interface IncidentData {
  files?: FileRef[];
  details?: string;
  knowsBully?: string;
}

export interface ImpactData {
  feelings: string[];
  others?: string;
}

export type ReportStatus = 'Pending' | 'InProgress' | 'Resolved';
