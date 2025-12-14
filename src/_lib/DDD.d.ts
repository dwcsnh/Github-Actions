type AggregateId<T> = {
  value: T;
};

type AggregateRoot<ID extends AggregateId<any>, UserID extends AggregateId<any>> = {
  readonly id: ID;
  readonly createdAt: Date;
  readonly createdBy?: UserID;
  readonly updatedAt: Date;
  readonly updatedBy?: UserID;
  readonly deleted: boolean;
  readonly version: number;
};

type AggregateRootKeys = keyof AggregateRoot<any, any>;

type AggregateRootDTO<T extends AggregateRoot<any, any>> =
  Omit<T, AggregateRootKeys> & {
    id: T['id'];
  };

type Repository<T extends AggregateRoot<any, any>, ID extends AggregateId<any> = T['id']> = {
  findById(id: ID['value']): Promise<T>;
  getNextId(): Promise<ID>;
  store(entity: T): Promise<void>;
};

type ApplicationService<P, R> = (payload: P) => Promise<R>;

type DataMapper<AR extends AggregateRoot<any, any>, DATA, DTO extends AggregateRootDTO<AR>> = {
  toEntity(data: DATA): AR;
  toData(entity: AR): DATA;
  toDTO(entity: AR): DTO;
};

export { AggregateId, AggregateRoot, AggregateRootDTO, Repository, ApplicationService, DataMapper };
