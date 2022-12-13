export interface VisitUrlStaticsRepository<T> {
  incrementVisit(visitUrlStatic: T): Promise<void>;
}
