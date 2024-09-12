//Defining the Historical Data types for the linechart

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

export type { HistoricalData };
