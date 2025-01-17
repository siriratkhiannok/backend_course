import { ISimpleService } from "./iservice";

export class SimpleServiceImp implements ISimpleService {
  constructor() {}

  ok() {
    return "OK";
  }
}
