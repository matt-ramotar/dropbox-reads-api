import { CreateActionInput } from "../entities/CreateActionInput";
import Action from "../models/Action";
import createAction from "./createAction";

interface ActionService {
  createAction(input: CreateActionInput): Promise<Action>;
}

export default class RealActionService implements ActionService {
  public async createAction(input: CreateActionInput): Promise<Action> {
    return await createAction(input);
  }
}
