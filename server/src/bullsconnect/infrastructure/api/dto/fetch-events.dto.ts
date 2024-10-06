export interface FetchEventsDto {
  range?: number;
  limit?: number;
  filter6?: string; // event tag
  filter8?: string; // fromDate
  filter9?: string; // toDate
  search_word?: string;
}
