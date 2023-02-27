import Svelvet from './container/views/Svelvet.svelte';
// This is the main svelvet component
export default Svelvet;
// types/types.ts contains types that are exported to the sure
export * from './types/types';

import { createNode } from './interactiveNodes/controllers/createNode.ts';

import { getNodeById } from './nodes/controllers/util';

export const createNode = createNode;
export const getNodeById = ggetNodeById;