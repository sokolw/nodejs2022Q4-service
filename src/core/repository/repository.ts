export abstract class Repository<T extends { id: string }> {
  protected data: Array<T> = [];

  getAll(): Array<T> {
    return JSON.parse(JSON.stringify(this.data));
  }

  getById(id: string): T | null {
    const entity = this.data.find((item) => item.id === id);
    if (entity) {
      return { ...entity };
    }
    return null;
  }

  abstract create(entity: unknown): T;

  update(entity: T): T {
    this.data = this.data.filter((item) => item.id !== entity.id);
    this.data.push(entity);
    return { ...entity };
  }

  delete(id: string): void {
    this.data = this.data.filter((item) => item.id !== id);
  }

  getByIds(ids: Array<string>): Array<T> {
    const entities = this.data.filter((item) => ids.includes(item.id));
    return JSON.parse(JSON.stringify(entities));
  }
}
