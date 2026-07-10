export class InMemoryRepository<T extends { id: string }> {
  constructor(private items: T[] = []) {}

  findAll(): T[] {
    return this.items;
  }

  findOne(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  update(id: string, updates: Partial<Omit<T, 'id'>>): T | undefined {
    const item = this.findOne(id);
    if (!item) {
      return undefined;
    }
    const safeUpdates = { ...updates } as Partial<T>;
    delete safeUpdates.id;
    Object.assign(item, safeUpdates);
    return item;
  }
}
