import type { FC } from "react";
import { useRef } from "react";
import { NodeApi, Tree } from "react-arborist";
import type { NodeRendererProps } from "react-arborist";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { FcFile, FcFolder } from "react-icons/fc";

import type { TreeModel } from "../../models";

type Props = {
  data: TreeModel[];
  handleActiveNode: (id: string) => void;
  searchTerm: string;
  selection: string;
};

export const FolderTree: FC<Props> = ({ data, handleActiveNode, searchTerm, selection = "" }) => {
  const treeRef = useRef();

  const onSelect = (nodes: NodeApi<TreeModel>[]) => {
    if (nodes.length) {
      const node = nodes[0];
      const { data } = node;
      handleActiveNode(data.id);
    }
  };

  return (
    <div className="border-r-2 border-indigo-500">
      <Tree
        initialData={data}
        openByDefault={false}
        width={600}
        height={1000}
        indent={24}
        rowHeight={36}
        overscanCount={1}
        paddingTop={30}
        paddingBottom={10}
        padding={25}
        onSelect={onSelect}
        disableDrag
        disableDrop
        ref={treeRef}
        selection={selection}
        searchTerm={searchTerm}
        searchMatch={(node: NodeApi, term: string) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
      >
        {Node}
      </Tree>
    </div>
  );
};

function Node({ node, style }: NodeRendererProps<TreeModel>) {
  const styles = {
    ...style,
    display: "flex",
    alignItems: "center",
  };
  if (node.children && node.children.length === 0) {
    styles["paddingLeft"] = `${16 * (node.level + 1)}px`;
  }

  const Icon = node.children ? FcFolder : FcFile;
  return (
    <div style={styles} onClick={() => node.isInternal && node.toggle()}>
      <span className="flex">
        {node.children && node.children.length > 0 && node.isOpen && <FaCaretDown />}
        {node.children && node.children.length > 0 && !node.isOpen && <FaCaretRight />}
        <Icon />
      </span>
      <span className="cursor-default">{node.data.name}</span>
    </div>
  );
}
