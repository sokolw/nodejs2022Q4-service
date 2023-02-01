export interface Repository<T> {
  getAll(): Array<T>;
  getById(id: string): T | null;
  create(entity: unknown): T;
  update(entity: T): T;
  delete(id: string): void;
}
