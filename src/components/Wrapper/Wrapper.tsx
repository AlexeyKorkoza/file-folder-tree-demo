import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Row } from "@tanstack/react-table";

import { FolderTree, List } from "../index";

import type { TableColumnsModel } from "../../models";
import { FAKE_TREE_DATA, filterNodes, findNode } from "../../services";

export const Wrapper = () => {
  const [activeNode, setActiveNode] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleActiveNode = (id: string) => {
    setActiveNode(id);
  };

  const handleClickOnTableRow = (row: Row<TableColumnsModel>) => {
    const { type, id } = row.original;
    if (type === "folder") {
      setActiveNode(id);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  let tableData = [];
  if (!activeNode) {
    tableData = FAKE_TREE_DATA.map(({ children, ...rest }) => rest);
  } else {
    const result = findNode(activeNode, FAKE_TREE_DATA);
    if (result) {
      tableData = result.children;
    }
  }

  const treeData = filterNodes(FAKE_TREE_DATA);

  return (
    <div>
      <div className="flex flex-col m-4">
        <label htmlFor="input">Search node:</label>
        <input
          id="input"
          type="text"
          onChange={handleInput}
          className="input input-bordered w-full max-w-xs"
          placeholder="Search ..."
        />
      </div>
      <div className="flex flex-row border-t-2 border-indigo-500 m-4">
        <FolderTree
          data={treeData}
          handleActiveNode={handleActiveNode}
          selection={activeNode}
          searchTerm={searchTerm}
        />
        <List data={tableData} onClickTableRow={handleClickOnTableRow} />
      </div>
    </div>
  );
};
