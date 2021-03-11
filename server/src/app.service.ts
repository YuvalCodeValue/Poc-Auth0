import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  data = [
    { name: 'sd', id: 'don' },
    { name: 'sdd', id: 'moshe' },
    { name: 'ssd', id: 'glaser' },
  ];

  findAll(): any {
    return this.data;
  }

  find(id): any {
    return this.data.find((item) => item.id === id);
  }

  create(item: any): any {
    return this.data.push(item);
  }
}
