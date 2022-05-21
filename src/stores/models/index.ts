import { Models } from '@rematch/core';
import { players } from './players';

export interface RootModel extends Models<RootModel> {
  players: typeof players;
}

export const models: RootModel = { players };
