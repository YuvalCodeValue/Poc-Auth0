import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  data = [
    { name: 'sd', id: 'don' },
    { name: 'sdd', id: 'moshe' },
    { name: 'ssd', id: 'glaser' },
  ];

  findAll(): any {
    const options = {
      method: 'POST',
      url: 'https://YOUR_DOMAIN/api/v2/hooks',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer MGMT_API_ACCESS_TOKEN',
        'cache-control': 'no-cache',
      },
      data: {
        name: 'my',
        script: 'HOOK_SCRIPT',
        triggerId: 'EXTENSIBILITY_POINT_NAME',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    return this.data;
  }

  find(id): any {
    return this.data.find((item) => item.id === id);
  }

  create(item: any): any {
    return this.data.push(item);
  }
}
