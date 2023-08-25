import type { TreeModel } from "../models";
import { TypeEnum } from "../models";

export const findNode = (id: string, array) => {
  for (const node of array) {
    if (node.id === id) return node;
    if (node.children) {
      const child = findNode(id, node.children);
      if (child) return child;
    }
  }
};

export const filterNodes = (data: TreeModel[]): TreeModel[] => {
  return data.reduce((acc: TreeModel[], e: TreeModel) => {
    if (!e.children.length && e.type === TypeEnum.file) {
      return acc;
    }

    const result = filterNodes(e.children);

    acc.push({
      id: e.id,
      name: e.name,
      size: e.size,
      date: e.date,
      type: e.type as TypeEnum,
      children: result.length > 0 ? result : [],
    });

    return acc;
  }, []);
};
